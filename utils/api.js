import {
  _getAllDecks,
  _saveDeck,
  _getCard,
  _getCards,
  _saveCard
  } from './_DATA';

import {AsyncStorage} from "react-native";

_storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
};

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
  
export function getInitialData() {
  _storeData();
  return Promise.all([_getAllDecks(), _getCards()]).then(([decks, cards]) => {
    return {
      decks,
      cards
    };
  });
}

export function saveDeck(name) {
  // console.log(name);
  return Promise.all([_saveDeck(name)]).then(() => {
    return Promise.all([_getAllDecks()]).then(([decks]) => {
      return {
        decks,
      };
    });
  });
}

export function saveCard(question, answer, deckId) {
  return Promise.all([_saveCard(question, answer, deckId), _getAllDecks()]).then(([data, decks]) => {
    return {
      data,
      decks
    };
  });
}