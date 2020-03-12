import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


class HomeScreen extends React.Component {
    render() {
        const {navigation} = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner
                        visible={this.props.loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                />
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    }
  });

function mapStateToProps({loading}) {
    return {
        loading
    }
}

export default connect(mapStateToProps)(HomeScreen);