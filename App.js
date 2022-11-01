import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";





const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [tempCode, setTempCode] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);

   if (isFirstLaunch){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(isLoggedIn){
    return <Navigation/>
  }else{
    return(
      <View>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          placeholderTextColor="#4251f5"
          placeholder="Cell Phone">
        </TextInput>
        <Button
          title="Send"
          style={styles.button}
          onPress={async()=>{
            console.log(phoneNumber + "Button was pressed")

            await fetch(
              "https://dev.stedi.me/twofactorlogin/" + phoneNumber,
              {

                method: "POST",
                headers:{
                  "content-type" : "applcation/text"
                }
              }
            )

          }}
        />
        <TextInput
          value={tempCode}
          onChangeText={setTempCode}
          style={styles.input2}
          placeholderTextColor="#4251f5"
          placeholder="Enter Code">
        </TextInput>
        <Button
          title="Verify"
          style={styles.button}
          onPress={async()=>{
            console.log(tempCode + "Button was pressed")

            const logInResponse=await fetch(
              "https://dev.stedi.me/twofactorlogin",
              {
                method: "POST",
                headers:{
                  "content-type" : "application/text"
                },
                body:JSON.stringify({
                  phoneNumber,
                  oneTimePassword:tempCode
                })
              }
            )

            console.log(logInResponse.status)
            //const loginToken = await logInResponse.text();
            //console.log("login token", loginToken)

            if (logInResponse.status==200){
              const sessionToken = await logInResponse.text();
              await AsyncStorage.setItem("sessionToken", sessionToken
              )
              console.log("Session Token", sessionToken);
              setIsLoggedIn(true);
            } else{
              console.log("Token response Status", logInResponse.status)
              Alert.alert("Warning", "An invalid code was entered")
            }
          }}
        />
      </View>
    )
  }
}
 export default App;

  const styles = StyleSheet.create({
    container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center'
  },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginTop: 250,
  },
    margin:{
      marginTop:100
  },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
  },
  input2: {
    height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginTop: 50,
  }

})

