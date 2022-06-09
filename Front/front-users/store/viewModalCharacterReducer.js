export const viewModalCharacterReducer = (state = false, action) => {
    switch (action.type) {
      case "@viewModal/set":
        return true;
      case "@viewModal/reset":
        return false;
      default:
        return state;
    }
  };