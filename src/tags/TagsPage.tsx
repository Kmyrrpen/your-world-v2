import { useTags } from '@/app/world/hooks';
import Container from '@/components/Container';
import Header from '@/components/Header';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import TagsItem from './TagsItem';

const Tagview: React.FC = () => {
  const tags = useTags();

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
