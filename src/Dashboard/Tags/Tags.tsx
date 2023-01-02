import { useMemo, useState } from "react";
import { useWorldStore } from "@/app/world";
import { Link, useSearchParams } from "react-router-dom";
import EditTagModal from "./EditTagModal";

export const editTagKey = "edit-tag";

const Tags: React.FC = () => {
  const tags = useWorldStore((state) => state.tags);
  const tagsArr = useMemo(() => Object.values(tags), [tags]);

  const [searchParams, setSearchParams] = useSearchParams();
  const editTagId = searchParams.get(editTagKey);

  const [inputValue, setInputValue] = useState("");
  const filteredTags = useMemo(() => {
    const value = inputValue.toLowerCase();
    return tagsArr.filter((tag) => tag.name.toLowerCase().startsWith(value));
  }, [inputValue, tagsArr]);

  return (
    <div>
      <input
        className="mb-2 w-80 max-w-full border-b-2 border-b-gray-200 outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className="flex flex-col">
        {filteredTags.map((tag) => (
          <Link to={`?${editTagKey}=${tag.id}`} replace key={tag.id}>
            {tag.name}
          </Link>
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
