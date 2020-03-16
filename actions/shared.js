
import {getInitialData, saveDeck, saveCard} from "../utils/api";


export function getDecks(decks) {
    return {
      type: "RECEIVE_DECKS",
      decks: decks
    }
  }

  export function getCards(cards) {
    return {
      type: "RECEIVE_CARDS",
      cards: cards
    }
  }

  export function addCard(card) {
    return {
      type: "ADD_CARD",
      card
    }
  }

export function saveNewDeck() {
  return {
    type: "ADD_NEW_DECK"
  }
}

export function getHistory(history) {
  return {
    type: "RECEIVE_HISTORY",
    history
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

export function handleAddNewCard(question, answer, deckId) {
  return(dispatch) => {
    dispatch({type: "SET_LOADING"});
    return saveCard(question, answer, deckId)
    .then(({data, decks}) => {
      dispatch(addCard(data));
      dispatch(getDecks(decks))
    }).then(() =>{
      dispatch({type: "FINISH_LOADING"});
    })
  }
}

export function handleLoadInitialData() {
    return (dispatch) => {
      dispatch({type: "SET_LOADING"});
      return getInitialData()
      .then(({decks, cards, history}) => {
        dispatch(getDecks(decks)),
        dispatch(getCards(cards)),
        dispatch(getHistory(history));
      }).then(()=>{
        dispatch({type: "FINISH_LOADING"});
      })
    }
  }