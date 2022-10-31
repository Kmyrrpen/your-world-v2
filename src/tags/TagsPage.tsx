import { useTags } from '@/app/world/hooks';
import Container from '@/components/Container';
import List from '@/components/List';
import PageTitle from '@/components/PageTitle';

import DefaultNavbar from '@/components/DefaultNavbar';
import TagsItem from './TagsItem';

const Tagview: React.FC = () => {
  const tags = useTags();

  return (
    <Container>
      <DefaultNavbar />
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
