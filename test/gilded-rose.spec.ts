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

  describe("Backstage pass items", () => {
    const itemName = "Backstage passes to a TAFKAL80ETC concert";

    it("Should increase quality by 1 when sell in date is greater than 10", () => {
      const item = new Item(itemName, 12, 20);
      const items = createItems([item]);

      expect(items[0].quality).toBe(21);
    });

    it("Should increase quality by 2 when sell in date is lower than or equal to 10", () => {
      const items = createItems([
        new Item(itemName, 10, 22),
        new Item(itemName, 9, 20),
      ]);

      expect(items[0].quality).toBe(24);
      expect(items[1].quality).toBe(22);
    });

    it("Should increase quality by 3 when sell in date is lower than or equal to 5", () => {
      const items = createItems([
        new Item(itemName, 5, 20),
        new Item(itemName, 4, 23),
      ]);

      expect(items[0].quality).toBe(23);
      expect(items[1].quality).toBe(26);
    });

    it("Should drop quality to 0 when sell in date has passed 0", () => {
      const item = new Item(itemName, -1, 20);
      const items = createItems([item]);

      expect(items[0].quality).toBe(0);
    });
  });
});
