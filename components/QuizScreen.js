import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

class QuizScreen extends React.Component {


    render() {
        const {deck} = this.props.route.params;
        console.log(deck);
        return (
            <SafeAreaView style={styles.container}>
                <Text>Quiz Screen</Text>
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

function mapStateToProps({loading}) {
    return {
        loading,
    }
}

export default connect(mapStateToProps)(QuizScreen);