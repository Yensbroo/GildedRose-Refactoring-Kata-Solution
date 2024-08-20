# Gilded Rose Refactoring Kata solution

This repo contains my refactored version of the Kata

## Getting started

Install dependencies:
```sh
npm install
```

## Tests
All tests are written with `vitest`. To run these tests use:
```sh
npm run test:vitest
```

## How it works

Items can be categorised into 5 types:
- Normal items
- Backstage passes
- Aged Brie
- Conjured items
- Legendary items

For every type of item a class is created using the Strategy pattern to have separation of concerns.
All classes can be found in the `item-processor` folder along with the `ItemProcessor` class.
The `ItemProcessor` handles picking the right class for the item it is provided,
and applies the required logic that applies to all or most items.

The `GildedRose` class iterates over all items, and passes it to the `ItemProcessor` class.
After having processed all items, it filters the items that didn't have a valid `sellIn` or `quality` value.
