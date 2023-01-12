import { useMemo, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

import { Tag, useWorldStore } from "@/app/world";
import { useEditorContext, useEditorActionsContext } from "./store/Provider";
import useSortedTags from "@/hooks/useSortedTags";

// make sure to handle special create option
const createOption: Tag = {
  name: "$$create",
  id: "$$create",
} as Tag;

const getItems = (
  tags: Tag[],
  selectedTags: Tag[],
  inputValue: string,
): Tag[] => {
  inputValue = inputValue.toLowerCase();
  let showCreate = Boolean(
    inputValue &&
      !selectedTags.find((tag) => tag.name.toLowerCase() === inputValue),
  );

  const filtered = tags.filter((tag) => {
    if (selectedTags.includes(tag)) return false;
    const name = tag.name.toLowerCase();
    // one of the non-selected tags match exactly
    if (name === inputValue) {
      showCreate = false;
      return true;
    }
    return tag.name.toLowerCase().startsWith(inputValue);
  });

  return showCreate ? [createOption, ...filtered] : filtered;
};

const TagInput: React.FC = () => {
  const { draft } = useEditorContext();
  const { setTagIds } = useEditorActionsContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const setTag = useWorldStore((state) => state.setTag);
  const tags = useWorldStore((state) => state.tags);

  const sortedTags = useSortedTags();
  const sortedSelected = draft.tagIds
    .map((id) => tags[id])
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const items = useMemo(
    () => getItems(sortedTags, sortedSelected, inputValue),
    [sortedTags, inputValue, sortedSelected],
  );

  const createTagAndSet = async (name: string) => {
    setLoading(true);
    const tag: Tag = {
      name,
      color: {
        text: "#fff",
        background: "#000",
      },
      id: nanoid(),
    };
    await setTag(tag);
    setLoading(false);
    setTagIds((state) => [...state, tag.id]);
  };

  const { getDropdownProps, getSelectedItemProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: sortedSelected,
      stateReducer(state, actionAndChanges) {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
            return {
              ...changes,
              activeIndex: -1,
            };
          default:
            return changes;
        }
      },
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            {
              // newSelectedItems will always be defined
              const tags = newSelectedItems as Tag[];
              setTagIds(tags.map((tag) => tag.id));
            }
            break;
          default:
            break;
        }
      },
    });

  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    getItemProps,
  } = useCombobox({
    items,
    inputValue,
    defaultHighlightedIndex: 0,
    selectedItem: null,
    stateReducer(state, actionsAndChanges) {
      const { changes, type } = actionsAndChanges;
      switch (type) {
        // make it so that when we select an item, the box stays open.
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            ...(changes.selectedItem &&
              changes.selectedItem.id !== createOption.id && { isOpen: true }),
          };

        default:
          return changes;
      }
    },
    // map changes to our state because this is a controlled component
    onStateChange(change) {
      const {
        inputValue: newInputValue,
        type,
        selectedItem: newSelectedItem,
      } = change;
      switch (type) {
        // we only care about selected items and input value
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          // user entered without item selected
          // this can happen when user typed in a name that was already selected
          // making it so that options would be empty.
          if (!newSelectedItem) break;

          setInputValue("");

          // handle creating tags else-where, it should be okay since
          // this is controlled.
          if (newSelectedItem.id === createOption.id) {
            createTagAndSet(inputValue);
            break;
          }

          setTagIds((state) => [...state, newSelectedItem.id]);
          break;
        }
        case useCombobox.stateChangeTypes.InputChange:
          // @ts-ignore || cases match, so value should be defined
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  return (
    <div className="relative font-sans ">
      <div className="flex flex-wrap gap-2">
        {/* Selected Tags */}
        {sortedSelected.map((tag, index) => (
          <span
            className="px-1 py-1 text-sm font-medium"
            key={tag.id}
            style={{
              backgroundColor: tag.color.background,
              color: tag.color.text,
            }}
            {...getSelectedItemProps({ selectedItem: tag, index })}
          >
            {tag.name}
            <span
              className={twMerge(
                "cursor-pointer p-1",
                loading && "cursor-wait",
              )}
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(tag);
              }}
            >
              &#10005;
            </span>
          </span>
        ))}

        {/* Input & Toggle */}
        <div className="flex flex-1">
          <input
            placeholder="Add Tag..."
            className="w-full outline-none"
            {...getInputProps(getDropdownProps({ disabled: loading }))}
          />
          <button
            className="ml-auto"
            aria-label="toggle menu"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        className={twMerge(
          "absolute top-full z-20 mt-2 max-h-52 w-full overflow-y-auto border border-gray-200 bg-white",
          (!isOpen || !items.length) && "hidden",
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={twMerge(
                "px-2 py-1",
                highlightedIndex === index && "bg-gray-300",
              )}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              {item.id === createOption.id
                ? `create "${inputValue}"`
                : item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TagInput;
