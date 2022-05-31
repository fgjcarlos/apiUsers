export const characterReducer = (state = null, action) => {
    switch (action.type) {
      case "@character/set":
        return action.payload;
      case "@character/reset":
        return null;
      default:
        return state;
    }
  };