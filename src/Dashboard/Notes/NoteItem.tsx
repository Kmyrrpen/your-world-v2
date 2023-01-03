import { Note, useWorldStore } from "@/app/world";
import { useTagsToHide } from "@/hooks";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {
  note: Note;
};

const NoteItem: React.FC<Props> = ({ note }) => {
  const id = useWorldStore((state) => state.id);
  const tags = useWorldStore((state) => state.tags);
  const { toHide, containerRef } = useTagsToHide();

  return (
    <li className="flex flex-col gap-1 border border-gray-400 p-2 sm:p-3">
      <h2 className="text-lg font-bold">{note.name}</h2>

      <div className="flex flex-col">
        <ul ref={containerRef} className="flex overflow-hidden">
          {note.tagIds.map((tagId, i) => (
            <span
              key={tagId}
              style={{
                backgroundColor: tags[tagId].color.background,
                color: tags[tagId].color.text,
              }}
              className={twMerge(
                "mr-1 mb-1 inline py-1 px-2 text-sm font-medium leading-none",
                note.tagIds.length - toHide <= i ? "hidden" : "",
              )}
            >
              {tags[tagId].name}
            </span>
          ))}
        </ul>
        {toHide ? (
          <span className="text-sm font-bold text-gray-400">
            {toHide}+ more tags
          </span>
        ) : null}
      </div>

      <p className="my-2 block">{note.description}</p>
      <Link className="ml-auto mt-auto" to={`/${id}/${note.id}`}>
        <span>edit</span>
      </Link>
    </li>
  );
};

export default NoteItem;
