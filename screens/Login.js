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

class Login extends React.Component {
  handleLogin = () => {
    const {email, password} = this.state;

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => console.log(error));
  };

  state = {
    email: '',
    password: '',
  };

  render() {
    return (

      <View style={styles.foundation}>

        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../assets/Logo/gb.png')}

          />
        </View>
        <View style={styles.loginContainer}>
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
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Button style={styles.text}
            title="Don't have an account yet? Sign up"
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </View>

        <View style={styles.footer}>

          <Image style={styles.image} source={require('../assets/Text/welcome.png')} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Styles Container
  loginContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },

  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  foundation: {
    flex:1,
    justifyContent:"center",
    backgroundColor:"#fff",

  },

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#fff',

  },

  button: {
    marginTop: 30,
    marginBottom: 20,
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

  image: {
    flex:1,
    aspectRatio: 1.4,
    resizeMode:'cover',
  },
});

export default Login;
