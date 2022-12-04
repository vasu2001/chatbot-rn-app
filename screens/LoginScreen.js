import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

import { UserContext } from "./MainScreen";

const sampleUser = {
   name: "Test",
   email: "test@test.com",
   _id: 1,
   avatar: "https://placeimg.com/140/140/any",
};

const LoginScreen = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const { setUser } = useContext(UserContext);

   const onLogin = async () => {
      setLoading(true);
      try {
         //api call to login
         setUser(sampleUser);
      } catch (err) {}
      setLoading(false);
   };

   return (
      <View style={styles.main}>
         <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder="Username"
         />
         <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
         />
         <Button title="Login" onPress={onLogin} disabled={loading} />
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      alignSelf: "stretch",
      padding: 50,
   },
   input: {
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
   },
});

export default LoginScreen;
