import { createDispatch } from 'wuuber';
import { themeFlows } from './theme';
import { worldFlows } from './world';
import { metasFlows } from './metas';

export const dispatch = createDispatch(
  ...themeFlows,
  ...metasFlows,
  ...worldFlows,
);
