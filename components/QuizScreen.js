import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

class QuizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSaveResult = this.handleSaveResult.bind(this);
        this.state = {
            total: 0,
            correct: 0,
            remaining: 0,
            cardList: [],
            fetching: true
        }
    }

    componentDidMount() {
        const {deck} = this.props.route.params;
        this.setState({
            total: deck.cardlist.length,
            remaining: deck.cardlist.length - 1,
            cardList: deck.cardlist,
            fetching: false
        })
        
    }

    next() {
        if(this.state.remaining >= 0) {
            this.setState((prev) => {
                return {remaining: prev.remaining - 1}
            })
        } else {
            //dispatch result and save to asyncstorage
        }
    }

    handleSubmit(ans, answer) {
        if(ans === answer) {
            this.setState((prev) => {
                return {
                    correct: prev.correct + 1
                }
            })
        } else {
            console.log("Incorrect")
        }
        
    }

    handleSaveResult() {
        //save to asyncStorage and route to home page
        this.props.navigation.navigate("Home")
    }

    render() {
        const {deck} = this.props.route.params;
        const {cards} = this.props;
        if(this.state.fetching) {
            return (
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            )
        } else {
            const {cardList, remaining} = this.state
            return (
                <SafeAreaView style={styles.container}>
                    <Text>Quiz Screen</Text>
                    {remaining < 0 ? (
                        <View>
                            <Text>Summary</Text>
                            <Text>Total cards in deck: {this.state.total}</Text>
                            <Text>Your Correct Answer: {this.state.correct}</Text>
                            <Button
                                    style={styles.title}
                                    title='Save Result and Go To Home Page'
                                    onPress={() => this.handleSaveResult()}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text>{cards[cardList[remaining]].text}</Text>
                            <Button
                                    style={styles.title}
                                    title='Yes'
                                    onPress={() => this.handleSubmit(1, cards[cardList[remaining]].answer)}
                            />
                            <Button
                                    style={styles.title}
                                    title='No'
                                    onPress={() => this.handleSubmit(0, cards[cardList[remaining]].answer)}
                            />
                            <Button
                                    style={styles.title}
                                    title='Next'
                                    onPress={() => this.next()}
                            />
                        </View>
                        
                        )}
                </SafeAreaView>
            
            )
        }
        
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

function mapStateToProps({loading, cards}) {
    return {
        loading,
        cards
    }
}

export default connect(mapStateToProps)(QuizScreen);