import { createDispatch } from "wuuber";
import { worldFlows } from "./world";
import { worldMetasFlows } from "./worldMeta";

export const dispatch = createDispatch(...worldFlows, ...worldMetasFlows);
