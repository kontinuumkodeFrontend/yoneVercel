import { Constants } from "../constants";

const initialState = {
  isDialogeOpen: false,
  modalCategory: null,
  isPopupOpen: false,
  popupCategory: null,
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SHOW_DIALOG:
      return {
        ...state,
        isDialogeOpen: action.isOpen,
        modalCategory: action.dialogeType,
      };

    case Constants.HIDE_DIALOGE:
      return {
        ...state,
        isDialogeOpen: action.isClose,
      };
    case Constants.SHOW_POPUP:
      return {
        ...state,
        isPopupOpen: action.isOpen,
        popupCategory: action.dialogeType,
      };

    case Constants.HIDE_POPUP:
      return {
        ...state,
        isPopupOpen: action.isClose,
      };

    
    default:
      return state;
  }
};
