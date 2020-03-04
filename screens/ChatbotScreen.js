import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {StyleSheet, Button, TouchableHighlight} from 'react-native';
import Voice from 'react-native-voice';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {dialogflowConfig} from '../config';

import Firebase from '../config/Firebase';

const BOT_USER = {
  _id: 2,
  name: 'Glooko Buddy',
  avatar:
    'https://media.glassdoor.com/sql/1320444/glooko-squarelogo-1467383473350.png',
};
class ChatbotScreen extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: 'Lost on what I may help with? \nSay: "What do you know?"',
        createdAt: new Date(),
        user: BOT_USER,
      },
      {
        _id: 2,
        text:
          'Hi! I am GlookoBuddy 🤖 \nI am here to answer your questions about diabetes.',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
    results: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechResults = this.onSpeechResultsfn.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndfn.bind(this);
  }

  onSpeechResultsfn(e) {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  }

  onSpeechEndfn(e) {
    this._addVoiceMsg(this.state.results);
  }
   componentWillnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  async componentDidMount() {
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
    var res = text.split(" ");
    if(res[0] == 'read') {
      text = 'Your data is:';
      //result = FBListener(get user id, data);
      //text = result;
      let payload = result.queryResult.webhookPayload;
      this.showResponse(text, payload);
    } else if(res[0] == 'store') {
      text = 'Storing your data';
      //success = storeData(userID, data);
      let payload = result.queryResult.webhookPayload;
      this.showResponse(text, payload);
    } else {
      let payload = result.queryResult.webhookPayload;
      this.showResponse(text, payload);
    }
  }
  //function for storing data into Firebase
  storeData(userId, data) {
    Firebase.database().ref('users/' + userId).set({
      data: data
    });
  }

  //function for reading data from Firebase
  FBListener(userId) {
    Firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const data = snapshot.val().data;
      console.log("Data retrieved: " + data);
      return data;
    });
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

  _startRecognition = async () => {
    this.setState({
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognition = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  };

 _addVoiceMsg = reses => {
  console.log('addingVoiceMsg')
  let res = reses[0];
  let count = {
    _id: this.state.messages.length + 1,
    text: res,
    createdAt: new Date(),
    user: {_id: 1,}
  };
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, [count]),
   }));
   Dialogflow_V2.requestQuery(
      res,
      result => this.handleResponse(result),
      error => console.log(error),
    );

  
}

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#C6A8F1',
          },
          left: {
            backgroundColor: '#7fc8f1',
          },
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={this.renderBubble}
        />
        <Button onPress = {this._startRecognition} title='Start'>
       </Button>
       <Button onPress = {this._stopRecognition} title='End'>
       </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
export default ChatbotScreen;
