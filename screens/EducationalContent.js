import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

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
class EducationalContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          This is where educational content will be. Depending on whether the
          user is logged in or not, customised / uncustomised content will be
          provided. Customisation is to be based on tracking questions asked to
          the dialogflow chatbot, and adjusting the content based on the topics
          user asks the most. For now it will only be uncustomised content.
        </Text>
      </View>
    );
  }
}

export default EducationalContent;
