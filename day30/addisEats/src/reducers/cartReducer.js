export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
        },
      ];
    }

    case "REMOVE": {
      const existingItem = state.find((item) => item.id === action.payload);

      if (!existingItem) {
        return state;
      }

      if (existingItem.quantity > 1) {
        return state.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        );
      }

      return state.filter((item) => item.id !== action.payload);
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
}
