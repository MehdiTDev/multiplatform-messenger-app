import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./Screens/StartScreen"
import LogInSignUpScreen from "./Screens/LogInSignUpScreen"



export default function App() {


  const myStack = createNativeStackNavigator();

  useEffect(() => {
    console.log('App has started!');
  }, []);

  return (





    <NavigationContainer>
      <myStack.Navigator initialRouteName="startScreen" screenOptions={{ headerShown: false }}>

        <myStack.Screen name="startScreen" component={StartScreen} />
        <myStack.Screen name="LogIn" component={LogInSignUpScreen} />


      </myStack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
