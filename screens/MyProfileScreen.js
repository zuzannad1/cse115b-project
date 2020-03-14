import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Firebase from '../config/Firebase';

class MyProfileScreen extends React.Component {

   handlePush = () => {
    const {fbvalue} = this.state;

    Firebase.database().ref('/items').push({
      item: fbvalue,
    })
   };  
   state = { currUser: Firebase.auth().currentUser.uid, 
              fbvalue: ''
   };
   // componentDidMount() {
   //     const{currentUser} = Firebase.auth()
   //     this.setState({ currentUser })
   // }    
   render() {
     return (

      // <body>hello</body>
         <View style={styles.container}>
         <Text style={styles.header}>
           This is where user profile will be.
           User is {this.state.currUser}
           </Text>
         <TextInput
          style={styles.inputBox}
          value={this.state.fbvalue}
          onChangeText={fbvalue => this.setState({fbvalue})}
          placeholder=""
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handlePush}>
          <Text style={styles.buttonText}>Push to Firebase</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

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
export default MyProfileScreen;