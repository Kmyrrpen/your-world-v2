import { useLayoutEffect, useRef, useState } from 'react';
import { Note } from '@/app/world-curr/types';
import { useWorldStore } from '@/app/world-curr';
import Item from '@/components/Item';

type Props = {
  note: Note;
};

const NoteItem: React.FC<Props> = ({ note }) => {
  const id = useWorldStore((state) => state.id);
  const tags = useWorldStore((state) => state.tags);

  const tagsRef = useRef<HTMLUListElement | null>(null);
  const [hiddenTagCount, setHiddenTagCount] = useState(0);

  useLayoutEffect(() => {
    const container = tagsRef.current;
    if (!container) return;

    // needed for calculation
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
  }, [tagsRef, setHiddenTagCount]);

  return (
    <Item>
      <Item.Title>{note.name}</Item.Title>

      {/* Tags */}
      <div className="flex flex-col">
        <ul ref={tagsRef} className="flex overflow-hidden">
          {note.tagIds.map((tagId, i) => (
            <Item.Tag
              to={`/${id}/tags/${tagId}`}
              tag={tags[tagId]}
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
      <Item.Link to={`/${id}/${note.id}`} />
    </Item>
  );
};

export default NoteItem;
