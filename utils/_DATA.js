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
    sdg3fhdfsgiyjabvozdd253nd: {
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
      title: 'Default Deck 1',
      timestamp: 1467356887634,
      cardlist: ['8xf0y6ziyjabvozdd253nd'],
    },
    tylergfgfbdfgrbcvkhyozdd253nd: {
      id: 'tylergfgfbdfgrbcvkhyozdd253nd',
      title: 'Default deck 2',
      timestamp: 1467398787634,
      cardlist: ['8xf023fdfbef6ziyjabvozdd253nd', 'sdg3fhdfsgiyjabvozdd253nd'],
    },
    t43241ylergfgfbdfgrbcvkhyozdd253nd: {
      id: 't43241ylergfgfbdfgrbcvkhyozdd253nd',
      title: 'Default deck 3',
      timestamp: 1467498787634,
      cardlist: ['123123sdg3fhdfsgiyjabvozdd253nd'],
    },
  };
  

  
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
  
  export function _getDecks(userId) {
    const data = users[userId];
    return new Promise((res, rej) => {
      setTimeout(() => res(data.decks), 1000);
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

  
