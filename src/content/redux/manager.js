// sharedDataActions.js
export const updateSharedData = (data) => {
  return { type: "UPDATE_SHARED_DATA", payload: data };
};

// sharedDataReducer.js
const initialState = {
  sharedData: "Initial Shared Data",
};

const sharedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SHARED_DATA":
      return { ...state, sharedData: action.payload };
    default:
      return state;
  }
};

export default sharedDataReducer;
