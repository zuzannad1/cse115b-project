import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {StyleSheet, Button} from 'react-native';
import Voice from 'react-native-voice';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {dialogflowConfig} from '../config';
//import Tts from 'react-native-tts';

import Firebase from '../config/Firebase';

const BOT_USER = {
  _id: 2,
  name: 'Glooko Buddy',
  avatar:
    'https://media.glassdoor.com/sql/1320444/glooko-squarelogo-1467383473350.png',
};

class ChatbotScreen extends React.Component {
  state = {
    BpHigh: '',
    BpLow: '',
    BgHigh: '',
    BgLow: '',
    BgHighdate: '',
    BgLowdate: '',
    currUser: Firebase.auth().currentUser.uid,
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
    //   Tts.addEventListener('tts-start', event => console.log('start', event));
    //   Tts.addEventListener('tts-finish', event => console.log('finish', event));
    //   Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
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
  handleWriteBG(BGamount) {
    currDate = new Date();
    Firebase.database()
      .ref('/data/Analytics/')
      .once('value', snapshot => {
        var high = snapshot.child('HighestBG').val();
        var low = snapshot.child('LowestBG').val();
        this.setState({
          BgHigh: high,
          BgLow: low,
        });
      });
    Firebase.database()
      .ref('/users/' + this.state.currUser + '/Analytics/BloodGlucoseLog/')
      .push({
        currDate: BGamount,
      });
    if (this.state.BgHigh == 'Null') {
      Firebase.database()
        .ref('/users/' + this.state.currUser + '/Analytics/')
        .update({
          HighestBG: amount,
          HighestBGdate: currDate,
        });
    }
    if (this.state.BgLow == 'Null') {
      Firebase.database()
        .ref('/users/' + this.state.currUser + '/Analytics/')
        .update({
          LowestBG: amount,
          LowestBGdate: currDate,
        });
    }
    if (this.state.BgHigh < amount) {
      Firebase.database()
        .ref('/users/' + this.state.currUser + '/Analytics/')
        .update({
          HighestBG: amount,
          HighestBGdate: currDate,
        });
    } else if (this.state.BgLow > amount) {
      Firebase.database()
        .ref('/users/' + this.state.currUser + '/Analytics/')
        .update({
          LowestBG: amount,
          LowestBGdate: currDate,
        });
    }
    return 'success';
  }

  //can currently handle
  //"what is my highest/lowest blood pressure"
  //"what is my highest/lowest blood glucose"
  //returns either a response or Null
  hanldeRead(res) {
    //Firebase.database().ref(userId + '/items/').on('value', (snapshot) => {
    if (res[1] == 'blood') {
      if (res[2] == 'pressure') {
        if (res[3] == 'highest') {
          Firebase.database()
            .ref('/data/Analytics/')
            .once('value', snapshot => {
              var high = snapshot.child('HighestBP').val();
              this.setState({
                BpHigh: high,
              });
            });
          return 'Your highest Blood Pressure was ' + this.state.BpHigh;
        } else if (res[3] == 'lowest') {
          Firebase.database()
            .ref('/data/Analytics/')
            .once('value', snapshot => {
              var low = snapshot.child('LowestBP').val();
              this.setState({
                BpLow: low,
              });
            });
          return 'Your lowest Blood Pressure was ' + this.state.BpLow;
        }
      } else if (res[2] == 'glucose') {
        if (res[3] == 'highest') {
          Firebase.database()
            .ref('/users/' + this.state.currUser + '/Analytics/')
            .once('value', snapshot => {
              var high = snapshot.child('HighestBG').val();
              var highdate = snapshot.child('HighestBGdate').val();
              this.setState({
                BgHigh: high,
                BgHighdate: highdate,
              });
            });
          return (
            'Your highest Blood Glucose was ' +
            this.state.BgHigh +
            ' on ' +
            BgHighdate
          );
        } else if (res[3] == 'lowest') {
          Firebase.database()
            .ref('/users/' + this.state.currUser + '/Analytics/')
            .once('value', snapshot => {
              var low = snapshot.child('LowestBG').val();
              var lowdate = snapshot.child('LowestBGdate').val();
              this.setState({
                BgLow: low,
                BgLowdate: lowdate,
              });
            });
          return (
            'Your lowest Blood Glucose was ' +
            this.state.BgLow +
            ' on ' +
            BgLowdate
          );
        }
      }
    }
    return 'Null';
    //text = result;
  }

  //can currently handle
  //"my blood pressure today is (number)"
  //returns either success or Null
  hanldeWrite(res) {
    console.log(res[1] + res[2] + ' ' + res[3]);
    if (res[1] == 'blood') {
      if (res[2] == 'pressure') {
        var amount = res[3];
        Firebase.database()
          .ref('/data/Analytics/')
          .update({
            CurrentBP: amount,
          });
        //sees if blood pressure if greater than highest bp or lower than lowest bp
        //if it is then update the values in firebase
        Firebase.database()
          .ref('/data/Analytics/')
          .once('value', snapshot => {
            var high = snapshot.child('HighestBP').val();
            var low = snapshot.child('LowestBP').val();
            this.setState({
              BpHigh: high,
              BpLow: low,
            });
          });
        if (this.state.BpHigh == 'Null') {
          Firebase.database()
            .ref('/data/Analytics/')
            .update({
              HighestBP: amount,
            });
        }
        if (this.state.BpLow == 'Null') {
          Firebase.database()
            .ref('/data/Analytics/')
            .update({
              LowestBP: amount,
            });
        }
        if (this.state.BpHigh < amount) {
          Firebase.database()
            .ref('/data/Analytics/')
            .update({
              HighestBP: amount,
            });
        } else if (this.state.BpLow > amount) {
          Firebase.database()
            .ref('/data/Analytics/')
            .update({
              LowestBP: amount,
            });
        }
        return 'success';
      } else if (res[2] == 'glucose') {
        var amount = res[3];
        Firebase.database()
          .ref('/users/' + this.state.currUser + '/Analytics/')
          .update({
            CurrentBG: amount,
          });
        result = handleWriteBG(amount);
        return result;
      }
    }

    return 'Null';
  }

  handleResponse(result) {
    var high;
    this.setState({
      BpHigh: 2,
    });
    Firebase.database()
      .ref('/data/Analytics/')
      .once('value', snapshot => {
        high = snapshot.child('HighestBP').val();
        this.setState({
          BpHigh: 1,
        });
      });
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++First Value\n',
    );
    console.log(high);
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Second Value\n',
    );
    console.log(this.state.BpHigh);
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Third Value\n',
    );
    Firebase.database()
      .ref('/data/Analytics/')
      .once('value', snapshot => {
        high = snapshot.child('HighestBP').val();
      });
    console.log(high);
    console.log(
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++END\n',
    );

    console.log(result);
    console.log('Response reached');
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    var res = text.split(' ');
    if (res[0] == 'Read') {
      text = 'Could not retreive your data sorry';
      var response = this.hanldeRead(res);
      if (response != 'Null') {
        text = response;
      }
      let payload = result.queryResult.webhookPayload;
      this.showResponse(text, payload);
    } else if (res[0] == 'write') {
      text = 'Storing your data';
      var response = this.hanldeWrite(res);
      if (response != 'success') {
        text = 'Could not store your data sorry';
      }
      let payload = result.queryResult.webhookPayload;
      this.showResponse(text, payload);
    } else {
      let payload = result.queryResult.webhookPayload;
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

    //Tts.speak(msg.text);
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
    console.log('addingVoiceMsg');
    let res = reses[0];
    let count = {
      _id: this.state.messages.length + 1,
      text: res,
      createdAt: new Date(),
      user: {_id: 1},
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [count]),
    }));
    Dialogflow_V2.requestQuery(
      res,
      result => this.handleResponse(result),
      error => console.log(error),
    );
  };

  renderBubble = props => {
    const {currentUser} = this.state;
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
            backgroundColor: 'rgba(61,180,255,0.67)',
          },
          left: {
            backgroundColor: '#3caffa',
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
        <Button onPress={this._startRecognition} title="Begin Dictation 🎤" />
        <Button onPress={this._stopRecognition} title="End Dictation 🚫" />
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
