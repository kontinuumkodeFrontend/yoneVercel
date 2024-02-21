import { Constants } from "../constants";

export const modalVisible = {
    modalOpen: (dialogeType) => ({
      type: Constants?.SHOW_DIALOG,
      isOpen: true,
      dialogeType: dialogeType,
    }),
    modalClose: () => ({
      type: Constants?.HIDE_DIALOGE,
      isClose: false,
    }),
};


export const popupVisible = {
  popupOpen: (dialogeType) => ({
    type: Constants?.SHOW_POPUP,
    isOpen: true,
    dialogeType: dialogeType,
  }),
  popupClose: () => ({
    type: Constants?.HIDE_POPUP,
    isClose: false,
  }),
};

