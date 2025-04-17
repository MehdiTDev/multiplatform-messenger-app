import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from 'react';


export default function LogInSignUpScreen({ navigation }) {


    useEffect(() => {
        console.log('LogIn hase been reached!');
    }, []);


    return (
        <Text> THis is the Log in Screen which is navigated to from the start screen</Text>
    );
}

