import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat} from 'react-native-gifted-chat';
import {dialogflowConfig} from './config';

const admin = require('firebase-admin');

let serviceAccount = require('Keys/GlookoBuddyAdminKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const BOT_USER = {
  _id: 2,
  name: 'Glooko Buddy',
  avatar: 'https://media.glassdoor.com/sql/1320444/glooko-squarelogo-1467383473350.png',
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text:
          'Hi! I am your Glooko Buddy 🤖.\n\nI am here to answer your questions about diabetes. ',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleResponse(result),
      error => console.log(error),
    );
  }

handleResponse(result) {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    if (text == "read") {

      text = "What would you like to read?";
      text = db.collection('users').then((snapshot) => { snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
              });
            })
            .catch((err) => {
              console.log('Error getting documents', err);
            });;
      this.showResponse(text, payload);

    }else{
      this.showResponse(text, payload);
    }
  }

  showResponse(text, payload) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    if (payload && payload.is_image) {
      msg.text = text;
      msg.image = payload.url;
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
