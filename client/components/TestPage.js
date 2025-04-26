import React from 'react';
import { Text, useToast, NativeBaseProvider, Button, Center } from 'native-base';
import { StyleSheet } from 'react-native';

export default function TestPage({ navigation }) {
    const toast = useToast();

    const show = () => {

        console.log("this is a toast")
        toast.show({
            title: "failure",
            description: "Please fill all the required fields",
            status: "failed",
            duration: 10000,
            isClosable: true,
            placement: "top-left",
        });
    }
    return (

        <NativeBaseProvider>



            <Button style={{ width: 200, margin: 50 }} onPress={show}>
                Show Toast
            </Button>
        </NativeBaseProvider>

    )

};
