// npm install react-native-splash-screen --save
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

class Splash extends React.Component {
	render() {
	    return (
	    	<View style={styles.foundation}>
		    	<View style={styles.header}>
					<Image
						style={styles.image} source={require('../assets/Logo/gb.png')}
						resizeMode= "contain"
					/>
				</View>
					
					<View style={styles.container}>
                            <Text style={styles.topText}>Choose a User</Text>

               <TouchableOpacity style={styles.userProfile} onPress={() => Firebase.auth().signInWithEmailAndPassword("KaylumPotter1337@gmail.com", "123456").then(() => this.props.navigation.navigate('UserInfo')).catch(error => console.log(error))}>
                <Image
                    style={styles.profileImage} source={require('../assets/uProfPlaceholder.png')}
                    resizeMode="contain"
                />
                <Text style={styles.profileText}> Kaylum, Potter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userProfile} onPress={() => Firebase.auth().signInWithEmailAndPassword("darrylrigby19@gmail.com", "123456").then(() => this.props.navigation.navigate('UserInfo')).catch(error => console.log(error))}>
                <Image
                    style={styles.profileImage} source={require('../assets/uProfPlaceholder.png')}
                    resizeMode="contain"
                />
                <Text style={styles.profileText}> Darryl, Rigby</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userProfile} onPress={() => Firebase.auth().signInWithEmailAndPassword("AprilCoates3131@gmail.com", "123456").then(() => this.props.navigation.navigate('UserInfo')).catch(error => console.log(error))}>
                <Image
                    style={styles.profileImage} source={require('../assets/uProfPlaceholder.png')}
                    resizeMode="contain"
                />
                <Text style={styles.profileText}> April, Coates</Text>
              </TouchableOpacity>
							<Text style={styles.bottomText}>Or make your own!</Text>

							<View style={styles.loginButton}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
								  <Text style={styles.registerText}> Login or Register</Text>
                </TouchableOpacity>
							</View>

					</View>
			</View>
    	);
  	}
}



// 
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
    backgroundColor: '#0085FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topText: {
  	margin: 10,
  	flex: 1,
  	color: 'white',
  	fontSize: 50,
  	fontWeight: "bold",
  },

  profileText: {
  	margin: 10,
  	flex: 1,
  	fontSize: 30,
  },

  bottomText:{
  	margin: 10,
  	flex: 1,
  	color: 'white',
  	fontSize: 40,
  	fontWeight: "bold",
  },

  registerText:{
  	flex: 1,
  	margin: 10,
  	fontSize: 30,
  	color: 'white',
  	fontWeight: "bold",
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


  image: {
    flex: 1,
  },

  profileImage: {
  	flex: 1,
  	height: undefined,
  	width: undefined,
  },

  userProfile: {
  	flex: 1,
  	flexDirection: 'row',
  	alignItems: 'stretch',
  	margin: 10,
  	borderColor: 'black',
  	backgroundColor: 'white',
  },

  loginButton: {
  	flex: 1,
  	alignItems: 'stretch',
  	margin: 10,
  	borderColor: 'white',
    borderWidth: 5,
  }

});

export default Splash;