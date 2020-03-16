import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


function today() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    return month.toString() + date.toString() + year.toString();
}

class DeckDetailScreen extends React.Component {
    render() {
        const {deck} = this.props.route.params;
        const d = new Date(deck.timestamp);
        return (
            <SafeAreaView style={styles.container}>
                {deck.cardlist.length === 0 ? 
                    (
                        <View style={styles.item}>
                            <Text>You have no cards in deck. Please add new cards.</Text>
                        </View>
                    )
                    :
                    (
                        <View style={styles.item}>
                            <Text style={{ fontSize: 20 }}>Deck Title: {deck.title}</Text>
                            <Text style={{ fontSize: 15 }}>Number of cards in deck: {deck.cardlist.length}</Text>
                            <Text style={{ fontSize: 15 }}>Created Date: {d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>this.props.navigation.navigate("Quiz", {deck: deck})}
                            ><Text>Start Quiz</Text></TouchableOpacity>
                        </View>
                    )
                }   
                <View style={styles.modifyDeck}>
                    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate("AddNewCard", {deckId: deck.id})}>
                        <Text>Add New Deck</Text>
                    </TouchableHighlight>
                </View>
                   
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center', 
      },
    spinnerTextStyle: {
        color: '#FFF'
    },
    modifyDeck: {
        flexDirection: 'row'
    },
    item: {
        backgroundColor: '#DFE3D4',
        width: 300,
        height:150,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center'
      },
    button : {
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#72929E',
        padding: 10
    }
  });

function mapStateToProps({loading, iniData, history}) {
    return {
        loading,
        decks: Object.values(iniData),
        history
    }
}

export default connect(mapStateToProps)(DeckDetailScreen);