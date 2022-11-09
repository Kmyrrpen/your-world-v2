import { useTags } from '@/app/world/hooks';
import Container from '@/components/Container';
import List from '@/components/List';
import PageTitle from '@/components/PageTitle';
import DashboardNavbar from '@/dashboard/DashboardNavbar';
import TagsItem from './TagsItem';

const Tagview: React.FC = () => {
  const tags = useTags();

  return (
    <Container>
      <DashboardNavbar isBack />
      <PageTitle>All Tags</PageTitle>
      <List>
        {tags.map((tag) => (
          <TagsItem tag={tag} key={tag.id} />
        ))}
      </List>
    </Container>
  );
};

export default Tagview;
