const INI_STATE = {};

export const iniData = (state = INI_STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return { decks: action.decks };
    default:
      return state;
  }
};

export const loading = (state = true, action) => {
  switch (action.type) {
    case 'FINISH_LOADING':
      return false;
    case 'SET_LOADING':
      return true;
    default:
      return state;
  }
}