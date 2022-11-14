import { useLayoutEffect, useRef, useState } from 'react';
import { useWorld } from '@/app/world/hooks';
import { Note } from '@/app/world/types';
import Item from '@/components/Item';

type Props = {
  note: Note;
};

const NoteItem: React.FC<Props> = ({ note }) => {
  const world = useWorld();
  const tagsObj = world.tags;

  const tagsRef = useRef<HTMLUListElement | null>(null);
  const [hiddenTagCount, setHiddenTagCount] = useState(0);

  // note that we should keep this idempotent
  useLayoutEffect(() => {
    const container = tagsRef.current;

    if (!container) return;
    const size = container.offsetWidth;
    const scrollSize = container.scrollWidth;

    // get how many tags we should hide
    if (scrollSize > size) {
      let childrenToHide = 0;
      let accumulatingSize = 0;

      for (let i = container.children.length - 1; i >= 0; i--) {
        childrenToHide++;
        accumulatingSize += container.children[i].clientWidth;
        if (scrollSize - accumulatingSize <= size) break;
      }

      setHiddenTagCount(childrenToHide);
    }
  }, [tagsRef]);

  return (
    <Item>
      <Item.Title>{note.name}</Item.Title>
      <div className="flex flex-col">
        <ul ref={tagsRef} className="flex overflow-hidden">
          {note.tagIds.map((tagId, i) => (
            <Item.Tag
              to={`/${world.id}/tags/${tagId}`}
              tag={tagsObj[tagId]}
              key={tagId}
              className={
                note.tagIds.length - hiddenTagCount <= i ? 'hidden' : ''
              }
            />
          ))}
        </ul>
        {hiddenTagCount ? (
          <span className="text-sm font-bold text-neutral-400">
            {hiddenTagCount}+ more tags
          </span>
        ) : null}
      </div>
      <Item.Description>{note.description}</Item.Description>
      <Item.Link to={`/${world.id}/${note.id}`} />
    </Item>
  );
};

export default NoteItem;
