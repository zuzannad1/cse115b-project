import React from 'react';
import Firebase from '../config/Firebase';
import {
  Image,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';

class Signup extends React.Component {
  handleSignUp = () => {
    const {email, password} = this.state;
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('MyProfileScreen'))
      .catch(error => console.log(error));
  };

  state = {
    name: '',
    email: '',
    password: '',
  };

  render() {
    return (
      <View style={styles.foundation}>
        <View style={styles.buttonSpace} />
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../assets/Text/register.png')}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.buttonSpace} />

          <TextInput
            style={styles.inputBox}
            value={this.state.name}
            onChangeText={name => this.setState({name})}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Take me back!</Text>
          </TouchableOpacity>

          <View style={styles.buttonSpace} />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
} //

const styles = StyleSheet.create({
  foundation: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  buttonSpace: {
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#3caffa',
    borderColor: '#3caffa',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  buttonBack: {
    fontSize: 12,
  },
  image: {
    flex: 1,
    aspectRatio: 2.3,
  },
});

export default Signup;
