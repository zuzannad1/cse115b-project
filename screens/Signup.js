import React from 'react';
import Firebase from '../config/Firebase';
import {ScrollView } from 'react-native';
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

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => console.log(error));

    Firebase.database().ref("/users/" + Firebase.auth().currentUser.uid).set({
                    Analytics:
                    {
                      BestTime: "Null",
                      Bestday: "Null",
                      BloodGlucoseLog: {

                      },
                      CurrentBG: "Null",
                      HighestBG: "Null",
                      HighestBGdate: "Null",
                      LowestBG: "Null",
                      LowestBGdate: "Null"
                    },

                    Profile:
                    {
                      Age: this.state.Age,
                      City: this.state.City,
                      FirstName: this.state.FirstName,
                      Height: this.state.Height,
                      LastName: this.state.LastName,
                      MedicineList: {
                        exampleName: "exampleName"
                      },
                      State: this.state.State,
                      Type_ofDiabetes: this.state.Type_ofDiabetes,
                      Weight: this.state.Weight,
                      email: this.state.email
                    }
                  });
  };

  state = {
    name: '',
    email: '',
    password: '',
    Age: '',
    City: '',
    FirstName: '',
    Height: '',
    LastName: '',
    State: '',
    Type_ofDiabetes: '',
    Weight: ''
  };


  render() {
    return (
      <View style={styles.foundation}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../assets/Text/register.png')}
          />
        </View>

        <View style={styles.container}>
          <ScrollView>

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
          <TextInput
            style={styles.inputBox}
            value={this.state.Age}
            onChangeText={Age => this.setState({Age})}
            placeholder="Age"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={Weight => this.setState({Weight})}
            placeholder="Weight"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={City => this.setState({City})}
            placeholder="City"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={State => this.setState({State})}
            placeholder="State"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={Type_ofDiabetes => this.setState({Type_ofDiabetes})}
            placeholder="Type_ofDiabetes"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={Height => this.setState({Height})}
            placeholder="Pretty average I guess"
          />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Take me back!</Text>
          </TouchableOpacity>
        </View>
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
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  inputBox: {
    width: '100%',
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
