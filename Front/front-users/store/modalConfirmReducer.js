export const modalConfirmReducer = (state = false, action) => {
    switch (action.type) {
      case "@modalConfirm/set":
        return true;
      case "@modalConfirm/reset":
        return false;
      default:
        return state;
    }
  };