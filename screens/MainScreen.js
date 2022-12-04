import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";

export const UserContext = createContext();
const asyncStorageKey = "@save_user";

const MainScreen = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      AsyncStorage.getItem(asyncStorageKey).then((userString) => {
         if (userString) {
            setUser(JSON.parse(userString));
         }
      });
   }, []);

   const saveUser = async (user) => {
      await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(user));
      setUser(user);
   };

   return (
      <UserContext.Provider value={{ user, setUser: saveUser }}>
         {user ? <ChatScreen /> : <LoginScreen />}
      </UserContext.Provider>
   );
};

export default MainScreen;
