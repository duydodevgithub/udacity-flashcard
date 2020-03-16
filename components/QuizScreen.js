import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


class QuizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSaveResult = this.handleSaveResult.bind(this);
        this.today = this.today.bind(this);
        this.state = {
            total: 0,
            correct: 0,
            remaining: 0,
            cardList: [],
            fetching: true,
            disableTouchYes: false,
            disableTouchNo: false,
            backgroundButtonYes: "#96A469",
            backgroundButtonNo: "#96A469"

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

    today() {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        return month.toString() + date.toString() + year.toString();
    }

    next() {
        if(this.state.remaining >= 0) {
            this.setState((prev) => {
                return {
                    remaining: prev.remaining - 1,
                    disableTouchYes: false,
                    disableTouchNo: false,
                    disableTouchNext: false,
                    backgroundButtonYes: "#96A469",
                    backgroundButtonNo: "#96A469"
                }
            })
        } else {
            //dispatch result and save to asyncstorage
        }
    }

    handleSubmit(ans, answer) {
        if(ans === answer && ans === 1) {
            this.setState((prev) => {
                return {
                    correct: prev.correct + 1,
                    disableTouchYes: true,
                    disableTouchNo: true,
                    backgroundButtonYes: '#53CB2C'

                }
            })
        } else if (ans === answer && ans === 0) {
            this.setState((prev) => {
                return {
                    correct: prev.correct + 1,
                    disableTouchYes: true,
                    disableTouchNo: true,
                    backgroundButtonNo: '#53CB2C'
                }
            })
        } else {
            Alert.alert("Incorrect! Please try again next time !")
            this.setState((prev) => {
                return {
                    disableTouchYes: true,
                    disableTouchNo: true,
                    backgroundButtonYes: '#575A4E',
                    backgroundButtonNo: '#575A4E'
                }
            })
        }
    }

    handleSaveResult() {
        //save to history Object, asyncStorage and route to home page
        const today = this.today();
        const {title, id} = this.props.route.params.deck;
        const resultObj = {};
        resultObj[today] = {
            correct: this.state.correct,
            total: this.state.total,
            title,
            timestamp: Math.round((new Date()).getTime() / 1000)
        }
        console.log(resultObj);
        // this.props.navigation.navigate("Home")
    }

    showAnswer(ans) {
        Alert.alert(ans ? "Answer: Yes" : "Answer: No");
    }

    render() {
        const {deck} = this.props.route.params;
        const {cards} = this.props;
        const chart_wh = 250
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
     
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
                    {remaining < 0 ? (
                        <View style={styles.summary}>
                            <Text>Summary</Text>
                            <Text>Total cards in deck: {this.state.total}</Text>
                            <Text>Your Correct Answer: {this.state.correct}</Text>
                            <TouchableOpacity
                                    style={{width: 170, height: 100,paddingTop: 10,paddingBottom: 10, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#6DAF84", margin: 20, alignItems: 'center'}}
                                    onPress={() => this.handleSaveResult()}
                            ><Text style={{ fontSize: 20 }}>Back To Deck</Text></TouchableOpacity>
                            <TouchableOpacity
                                    style={{width: 170, height: 100,paddingTop: 10,paddingBottom: 10, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#6DAF84", margin: 20, alignItems: 'center'}}
                                    onPress={() => this.props.navigation.navigate("DeckDetail")}
                            ><Text style={{ fontSize: 20 }}>Restart Quiz</Text></TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ marginTop:20 }}>
                            <Text>Remaining question: {this.state.remaining}</Text>
                            <Text style={{ fontSize: 30,textAlign: 'center' }}>{cards[cardList[remaining]].text}</Text>
                            <View style={styles.questionContainer}> 
                                <TouchableOpacity disabled={this.state.disableTouchYes}
                                        style={{width: 120, height: 40, borderRadius:10, backgroundColor:this.state.backgroundButtonYes, margin: 20, alignItems:'center'}}
                                        onPress={() => this.handleSubmit(1, cards[cardList[remaining]].answer)}
                                ><Text style={{ fontSize:30 }}>Yes</Text></TouchableOpacity>
                                <TouchableOpacity disabled={this.state.disableTouchNo}
                                        style={{width: 120, height: 40, borderRadius:10, backgroundColor:this.state.backgroundButtonNo, margin: 20, alignItems:'center'}}
                                        onPress={() => this.handleSubmit(0, cards[cardList[remaining]].answer)}
                                ><Text style={{ fontSize:30 }}>No</Text></TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity disabled={!this.state.disableTouchYes}
                                        style={{width: 170, height: 100,paddingTop: 10,paddingBottom: 10, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#209CCF", margin: 20, alignItems: 'center'}}
                                        onPress={() => this.next()}
                                ><Text style={{ fontSize:30 }}>Next Question</Text></TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity disabled={false}
                                        style={{width: 170, height: 100,paddingTop: 10,paddingBottom: 10, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#6DAF84", margin: 20, alignItems: 'center'}}
                                        onPress={() => this.showAnswer(cards[cardList[remaining]].answer)}
                                ><Text style={{ fontSize:30 }}>Show Answer</Text></TouchableOpacity>
                            </View>
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
        alignItems: 'center'
      },
    spinnerTextStyle: {
        color: '#FFF'
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      summary: {
        backgroundColor: '#DFE3D4',
        width: 300,
        height:200,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center'
      }
  });

function mapStateToProps({loading, cards}) {
    return {
        loading,
        cards
    }
}

export default connect(mapStateToProps)(QuizScreen);