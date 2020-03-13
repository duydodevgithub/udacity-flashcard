
import {getInitialData, saveDeck} from "../utils/api";


export function getDecks(decks) {
    return {
      type: "RECEIVE_DECKS",
      decks: decks
    }
  }

export function saveNewDeck() {
  return {
    type: "ADD_NEW_DECK"
  }
}

export function handleAddNewDeck(name) {
  return(dispatch) => {
    dispatch({type: "SET_LOADING"});
    return saveDeck(name)
    .then(({decks}) => {
      dispatch(getDecks(decks));
    }).then(()=>{
      dispatch({type: "FINISH_LOADING"});
    })
  }
}

export function handleLoadInitialData() {
    return (dispatch) => {
      dispatch({type: "SET_LOADING"});
      return getInitialData()
      .then(({decks}) => {
        dispatch(getDecks(decks))
      }).then(()=>{
        dispatch({type: "FINISH_LOADING"});
      })
    }
  }