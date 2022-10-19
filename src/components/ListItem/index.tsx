import { Note, TagsObject } from "@/app/world/types";
import { Link } from "react-router-dom";

type Props = {
  note: Note;
  tagsObj: TagsObject;
};

const NoteListItem: React.FC<Props> = ({ note, tagsObj }) => {
  return (
    <li>
      <h2>{note.name}</h2>
      <ul>
        {note.tagIds.map((tagId) => (
          <li key={tagsObj[tagId].id}>{tagsObj[tagId].name}</li>
        ))}
      </ul>
      <p>{note.description}</p>
      <Link to={`/${note.id}`}>Open</Link>
    </li>
  );
};

export default NoteListItem;
