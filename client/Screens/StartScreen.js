
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogInSignUpScreen } from "./LogInSignUpScreen"
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';

export default function StartScreen({ navigation }) {


    const [isLoggedIn, setIsLoggedIn] = useState(false); // you can replace this with actual logic

    useEffect(() => {



        // We will check if the user is loggIn or not here. 
        //setIsLoggedIn(true)


        if (!isLoggedIn) {
            navigation.navigate("LogIn")
        }

        console.log("This is the startScreen")
    }, []);

    return (
        <View >
            <Text>Checking login status...</Text>
        </View>
    );
}