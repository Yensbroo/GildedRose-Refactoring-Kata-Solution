import { Item } from "@/gilded-rose";
import { QualityUpdater } from "./types";
import { AgedBrie } from "./aged-brie";
import { LegendaryItem } from "./legendary";
import { BackstagePassItem } from "./backstage-pass";
import { ConjuredItem } from "./conjured";
import { NormalItem } from "./normal";
import { INVALID_ITEM } from "@/constants";

export class ItemProcessor implements QualityUpdater {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  private isValidItem() {
    if (
      typeof this.item.quality !== "number" ||
      typeof this.item.sellIn !== "number"
    ) {
      this.item.name = INVALID_ITEM;
      return this.item;
    }
  }

  updateQuality(): Item {
    const item = this.item;
    this.isValidItem();

    const isSulfuras = item.name.includes("Sulfuras");

    switch (true) {
      case isSulfuras:
        this.item = new LegendaryItem(item).updateQuality();
        break;
      case item.name.includes("Aged Brie"):
        this.item = new AgedBrie(item).updateQuality();
        break;
      case item.name.includes("Backstage passes"):
        this.item = new BackstagePassItem(item).updateQuality();
        break;
      case item.name.includes("Conjured"):
        this.item = new ConjuredItem(item).updateQuality();
        break;
      default:
        this.item = new NormalItem(item).updateQuality();
    }

    if (this.item.quality < 0) {
      this.item.quality = 0;
    }

    if (this.item.quality > 50 && !isSulfuras) {
      this.item.quality = 50;
    }
    return this.item;
  }
}
