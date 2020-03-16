import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Animated } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


function Item({ data, navigation }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
            title='Choose Deck'
            onPress={() => navigation.navigate('DeckDetail', {deck: data})}
        >
            <Text style={{ fontSize: 20 }}>{data.title}</Text>
        </TouchableOpacity>
      </View>
    );
}

function greeting() {
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
        return ('Good morning!')
    } else if (curHr < 18) {
        return ('Good afternoon!')
    } else {
        return ('Good evening!')
    }
}

function today() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    return month.toString() + date.toString() + year.toString();
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        const {opacity} = this.state;
        Animated.timing(opacity, {toValue: 1, duration: 2000})
        .start()
    }

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
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notification}>
                    <Animated.View style={{ opacity: this.state.opacity }}>
                        <Text style={styles.title}>{greeting()}</Text>
                    </Animated.View>
                    {/* <Animated.Image
                        style={{ width:100, height: 100, opacity: this.state.opacity }}
                        source={{ uri: 'https://www.netcetra.com/images/howto_images/picmonkey-logo.jpg' }}
                    /> */}

                    {/* {this.props.history[today()] ? 
                        (<View>
                            <Text>Decks you have done today: </Text>
                            {
                                Object.keys(this.props.history[today()]).map((deckId) => {
                                    return (<Text key={deckId}>- {this.props.history[today()][deckId].title}</Text>)
                                })
                            } 
                        </View>)
                        : 
                        (<View><Text>You haven't done any decks today</Text></View>)
                    } */}
                </View>
                {this.props.decks.length > 0 ? 
                (<Animated.View style={[styles.deckList, {opacity: this.state.opacity}]}>
                    <FlatList
                        data={decks}
                        renderItem={({ item }) => <Item data={item} navigation={navigation} />}
                        keyExtractor={item => item.id}
                    />
                </Animated.View>) 
                : 
                (<View><Text>You don't have any decks</Text></View>)
                }

                <View style={{ flex: 3 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('AddNewDeck')}
                    ><Text>Add New Deck</Text></TouchableOpacity>
                </View>
                
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    notification: {
        flex: 1,
        backgroundColor: '#fff' ,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    deckList: {
        flex: 3,
        backgroundColor: '#7C8756' ,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10
    },
    item: {
        backgroundColor: '#DFE3D4',
        width: 300,
        height:50,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center'
      },
    title: {
        fontSize: 40
    }
  });

function mapStateToProps({loading, iniData, history}) {
    return {
        loading,
        decks: Object.values(iniData),
        history
    }
}

export default connect(mapStateToProps)(HomeScreen);