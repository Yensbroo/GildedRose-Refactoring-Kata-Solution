import { Item } from "@/gilded-rose";

export interface QualityUpdater {
  updateQuality(item: Item): Item;
}
