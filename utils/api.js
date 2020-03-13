import {
  _getAllDecks,
  _saveDeck
  } from './_DATA';

import {AsyncStorage} from "react-native";
  
export function getInitialData() {
  return Promise.all([_getAllDecks()]).then(([decks]) => {
    return {
      decks,
    };
  });
}

export function saveDeck(name) {
  console.log(name);
  return Promise.all([_saveDeck(name)]).then(() => {
    return Promise.all([_getAllDecks()]).then(([decks]) => {
      return {
        decks,
      };
    });
  });
}