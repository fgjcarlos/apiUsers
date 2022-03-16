const avatar = {
  id: "",
  name: "",
  url: "",
  style: "",
  created_at: "",
  updated_at: "",
};

export const avatarReducer = (state = null, action) => {
  switch (action.type) {
    case "@avatar/set":
      return action.payload;
    case "@avatar/updateStyle":
      return {...state, style: action.payload} ;
    default:
      return state;
  }
};
