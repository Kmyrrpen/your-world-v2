import { DBSchema } from 'idb';
import { Note, Tag } from '../world-curr/types';
import { WorldMeta } from '../world-metas/types';

export interface WorldSchema extends DBSchema {
  tags: {
    key: string;
    value: Tag;
  };
  notes: {
    key: string;
    value: Note;
  };
}

export interface MetaSchema extends DBSchema {
  metas: {
    key: string;
    value: WorldMeta;
  };
}
