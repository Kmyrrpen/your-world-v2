import { Tag } from "@/app/world/types";

type Props = {
  tag: Tag;
};

const TagComponent: React.FC<Props> = ({ tag }) => {
  return <div>{tag.name}</div>;
};

export default TagComponent;
