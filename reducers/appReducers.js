const INI_STATE = {};

export const iniData = (state = INI_STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_DECKS':
      return action.decks;
    default:
      return state;
  }
};

export const loading = (state = true, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return true;
    case 'FINISH_LOADING':
      return false;
    default:
      return state;
  }
}