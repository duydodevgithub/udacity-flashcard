import React from "react";
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";


function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Button
            title={title}
            onPress={() => Alert.alert('Simple Button pressed')}
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
                    <Text>Home Screen</Text>
                    <FlatList
                        data={decks}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
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