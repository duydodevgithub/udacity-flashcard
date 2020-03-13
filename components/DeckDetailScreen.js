import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

class DeckDetailScreen extends React.Component {
    render() {
        const {deck} = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <Text>Deck Title: {deck.title}</Text>
                {deck.cardlist.length === 0 ? 
                    (
                        <View>
                            <Text>You have no cards in deck. Please add new cards.</Text>
                        </View>
                    )
                    :
                    (
                        <View>
                            <Text>Number of cards in deck: {deck.cardlist.length}</Text>
                            <Button
                                style={styles.title}
                                title='Start Quiz'
                                onPress={()=>this.props.navigation.navigate("Quiz", {deck: deck})}
                            />
                        </View>
                    
                    )
                }
                    <Button
                        style={styles.title}
                        title='Add New Card'
                        onPress={() => this.props.navigation.navigate("AddNewCard")}
                    />
            </SafeAreaView>
        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
      },
    spinnerTextStyle: {
        color: '#FFF'
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
  });

function mapStateToProps({loading, iniData}) {
    return {
        loading,
        decks: Object.values(iniData)
    }
}

export default connect(mapStateToProps)(DeckDetailScreen);