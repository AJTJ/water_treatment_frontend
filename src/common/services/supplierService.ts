import { ItemBase } from "./itemService";

export interface SupplierBase {
  id: string;
  name: string;
}

export interface SupplierBaseWithRelations extends SupplierBase {
  items?: ItemBase[];
}
