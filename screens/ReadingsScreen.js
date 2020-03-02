import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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

class ReadingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          This is where the log readings and display readings / ask for readings functionality will be implemented.
        </Text>
      </View>
    );
  }
}

export default ReadingsScreen;
