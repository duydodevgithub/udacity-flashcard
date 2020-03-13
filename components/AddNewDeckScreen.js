import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import t from 'tcomb-form-native';
import {connect} from "react-redux";
import {handleAddNewDeck} from "../actions/shared";


const Form = t.form.Form;
const Deck = t.struct({
  title: t.String,
});

var options = {
  fields: {
    title: {
      placeholder: 'Enter your Deck Title',
    },
  },
};

class AddNewDeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    var value = this.refs.form.getValue();
    if (value) {
        // console.log(value.title)
        this.props.dispatch(handleAddNewDeck(value.title))
    }
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Form ref="form" type={Deck} options={options} />

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

function mapStateToProps({loading}) {
  return {
    loading
  }
}

export default connect(mapStateToProps)(AddNewDeckScreen);
