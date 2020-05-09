import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import Firebase from '../config/Firebase';
// Gotten from bootdey.com/react-native-snippet/23/Profile-ui-example

class MyProfileScreen extends Component {
  state = {
    currUser: Firebase.auth().currentUser.uid
  }

  UNSAFE_componentWillMount() {
    Firebase.database().ref('/users/' + this.state.currUser + '/Profile/').once('value', snapshot => {
          var firstname = snapshot.child('FirstName').val();
          var lastname = snapshot.child('LastName').val();
          var age = snapshot.child('Age').val();
          var weight = snapshot.child('Weight').val();
          var city = snapshot.child('City').val();
          var state = snapshot.child('State').val();
          var type = snapshot.child('Type_ofDiabetes').val();
          this.setState({
            FirstName: firstname,
            LastName: lastname,
            Age: age,
            Weight: weight,
            City: city,
            State: state,
            Type_ofDiabetes: type,
          });
      });

  }

  render() {
    return (
      <View style={styles.container}>
        {/* Check out styles for info on header, footer, etc. */}
        <View style={styles.header} />
        {/* Images go here */}
        <Image
          style={styles.avatar}
          source={require('../assets/profile.png')}
        />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>First, Last</Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Edit Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => Firebase.auth().signOut().then(() => this.props.navigation.navigate('Splash')).catch(error => console.log(error))}>
                <Text>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Personal Information</Text>
            <Text style={styles.description}>{this.state.FirstName} {this.state.LastName}</Text>
            <Text style={styles.description}>{this.state.Age}</Text>
            <Text style={styles.description}>{this.state.Weight}</Text>
            <View style={styles.buttonSpace} />
            <Text style={styles.heading}>Health</Text>
            <Text style={styles.description}>Diabetes Type {this.state.Type_ofDiabetes}</Text>
            <Text style={styles.description}>MEDICINE TYPE</Text>
            

            <View style={styles.footer}>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// -------------------------- Style sheets --------------------------
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#2E3438',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },

  body: {
    marginTop: 40,
    alignSelf: 'center',
  },

  buttonSpace: {
    marginTop: 30,
    marginBottom: 10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },

  nameContainer: {
    flex: 1,
  },
  personalContent: {
    flex: 1,
    backgroundColor: '#800020',
  },

  name: {
    fontSize: 28,
    fontWeight: '600',
    paddingBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: '600',
  },

  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },

  leftAdjust: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default MyProfileScreen;
