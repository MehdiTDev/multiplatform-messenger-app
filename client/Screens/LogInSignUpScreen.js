
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Text, VStack, HStack, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';

export default function LogInSignUpScreen({ navigation }) {

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

            <Button style={styles.loginButton} colorScheme="blue">
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
                <Button variant="outline" style={styles.uploadButton}>
                    Choose file
                </Button>
            </Box>

            <Button style={styles.signUpButton} colorScheme="blue">
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

