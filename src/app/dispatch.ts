import { createDispatch } from "wuuber";
import { worldFlows } from "./world";
import { worldListFlows } from "./worldList";

export const dispatch = createDispatch(...worldFlows, ...worldListFlows);
