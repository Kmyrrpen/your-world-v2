import { useMemo, useState } from "react";
import { useWorldStore } from "@/app/world";
import { Link, useSearchParams } from "react-router-dom";
import EditTagModal from "./EditTagModal";
import SearchInput from "@/components/SearchInput";
import { twMerge } from "tailwind-merge";

export const editTagKey = "edit-tag";

const Tags: React.FC = () => {
  const tags = useWorldStore((state) => state.tags);
  const tagsArr = useMemo(
    () => Object.values(tags).sort((a, b) => (a.name > b.name ? 1 : -1)),
    [tags],
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const editTagId = searchParams.get(editTagKey);

  const [inputValue, setInputValue] = useState("");
  const filteredTags = useMemo(() => {
    const value = inputValue.toLowerCase();
    return tagsArr.filter((tag) => tag.name.toLowerCase().startsWith(value));
  }, [inputValue, tagsArr]);

  return (
    <div>
      <SearchInput
        value={inputValue}
        placeholder="search..."
        className="mb-8"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className={twMerge("flex flex-col border", !filteredTags.length && "hidden" )}>
        {filteredTags.map((tag) => (
          <li key={tag.id}>
            <Link
              className="group flex items-center gap-1 p-2 font-sans font-medium outline-none focus:bg-gray-200 hover:bg-gray-200 transition-all"
              to={`?${editTagKey}=${tag.id}`}
              replace
            >
              <span
                aria-hidden
                className="inline-block h-4 w-4"
                style={{ backgroundColor: tag.color.background }}
              />
              {tag.name}
            </Link>
          </li>
        ))}

        {/* Open Tag Modal */}
        {editTagId && tags[editTagId] ? (
          <EditTagModal
            tag={tags[editTagId]}
            onClose={() => setSearchParams("", { replace: true })}
          />
        ) : null}
      </ul>
    </div>
  );
};

export default Tags;
