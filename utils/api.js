import {
  _getAllDecks,
  } from './_DATA';

import {AsyncStorage} from "react-native";
  
export function getInitialData() {
  return Promise.all([_getAllDecks()]).then(([decks]) => {
    return {
      decks,
    };
  });
}