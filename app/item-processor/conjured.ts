import { Item } from "../gilded-rose";
import { QualityUpdater } from "./types";

export class ConjuredItem implements QualityUpdater {
  degradationFactor: number;
  item: Item;

  constructor(item: Item) {
    this.degradationFactor = 2;
    this.item = item;
  }
  public updateQuality(): Item {
    if (this.item.sellIn <= 0) {
      this.degradationFactor = 4;
    }

    this.item.quality = this.item.quality - this.degradationFactor;

    return this.item;
  }
}
