import { Item } from "../gilded-rose";
import { QualityUpdater } from "./types";

export class LegendaryItem implements QualityUpdater {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  public updateQuality(): Item {
    this.item.quality = 80;

    return this.item;
  }
}
