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
    Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => Firebase.database().ref("/users/" + Firebase.auth().currentUser.uid).set({
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
                    },

                    Tags:
                    {
                      Counts:
                      {
                        FirstAid: 0,
                        GenDiabetes: 0,
                        LifeTips: 0,
                        SgrLvl: 0
                      },
                      
                      MostAsked:
                      {
                        First: "Null",
                        Second: "Null",
                        Third: "Null"
                      }
                      

                    }
                  }).then(() => this.props.navigation.navigate('Profile')).catch(error => console.log(error)));
;
  };

  state = {
    name: 'Firstname LastName',
    email: 'name@email.com',
    password: '123456',
    Age: '47 and 3 Months',
    City: 'City',
    FirstName: 'FirstName',
    Height: '6ft 5in',
    LastName: 'LastName',
    State: 'State',
    Type_ofDiabetes: 'Type 2',
    Weight: '78 Pounds'
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
            value={this.state.Weight}
            onChangeText={Weight => this.setState({Weight})}
            placeholder="Weight"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.City}
            onChangeText={City => this.setState({City})}
            placeholder="City"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.State}
            onChangeText={State => this.setState({State})}
            placeholder="State"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.Type_ofDiabetes}
            onChangeText={Type_ofDiabetes => this.setState({Type_ofDiabetes})}
            placeholder="Type of Diabetes"
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.Height}
            onChangeText={Height => this.setState({Height})}
            placeholder="Height"
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
