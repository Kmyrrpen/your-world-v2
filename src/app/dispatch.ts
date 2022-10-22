import { createDispatch } from 'wuuber';
import { themeFlows } from './theme';
import { worldFlows } from './world';
import { worldListFlows } from './worldList';

export const dispatch = createDispatch(
  ...worldFlows,
  ...worldListFlows,
  ...themeFlows,
);
