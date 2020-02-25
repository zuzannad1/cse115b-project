import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight} from 'react-native';
import Voice from 'react-native-voice';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat} from 'react-native-gifted-chat';
import {dialogflowConfig} from './config';

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
    recognized: '',
    pitch: '',
    error: '',
    started: '',
    results: [],
  };

constructor(props) {
  super(props);
  Voice.onSpeechStart = this.onSpeechStartfn.bind(this);
  Voice.onSpeechRecognized = this.onSpeechRecognizedfn.bind(this);
  Voice.onSpeechError = this.onSpeechErrorfn.bind(this);
  Voice.onSpeechVolumeChanged = this.onSpeechVolumeChangedfn.bind(this);
  //Voice.onSpeechEnd = this.onSpeechEndfn;
  Voice.onSpeechResults = this.onSpeechResultsfn.bind(this);
}

  onSpeechStartfn= e => {
    console.log('onSpeechStart: ',e);
  	this.setState({
  	   started: 'ok'
  	});
  }
  onSpeechRecognizedfn(e) {
    console.log('onSpeechRecognized: ',e);
    this.setState({
      recognized: 'ok',
    });
  }  
  onSpeechResultsfn(e) {
    console.log('onSpeechResults: ',e);
    this.setState({
      results: e.value,
    });
  }
  
  onSpeechErrorfn = e => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };
  onSpeechVolumeChangedfn = e => {
    // eslint-disable-next-line
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

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
    let payload = result.queryResult.webhookPayload;
    this.showResponse(text, payload);
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
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
}

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error("Voice.stop failed");
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  startRecognition(e) {
    Voice.start('en-US');
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Button onPress={this._startRecognition} title= 'Start'>
        </Button>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
export default App;
