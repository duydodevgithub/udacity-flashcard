const INI_STATE = {};

export const iniData = (state = INI_STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_DECKS':
      return action.decks;
    default:
      return state;
  }
};

export const history = (state = INI_STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_HISTORY':
      return action.history;
    case 'ADD_HISTORY':
      return {...state,...action.history}
    default:
      return state;
  }
};

export const cards = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CARDS':
      return action.cards;
    case 'ADD_CARD':
      return {...state, ...action.card}
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