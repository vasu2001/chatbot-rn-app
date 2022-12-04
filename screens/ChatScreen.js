import React, { useContext, useCallback, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import CustomCamera from "../components.js/CustomCamera";
import { UserContext } from "./MainScreen";

const ChatScreen = () => {
   const { user, setUser } = useContext(UserContext);
   const [messages, setMessages] = useState([
      {
         _id: 1,
         text: "Hello developer",
         createdAt: new Date(),
         user,
      },
   ]);
   const [modalVisible, setModalVisible] = useState(false);
   const userId = 1;

   const onLogout = () => {
      setUser(null);
   };

   const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) =>
         GiftedChat.append(previousMessages, messages),
      );
   }, []);

   const openCamera = () => {
      setModalVisible(true);
   };

   const sendImageMessage = (image) => {
      if (!image?.uri) return;
      setModalVisible(false);

      //       upload the file and append the message
      onSend({
         _id: messages.length + 1,
         image: image.uri,
         createdAt: new Date(),
         user,
      });
   };

   const renderActions = () => {
      return (
         <View style={{ flexDirection: "row", paddingBottom: 12 }}>
            <TouchableOpacity style={styles.select} onPress={openCamera}>
               <Text>Camera</Text>
            </TouchableOpacity>
         </View>
      );
   };

   return (
      <View style={styles.main}>
         <TouchableOpacity onPress={onLogout} style={styles.logout}>
            <Text>Logout</Text>
         </TouchableOpacity>

         <GiftedChat
            scrollToBottom
            messages={messages}
            onSend={(messages) => onSend(messages)}
            renderActions={renderActions}
            user={{
               _id: userId,
            }}
         />

         <Modal visible={modalVisible} transparent>
            <CustomCamera
               onClose={() => setModalVisible(false)}
               onCapture={sendImageMessage}
            />
         </Modal>
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      alignSelf: "stretch",
      paddingHorizontal: 10,
      paddingVertical: 50,
      flex: 1,
   },
   logout: {
      alignSelf: "flex-end",
      marginRight: 10,
   },
   select: {},

   camera: {
      marginVertical: 50,
      marginHorizontal: 20,
      borderRadius: 10,
      overflow: "hidden",
      flex: 1,
   },
   buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
   },
   button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
   },
   text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
   },
});

export default ChatScreen;
