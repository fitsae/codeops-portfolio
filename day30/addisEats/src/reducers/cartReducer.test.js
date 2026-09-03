import { describe, expect, test } from "vitest";

import { cartReducer } from "./cartReducer";

const kitfo = {
  id: 6,
  name: "Kitfo",
  price: 450,
  category: "Dinner",
  spicy: true,
};

describe("cartReducer", () => {
  test("adds an item", () => {
    const result = cartReducer([], {
      type: "ADD",
      payload: kitfo,
    });

    expect(result).toEqual([
      {
        ...kitfo,
        quantity: 1,
      },
    ]);
  });

  test("increases quantity", () => {
    const state = [
      {
        ...kitfo,
        quantity: 1,
      },
    ];

    const result = cartReducer(state, {
      type: "ADD",
      payload: kitfo,
    });

    expect(result[0].quantity).toBe(2);
  });

  test("removes an item", () => {
    const state = [
      {
        ...kitfo,
        quantity: 1,
      },
    ];

    const result = cartReducer(state, {
      type: "REMOVE",
      payload: 6,
    });

    expect(result).toEqual([]);
  });

  test("decreases quantity", () => {
    const state = [
      {
        ...kitfo,
        quantity: 2,
      },
    ];

    const result = cartReducer(state, {
      type: "REMOVE",
      payload: 6,
    });

    expect(result[0].quantity).toBe(1);
  });

  test("clears cart", () => {
    const state = [
      {
        ...kitfo,
        quantity: 2,
      },
    ];

    const result = cartReducer(state, {
      type: "CLEAR",
    });

    expect(result).toEqual([]);
  });
});
