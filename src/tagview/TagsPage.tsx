import { useTags } from '@/app/world/hooks';
import Container from '@/components/Container';

import DashboardNavbar from '@/dashboard/DashboardNavbar';
import TagviewItem from './TagsItem';

const Tagview: React.FC = () => {
  const tags = useTags();

  return (
    <Container>
      <DashboardNavbar />
      <ul>
        {tags.map((tag) => (
          <TagviewItem tag={tag} key={tag.id} />
        ))}
      </ul>
    </Container>
  );
};

export default Tagview;
