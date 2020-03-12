
import {getInitialData} from "../utils/api";


export function getDecks(decks) {
    return {
      type: "RECEIVE_DATA",
      decks: decks
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