import { useMemo } from "react";
import { useWorldStore } from "@/app/world";
import { Link, useSearchParams } from "react-router-dom";
import EditTagModal from "./EditTagModal";

export const editTagParam = "edit-tag";

const Tags: React.FC = () => {
  const tags = useWorldStore((state) => state.tags);
  const tagsArr = useMemo(() => Object.values(tags), [tags]);
  const [searchParams, setSearchParams] = useSearchParams();
  const editTagId = searchParams.get(editTagParam);

  return (
    <ul className="flex flex-col">
      {editTagId && tags[editTagId] ? (
        <EditTagModal
          tag={tags[editTagId]}
          onClose={() => setSearchParams("", { replace: true })}
        />
      ) : null}

      {tagsArr.map((tag) => (
        <Link to={`?${editTagParam}=${tag.id}`} replace key={tag.id}>
          {tag.name}
        </Link>
      ))}
    </ul>
  );
};

export default Tags;
