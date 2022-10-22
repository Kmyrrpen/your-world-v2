import { useTags } from '@/app/world/hooks';
import Navbar from '@/components/Navbar';
import TagviewItem from './TagsItem';

const Tagview: React.FC = () => {
  const tags = useTags();

  return (
    <div>
      <Navbar />
      <ul>
        {tags.map((tag) => (
          <TagviewItem tag={tag} key={tag.id} />
        ))}
      </ul>
    </div>
  );
};

export default Tagview;
