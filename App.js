import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {logger} from "./middlewares/appMiddlewares";
import {iniData, loading, cards, history} from "./reducers/appReducers";
import {handleLoadInitialData} from "./actions/shared";
import HomeScreen from "./components/HomeScreen";
import DeckDetailScreen from "./components/DeckDetailScreen";
import AddNewDeckScreen from "./components/AddNewDeckScreen";
import AddNewCardScreen from "./components/AddNewCardScreen";
import QuizScreen from "./components/QuizScreen";


const store = createStore(combineReducers({
  loading,
  iniData,
  cards,
  history
}), applyMiddleware(thunk,logger));


const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount() {
    store.dispatch(handleLoadInitialData());
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DeckDetail" component={DeckDetailScreen} />
            <Stack.Screen name="AddNewDeck" component={AddNewDeckScreen} />
            <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}




export default App;