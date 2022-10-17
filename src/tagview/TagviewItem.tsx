import { Tag } from "@/app/world/types";
import { Link } from "react-router-dom";

type Props = {
  tag: Tag;
};

const TagviewItem: React.FC<Props> = ({ tag }) => {
  return (
    <li>
      <h2>{tag.name}</h2>
      <p>{tag.description}</p>
      <Link to={`${tag.id}`}>View Files</Link>
    </li>
  );
};

export default TagviewItem;