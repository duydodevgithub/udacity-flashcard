import {AsyncStorage} from "react-native";

let cards = {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      text: 'Is Bitcoin a crypto currency?',
      answer: 1,
    },
    '8xf023fdfbef6ziyjabvozdd253nd': {
      id: '8xf023fdfbef6ziyjabvozdd253nd',
      timestamp: 1467166856498,
      text: 'Is Ethereum a crypto currency?',
      answer: 1,
    },
    'sdg3fhdfsgiyjabvozdd253nd': {
      id: 'sdg3fhdfsgiyjabvozdd253nd',
      timestamp: 1467166887634,
      text: 'Is the Earth square shape?',
      answer: 0,
    },
    '123123sdg3fhdfsgiyjabvozdd253nd': {
      id: '123123sdg3fhdfsgiyjabvozdd253nd',
      timestamp: 1467966887634,
      text: 'Is the Earth oval shape?',
      answer: 0,
    },
  };
  
  let decks = {
    sar8xf0y6ziyjedfdfozdd253nd: {
      id: 'sar8xf0y6ziyjedfdfozdd253nd',
      title: 'Default Deck',
      timestamp: 1467356887634,
      cardlist: ['8xf0y6ziyjabvozdd253nd','8xf023fdfbef6ziyjabvozdd253nd','sdg3fhdfsgiyjabvozdd253nd', '123123sdg3fhdfsgiyjabvozdd253nd'],
    }
  };

  let history = {
    '2152020': {
      sar8xf0y6ziyjedfdfozdd253nd: {
        title: 'Default Deck',
        total: 4,
        correct: 2,
        timestamp: '1584249779'
      }
    }
  }
  

  
  function generateUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
  
  function formatDeck({ title }) {
    return {
      id: generateUID(),
      title,
      timestamp: Date.now(),
      cardlist: [],
    };
  }

  function formatCard({ question, answer }) {
    return {
      id: generateUID(),
      text: question,
      timestamp: Date.now(),
      answer: answer,
    };
  }
  
  export function _getCards() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...cards }), 1000);
    });
  }

  export function _getHistory() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...history }), 1000);
    });
  }

  export function _getCard(id) {
    return new Promise((res, rej) => {
      setTimeout(() => res({ id: cards[id] }), 1000);
    });
  }
  
  
  export function _getAllDecks() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...decks }), 1000);
    });
  }
  
  
  export function _saveDeck(name) {
    return new Promise((res, rej) => {
      const formattedDeck = formatDeck({
        title: name,
      });
  
      setTimeout(() => {
        decks = {
          ...decks,
          [formattedDeck.id]: formattedDeck,
        };
        res({ [formattedDeck.id]: formattedDeck });
      }, 1000);
    });
  }

  export function _saveCard(name, answer, deckId) {
    return new Promise((res, rej) => {
      const formattedCard = formatCard({
        question: name,
        answer: answer
      });
      decks[deckId].cardlist.push(formattedCard.id)
      setTimeout(() => {
        cards = {
          ...cards,
          [formattedCard.id]: formattedCard,
        };
        res({ [formattedCard.id]: formattedCard });
      }, 1000);
    });
  }

  export const _storeHistory = async () => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
      // Error saving data
    }
  };
  
  export const _retrieveHistory = async () => {
    try {
      const value = await AsyncStorage.getItem('history');
      if (value !== null) {
        // We have data!
        return JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
      return _getHistory();
    }
  };

  export const _storeCards = async () => {
    try {
      await AsyncStorage.setItem('cards', JSON.stringify(tempCards));
    } catch (error) {
      // Error saving data
    }
  };

  export const _retrieveCards = async () => {
    try {
      const value = await AsyncStorage.getItem('cards');
      if (value !== null) {
        // We have data!
        console.log("from async storage",value);
        return JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
      cards = tempCards;
      _storeCards();
      return cards;
    }
  };

  export const _storeDecks = async () => {
    try {
      await AsyncStorage.setItem('decks', JSON.stringify(tempDecks));
    } catch (error) {
      // Error saving data
    }
  };

  export const _retrieveDecks = async () => {
    try {
      const value = await AsyncStorage.getItem('decks');
      if (value !== null) {
        // We have data!
        return JSON.parse(value);
      }
    } catch (error) {
      // Error retrieving data
      decks = tempDecks;
      _storeDecks();
      return decks;
    }
  };
  
