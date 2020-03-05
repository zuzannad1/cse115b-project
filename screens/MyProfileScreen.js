import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Firebase from '../config/Firebase';

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 45,
  },
  header: {
    fontSize: 15,
    textAlign: 'center',
  },
});

class MyProfileScreen extends React.Component {
   state = { currentUser: null }
   componentDidMount() {
        const { currentUser } = Firebase.auth()
        this.setState({ currentUser })
   }
   render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          This is where user profile will be.
          User = {currentUser}
        </Text>
      </View>
    );
  }
}
export default MyProfileScreen;
