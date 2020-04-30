import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {StyleSheet, Button} from 'react-native';
import Voice from 'react-native-voice';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {dialogflowConfig} from '../config';
import Tts from 'react-native-tts';

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
    twice: 0,
  };

   UNSAFE_componentWillMount(){
    Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").once('value', snapshot => {
              var high = snapshot.child("HighestBG").val()
              var highdate = snapshot.child("HighestBGdate").val()
              var low = snapshot.child("LowestBG").val()
                var lowdate = snapshot.child("LowestBGdate").val()
                    this.setState({
                        BgHigh: high,
                        BgHighdate: highdate,
                        BgLow: low,
                        BgLowdate: lowdate
                })
                  });

  }

 constructor(props) {
    super(props);
    Voice.onSpeechResults = this.onSpeechResultsfn.bind(this);
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
    }

  onSpeechResultsfn(e) {
    if(this.state.results.length == 0) { 
       console.log('onSpeechResults: ', e);
       this.setState({
          results: e.value,
       });
       this._addVoiceMsg(this.state.results);
    }
  }

  componentWillmount() {
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
 updateMyState(){
    Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").once('value', snapshot => {
              var high = snapshot.child("HighestBG").val()
              var highdate = snapshot.child("HighestBGdate").val()
              var low = snapshot.child("LowestBG").val()
              var lowdate = snapshot.child("LowestBGdate").val()
              this.setState({
                        BgHigh: high,
                        BgHighdate: highdate,
                        BgLow: low,
                        BgLowdate: lowdate
                })
                  });
  }

  //can currently handle
  //"what is my highest/lowest blood pressure"
  //"what is my highest/lowest blood glucose"
  //returns either a response or Null
  handleRead(res){
    this.updateMyState();
      if(res[1] == 'blood'){
        if(res[2] == 'glucose'){
          if(res[3] == 'highest'){
                  return "Your highest Blood Glucose was " + this.state.BgHigh + " on " + this.state.BgHighdate;
          }
          else if(res[3] == 'lowest'){
                return "Your lowest Blood Glucose was " + this.state.BgLow + " on " + this.state.BgLowdate;
          }
        }
      }
      return 'Null';
  }

  //can currently handle
  //"my blood pressure today is (number)"
  //returns either success or Null
  handleWrite(res){
      console.log(res[1]+res[2]+' '+res[3]);
      if(res[1] == 'blood'){
        if(res[2] == 'glucose'){
          var amount = res[3];
          result = this.handleWriteBG(amount);
          return result;
        }

      }
    
      return "Null";
  }

  handleWriteBG(BGamount){
      currDate = new Date();
      var pushlog = Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/BloodGlucoseLog/");
      pushlog.push({
          date: currDate,
          value: BGamount,
      });
    if(this.state.BgHigh == 'Null'){
      Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").update({
            HighestBG: BGamount,
            HighestBGdate: currDate
      });
      this.setState({
                        BgHigh: BGamount,
                        BgHighdate: currDate,
                });
    }
    if(this.state.BgLow == 'Null'){
      Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").update({
            LowestBG: BGamount,
            LowestBGdate: currDate
      });
      this.setState({
                        BgLow: BGamount,
                        BgLowdate: currDate,
                });
    }
    if(this.state.BgHigh < BGamount){
      Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").update({
            HighestBG: BGamount,
            HighestBGdate: currDate
      });
      this.setState({
                        BgHigh: BGamount,
                        BgHighdate: currDate,
                });
    }else if(this.state.BgLow > BGamount){
      Firebase.database().ref("/users/" + this.state.currUser + "/Analytics/").update({
            LowestBG: BGamount,
            LowestBGdate: currDate
      });
       this.setState({
                        BgLow: BGamount,
                        BgLowdate: currDate,
                });
    }
      return 'success';
  }

    handleResponse(result) {
    console.log(result);
    console.log("Response reached");
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    var res = text.split(" ");
    if(res[0] == 'Read') {
        text = 'Could not retreive your data sorry';
        var response = this.handleRead(res);
        if(response != 'Null'){
            text = response;
        }
        let payload = result.queryResult.webhookPayload;
        this.showResponse(text, payload);
    } else if(res[0] == 'write') {
        text = 'Storing your data';
        var response = this.handleWrite(res);
        if(response != 'success'){
            text = "Could not store your data sorry";
        }
        let payload = result.queryResult.webhookPayload;
        this.showResponse(text, payload);
    }
    else {
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
    Tts.speak(msg.text);
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
    console.log(res)
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default ChatbotScreen;
