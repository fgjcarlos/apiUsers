export const userReducer = (state = null, action) => {
    switch (action.type) {
      case "@user/set":
        return action.payload;
      case "@user/reset":
        return null;
      default:
        return state;
    }
  };