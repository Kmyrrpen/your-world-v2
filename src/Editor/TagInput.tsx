import { useMemo, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

import { Note, Tag, useWorldStore } from "@/app/world";

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

type Props = {
  draft: Note;
  setter: React.Dispatch<React.SetStateAction<Note>>;
};

const TagInput: React.FC<Props> = ({ draft, setter }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const tags = useWorldStore((state) => state.tags);
  const setTag = useWorldStore((state) => state.setTag);

  const tagsArr = useMemo(() => Object.values(tags), [tags]);
  const items = useMemo(
    () =>
      getItems(
        tagsArr,
        draft.tagIds.map((id) => tags[id]),
        inputValue,
      ),
    [tags, tagsArr, inputValue, draft.tagIds],
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

    setter((state) => ({
      ...state,
      tagIds: [...state.tagIds, tag.id],
    }));
  };

  const { getDropdownProps, getSelectedItemProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: draft.tagIds.map((id) => tags[id]),
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
              const tag = newSelectedItems as Tag[];
              setter((state) => ({
                ...state,
                tagIds: tag.map((tag) => tag.id),
              }));
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
        // make it so that when we select an item, the box stays open and also highlight index 0.
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

          setter((state) => ({
            ...state,
            tagIds: [...state.tagIds, newSelectedItem.id],
          }));
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
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {/* Selected Tags */}
        {draft.tagIds.map((tagId, index) => (
          <span
            className="px-1 py-1 text-sm"
            key={tagId}
            style={{
              backgroundColor: tags[tagId].color.background,
              color: tags[tagId].color.text,
            }}
            {...getSelectedItemProps({ selectedItem: tags[tagId], index })}
          >
            {tags[tagId].name}
            <span
              className={twMerge(
                "cursor-pointer p-1",
                loading && "cursor-wait",
              )}
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(tags[tagId]);
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
