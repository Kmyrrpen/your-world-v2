import React, { useMemo, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import { twMerge } from "tailwind-merge";

import { Tag } from "@/app/world";
import useSortedTags from "@/hooks/useSortedTags";

const getItems = (
  tags: Tag[],
  selectedTags: Tag[],
  inputValue: string,
): Tag[] => {
  inputValue = inputValue.toLowerCase();
  return tags.filter((tag) => {
    if (selectedTags.includes(tag)) return false;
    return tag.name.toLowerCase().startsWith(inputValue);
  });
};

type Props = {
  selectedItems: Tag[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Tag[]>>;
};

const TagSearchInput: React.FC<Props> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const tags = useSortedTags();

  const tagsArr = useMemo(() => Object.values(tags), [tags]);
  const items = useMemo(
    () => getItems(tagsArr, selectedItems, inputValue),
    [tagsArr, inputValue, selectedItems],
  );

  const { getDropdownProps, getSelectedItemProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: selectedItems,
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
              setSelectedItems(tags);
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
    getItemProps,
  } = useCombobox({
    items,
    inputValue,
    defaultHighlightedIndex: 0,
    selectedItem: null,
    stateReducer(state, actionsAndChanges) {
      const { changes, type } = actionsAndChanges;
      switch (type) {
        // make it so that when we select an item, the box stays open
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            ...(changes.selectedItem && { isOpen: true }),
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
          setSelectedItems((items) => [...items, newSelectedItem]);
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
    <div className="relative p-1 font-sans text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <label className="font-medium">with tags:</label>
        {/* Selected Tags */}
        {selectedItems.map((tag, index) => (
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
              className={twMerge("cursor-pointer p-1")}
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(tag);
              }}
            >
              &#10005;
            </span>
          </span>
        ))}

        {/* Input & Label */}
        <div className="flex flex-1 gap-2">
          <input
            placeholder="Filter Tags..."
            className="outline-none"
            {...getInputProps(getDropdownProps())}
          />
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
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TagSearchInput;
