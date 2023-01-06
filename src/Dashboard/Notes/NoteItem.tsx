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
    <li className="flex flex-col">
      <Link
        className="flex h-full flex-col gap-1 border border-gray-600 px-2.5 pt-2 pb-1"
        to={`/${id}/${note.id}`}
      >
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
                  "mr-1 mb-1 inline whitespace-nowrap py-1 px-2 text-sm font-medium leading-none",
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

        <p
          className="my-2 block"
          dangerouslySetInnerHTML={{ __html: note.description }}
        />
        <span className="ml-auto mt-auto p-1 font-sans text-sm font-medium">
          <span>edit</span>
        </span>
      </Link>
    </li>
  );
};

export default NoteItem;
