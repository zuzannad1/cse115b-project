import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Image,
  TouchableOpacity
} from 'react-native';
// Gotten from bootdey.com/react-native-snippet/23/Profile-ui-example



class MyProfileScreen extends Component {
  render() {


    return (
      <View style={styles.container}>
        {/* Check out styles for info on header, footer, etc. */}
        <View style={styles.header}></View>
          {/* Images go here */}
          <Image style={styles.avatar} source={require('../assets/profile.png')} />

        <View style={styles.body}>

          <View style={styles.bodyContent}>

              <Text style={styles.name}>First, Last</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Edit Information</Text> 
              </TouchableOpacity>

              <Text style={styles.heading}>Personal Information</Text>
              <Text style={styles.description}>NAME</Text>
              <Text style={styles.description}>AGE</Text>
              <Text style={styles.description}>WEIGHT</Text>
              <Text style={styles.description}>HEIGHT</Text>
              <View style={styles.buttonSpace}/>
              <Text style={styles.heading}>Health</Text>
              <Text style={styles.description}>TYPE OF DIABETES</Text>
              <Text style={styles.description}>MEDICINE TYPE</Text>
              <Text style={styles.description}>LOCATION OF PHARMACY</Text>
            

            <View style= {styles.footer}>

            

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Log Out</Text> 
            </TouchableOpacity>
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
    backgroundColor: "#00BFFF",
    height:200,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#2E3438',
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },

  body:{
    marginTop:40,
    alignSelf:'center',
  },

  buttonSpace: {
    marginTop: 30,
    marginBottom: 10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },

  nameContainer: {
    flex: 1,
  },
  personalContent:{
    flex: 1,
    backgroundColor: '#800020',
  },


  name:{
    fontSize:28,
    fontWeight: "600",
    paddingBottom: 20,
  },

  heading:{
    fontSize:20,
    fontWeight: "600",
  },


  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },

  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: '#00BFFF',
  },

  leftAdjust: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },


});

export default MyProfileScreen;