import { Item, GildedRose } from "@/gilded-rose";
import { expect } from "vitest";

const createItems = (items: Array<Item>) => {
  const gildedRose = new GildedRose(items);

  return gildedRose.updateQuality();
};

describe("Gilded Rose", () => {
  describe("All items", () => {
    it("should never have a negative quality", () => {
      const item = new Item("Foo", 4, 0);
      const items = createItems([item]);

      expect(items[0].quality).toBe(0);
    });

    it("should never have a quality greater than 50, except for Sulfuras", () => {
      const items = createItems([
        new Item("Aged Brie", 4, 51),
        new Item("Foo", 4, 52),
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 51),
      ]);

      items.forEach((item) => {
        console.info(`Quality of item ${item.name} is ${item.quality}`);
        expect(item.quality).toBe(50);
      });
    });
  });

  describe("Normal items", () => {
    it("should degrade quality by 1 when sellIn is bigger than 0", () => {
      const item = new Item("Foo", 4, 20);
      const items = createItems([item]);

      expect(items[0].quality).toBe(19);
    });

    it("should degrade quality by 2 when sell by date has passed", () => {
      const item = new Item("Foo", 0, 20);
      const items = createItems([item]);

      expect(items[0].quality).toBe(18);
    });
  });

  describe("Aged Brie", () => {
    it("Should increase quality when it gets older", () => {
      const item = new Item("Aged Brie", 5, 20);

      const items = createItems([item]);

      expect(items[0].quality).toBe(21);
    });
  });

  describe("Sulfuras items", () => {
    const itemName = "Sulfuras, Hand of Ragnaros";
    it("Should never decrease quality", () => {
      const item = new Item(itemName, 3, 80);
      const items = createItems([item]);

      expect(items[0].quality).toBe(80);
    });

    it("Should always have a quality of 80", () => {
      const item = new Item(itemName, 3, 20);
      const items = createItems([item]);

      expect(items[0].quality).toBe(80);
    });
  });
});
