import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";
import t from 'tcomb-form-native';


const Form = t.form.Form;
const Card = t.struct({
  question: t.String,
  answer: t.String,
});

var options = {
  fields: {
    question: {
      placeholder: 'Enter your question',
    },
    answer: {
      placeholder: 'Enter yes/no',
    }
  },
};

class AddNewCardScreen extends React.Component {
    constructor(props) {
      super(props);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
  
    handleFormSubmit() {
      var value = this.refs.form.getValue();
      if (value) {
        console.log(value);
      }
      // this.props.navigation.navigate('DeckList');
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Form ref="form" type={Card} options={options} />
  
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleFormSubmit}
            underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center',
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
  });

function mapStateToProps({loading, iniData}) {
    return {
        loading,
        decks: Object.values(iniData)
    }
}

export default connect(mapStateToProps)(AddNewCardScreen);