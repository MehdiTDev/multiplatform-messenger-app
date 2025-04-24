
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Text, VStack, HStack, Pressable, useToast } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function LogInSignUpScreen({ navigation }) {

    const toast = useToast();


    const [selectedTab, setSelectedTab] = useState('Login');


    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');
    const [showPasswordLogIn, setShowPasswordLogIn] = useState(false);


    const [nameSignUp, setNameSignUp] = useState('')
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState('');
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Let to do is the pic thing!!!!

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };




    const signUP = async () => {

        // setLoading(true)

        //  console.log("In the signUp func")

        if (!nameSignUp || !emailSignUp || !passwordSignUp || !confirmPasswordSignUp) {

            console.log("A user Failiure test toast shall be shown")

            toast.show({
                title: "failiure",
                description: "Please fill all the required fields",
                status: "failed",
                duration: 10000,
                isClosable: true,
                placement: "bottom",          // "top", "bottom", "top-right", "bottom-left", etc.
            });


            // setLoading(false)
            return;

        }

        if (passwordSignUp != confirmPasswordSignUp) {

            console.log("Passwords do not match")
            toast.show({
                title: "Error",
                description: "Passwords do not match",
                status: "failed",
                duration: 4000,
                isClosable: true,
                placement: "bottom",          // "top", "bottom", "top-right", "bottom-left", etc.
            });

            return;
        }

        console.log("We passed the ifs")

        try {
            const confiq = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const { data } = await axios.post("/api/user", { nameSignUp, emailSignUp, emailSignUp }, confiq);

            console.log("register was succesful");

            localStorage.setItem('userInfo', JSON.stringify(data));

            // if registration was successfull redirekt the user to the chat screen. 

        } catch (error) {

            console.log("Error when registering new user")


        }

    }


    const logIn = async () => {

        if (!emailLogIn || !passwordLogIn) {


            console.log("fill all fields")

            toast.show({
                title: "failiure",
                description: "Please fill all the required fields",
                status: "failed",
                duration: 10000,
                isClosable: true,
                placement: "bottom",
            });

            return;

        }

        try {
            const confiq = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const { data } = await axios.post("/api/user/login", { emailLogIn, passwordLogIn }, confiq);

            console.log("logIn  was succesful");

            localStorage.setItem('userInfo', JSON.stringify(data));

            // if log in  was successfull redirekt the user to the chat screen. 

        } catch (error) {

            console.log("Error when loggin in the user")


        }



    }


















    const renderLoginForm = () => (
        <VStack space="4">
            <Box>
                <Text style={styles.label}>
                    Email Address <Text color="red.500">*</Text>
                </Text>
                <Input placeholder="Enter Your Email Address"
                    value={emailLogIn}
                    onChangeText={setEmailLogIn}


                />
            </Box>

            <Box>
                <Text style={styles.label}>
                    Password <Text color="red.500">*</Text>
                </Text>
                <Input
                    placeholder="Enter password"
                    value={passwordLogIn}
                    onChangeText={setPasswordLogIn}
                    type={showPasswordLogIn ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowPasswordLogIn(!showPasswordLogIn)}>
                            <Text px="3" color="blue.500">
                                {showPasswordLogIn ? 'Hide' : 'Show'}
                            </Text>
                        </Pressable>
                    }
                />
            </Box>

            <Button style={styles.loginButton} colorScheme="blue" onPress={logIn}>
                Login
            </Button>
            <Button style={styles.guestButton} colorScheme="red">
                Get Guest User Credentials
            </Button>
        </VStack>
    );

    const renderSignUpForm = () => (
        <VStack space="4">
            <Box>
                <Text style={styles.label}>
                    Name <Text color="red.500">*</Text>
                </Text>
                <Input placeholder="Enter Your Name"
                    value={nameSignUp}
                    onChangeText={setNameSignUp}

                />
            </Box>

            <Box>
                <Text style={styles.label}>
                    Email Address <Text color="red.500">*</Text>
                </Text>
                <Input placeholder="Enter Your Email Address"
                    value={emailSignUp}
                    onChangeText={setEmailSignUp}
                />
            </Box>

            <Box>
                <Text style={styles.label}>
                    Password <Text color="red.500">*</Text>
                </Text>
                <Input
                    placeholder="Enter Password"
                    value={passwordSignUp}
                    onChangeText={setPasswordSignUp}
                    type={showPasswordSignUp ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowPasswordSignUp(!showPasswordSignUp)}>
                            <Text px="3" color="blue.500">
                                {showPasswordSignUp ? 'Hide' : 'Show'}
                            </Text>
                        </Pressable>
                    }
                />
            </Box>

            <Box>
                <Text style={styles.label}>
                    Confirm Password <Text color="red.500">*</Text>
                </Text>
                <Input
                    placeholder="Confirm password"
                    value={confirmPasswordSignUp}
                    onChangeText={setConfirmPasswordSignUp}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Text px="3" color="blue.500">
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </Text>
                        </Pressable>
                    }
                />
            </Box>

            <Box>
                <Text style={styles.label}>Upload your Picture</Text>
                <Button variant="outline" style={styles.uploadButton} onPress={pickImage}>
                    Choose File
                </Button>

                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, marginTop: 10, borderRadius: 50 }}
                    />
                )}

            </Box>

            <Button style={styles.signUpButton} colorScheme="blue" onPress={signUP}>
                Sign Up
            </Button>
        </VStack>
    );

    return (
        <NativeBaseProvider>
            <Box style={styles.container}>
                <Box style={styles.card}>
                    {/* Tabs */}
                    <HStack style={styles.tabContainer}>
                        <Pressable onPress={() => setSelectedTab('Login')}>
                            <Box
                                style={[
                                    styles.tab,
                                    selectedTab === 'Login' && styles.activeTab,
                                ]}
                            >
                                <Text style={styles.tabText}>Login</Text>
                            </Box>
                        </Pressable>

                        <Pressable onPress={() => setSelectedTab('SignUp')}>
                            <Box
                                style={[
                                    styles.tab,
                                    selectedTab === 'SignUp' && styles.activeTab,
                                ]}
                            >
                                <Text style={styles.tabText}>Sign Up</Text>
                            </Box>
                        </Pressable>
                    </HStack>

                    {/* Form Section */}
                    {selectedTab === 'Login' ? renderLoginForm() : renderSignUpForm()}
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    tab: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 999,
    },
    activeTab: {
        backgroundColor: '#dbeafe',
    },
    tabText: {
        fontWeight: 'bold',
        color: 'black',
    },
    label: {
        marginBottom: 4,
    },
    uploadButton: {
        marginTop: 4,
    },
    loginButton: {
        marginTop: 8,
    },
    guestButton: {
        marginTop: 8,
    },
    signUpButton: {
        marginTop: 8,
    },
});

