import { Writeable } from '@/utils/types';
import { openDB } from 'idb';
import { Notes, Tags, WorldSchema } from './types';

export const createWorldDB = async (id: string) => {
  const connection = await openDB<WorldSchema>(id, 1, {
    upgrade: (db) => {
      console.log('upgrade event called');
      db.createObjectStore('notes', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
    },
  });
  const tr = connection.transaction(['notes', 'tags']);

  const notes: Writeable<Notes> = {};
  const tags: Writeable<Tags> = {};

  let noteCursor = await tr.objectStore('notes').openCursor();
  let tagCursor = await tr.objectStore('tags').openCursor();
  while (noteCursor) {
    const note = noteCursor.value;
    notes[note.id] = note;
    noteCursor = await noteCursor.continue();
  }
  while (tagCursor) {
    const tag = tagCursor.value;
    tags[tag.id] = tag;
    tagCursor = await tagCursor.continue();
  }

  return {
    connection,
    notes,
    tags,
  };
};
