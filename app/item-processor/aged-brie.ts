import { Item } from "../gilded-rose";
import { QualityUpdater } from "./types";

export class AgedBrie implements QualityUpdater {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  public updateQuality(): Item {
    this.item.quality = this.item.quality + 1;

    return this.item;
  }
}
