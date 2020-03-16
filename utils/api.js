import {
  _getAllDecks,
  _saveDeck,
  _getCard,
  _getCards,
  _saveCard,
  _getHistory,
  _retrieveHistory,
  _storeHistory,
  _storeDecks,
  _storeCards,
  _retrieveDecks,
  _retrieveCards
  } from './_DATA';

//   import {AsyncStorage} from 'react-native';
//   import { Notifications } from 'expo';

//   import {Permissions} from 'expo-permissions';

//   const NOTIFICATION_KEY = 'notification';

// export function clearLocalNotification () {
//   return AsyncStorage.removeItem(NOTIFICATION_KEY)
//   .then(Notifications.cancelAllScheduledNotificationsAsync())
// }

// export function creatNotificaiton () {
//   return {
//     title: 'Log your deck',
//     body: 'Do not forget to do quiz !',
//     ios: {
//       sound: true
//       }
//     }
// }

// export function setLocalNotification () {
//   AsyncStorage.getItem(NOTIFICATION_KEY)
//   .then(JSON.parse)
//   .then((data) => {
//     if(data === null) {
//       Permissions.askAsync(Permissions.NOTIFICATIONS)
//       .then(({status}) => {
//         if(status === 'granted') {
//           Notifications.cancelAllScheduledNotificationsAsync()

//           let tomorrow = new Date();
//           tomorrow.setDate(tomorrow.getDate() + 1)
//           tomorrow.setHours(20)
//           tomorrow.setMinutes(0)

//           Notifications.scheduleLocalNotificationAsync(
//             creatNotificaiton(),
//             {
//               time: tomorrow,
//               repeat: 'day'
//             }
//           )
//           AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//         }
//       })
//     }
//   })
// }
  
export function getInitialData() {
  // _retrieveDecks();
  // _retrieveCards();
  _storeHistory();
  _storeDecks();
  _storeCards();
  return Promise.all([_getAllDecks(), _getCards(), _retrieveHistory()]).then(([decks, cards, history]) => {
    return {
      decks,
      cards,
      history
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