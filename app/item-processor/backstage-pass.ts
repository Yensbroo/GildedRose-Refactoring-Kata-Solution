import { Item } from "../gilded-rose";
import { QualityUpdater } from "./types";

export class BackstagePassItem implements QualityUpdater {
  item: Item;
  additionFactor: number;

  constructor(item: Item) {
    this.item = item;
    this.additionFactor = 1;
  }

  private updateAdditionFactor() {
    if (this.item.sellIn <= 5) {
      this.additionFactor = 3;
    } else if (this.item.sellIn <= 10) {
      this.additionFactor = 2;
    }

    this.item.quality = this.item.quality + this.additionFactor;
  }

  public updateQuality(): Item {
    if (this.item.sellIn < 0) {
      this.item.quality = 0;

      return this.item;
    }

    this.updateAdditionFactor();

    return this.item;
  }
}
