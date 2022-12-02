import { useWorldStore } from '@/app/world-curr';

import DashboardNavbar from '@/dashboard/DashboardNavbar';
import Container from '@/components/Container';
import Header from '@/components/Header';
import TagsItem from './TagsItem';

import { stateObjectToArray } from '@/utils';

const Tagview: React.FC = () => {
  const tags = useWorldStore((state) => stateObjectToArray(state.tags));

  return (
    <Container>
      <DashboardNavbar isBack />
      <Header>
        <Header.Title>All Tags</Header.Title>
      </Header>
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {tags.map((tag) => (
          <TagsItem tag={tag} key={tag.id} />
        ))}
      </ul>
    </Container>
  );
};

export default Tagview;
