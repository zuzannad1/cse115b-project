import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image, TouchableOpacity, ScrollView } from 'react-native';
import Firebase from '../config/Firebase';
// Gotten from bootdey.com/react-native-snippet/23/Profile-ui-example

class UserInfo extends Component {
  render() {
    return (
    	<View style = {styles.foundation}>
    		<View style = {styles.header}>
    			<Image
		          style={styles.avatar}
		          source={require('../assets/profile.png')}
		        />
    		</View>
    		
	    	<View style = {styles.infoList}>
	    		<ScrollView>
	    			<Text style={styles.large}>Personal</Text>
	    			<Text>First, Last</Text>
	    			<Text>Age Weight Height</Text>
	    			<Text>City, State</Text>

	    			<Text style={styles.large}>Health</Text>
	    			<Text>Type of Diabetes</Text>
	    			<Text>Medicine Type</Text>

	    			<Text style={styles.large}>Data on Account</Text>
	    			<Text>GLV readings</Text>
	    			<Text>Notes</Text>
				</ScrollView>
	    	</View>
    		
    		<View style = {styles.footer}>
    			<View style= {styles.button}>
    				<TouchableOpacity onPress={() => this.props.navigation.navigate('Splash')}>
								  <Text style={styles.large}>back</Text>
                	</TouchableOpacity>
    			</View>
    			<View style= {styles.button}>
    				<TouchableOpacity onPress={() => this.props.navigation.navigate('Chatbot')}>
								  <Text style={styles.large}>Continue</Text>
                	</TouchableOpacity>
    			</View>
    		</View>
    	</View>
    );
  }
}

// -------------------------- Style sheets --------------------------
const styles = StyleSheet.create({
foundation: {
	flex: 1,
	backgroundColor: '#fff',
  },
header: {
	flex: 1,
	backgroundColor: '#0085FF',
	alignItems: 'center',
    justifyContent: 'center',
},
infoList: {
	flex: 3,
	backgroundColor: '#fff',
},
footer: {
	flex: 1,
	backgroundColor: '#0085FF',
	flexDirection: 'row',
},
avatar: {
	width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#2E3438',
    alignItems: 'center',
    justifyContent:'center',
},
large: {
	fontSize: 40,
},
button: {
	margin: 20,
},
});

export default UserInfo;
