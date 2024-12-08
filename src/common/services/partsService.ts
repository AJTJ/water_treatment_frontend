import { ItemBase } from "./itemService";

export interface PartRequestBase {
  part_id: string;
  part: ItemBase;
  quantity: number;
  urgency_level: PartRequestUrgencyLevels;
}

export enum PartRequestUrgencyLevels {
  URGENT = "URGENT",
  NOT_URGENT = "NOT_URGENT",
}
