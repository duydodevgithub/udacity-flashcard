import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


function Item({ data, navigation }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>Title: {data.title}</Text>
        <Button
            style={styles.title}
            title='Choose Deck'
            onPress={() => navigation.navigate('DeckDetail', {deck: data})}
        />
      </View>
    );
  }

class HomeScreen extends React.Component {
    render() {
        if(this.props.loading) {
            return (
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            )
        }
        const {navigation, decks} = this.props;
        console.log(decks);
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Notification Appear here</Text>
                    <FlatList
                        data={decks}
                        renderItem={({ item }) => <Item data={item} navigation={navigation} />}
                        keyExtractor={item => item.id}
                    />
                    <Button
                        style={styles.title}
                        title='Add New Deck'
                        onPress={() => navigation.navigate('AddNewDeck')}
                    />
                </View>
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

export default connect(mapStateToProps)(HomeScreen);