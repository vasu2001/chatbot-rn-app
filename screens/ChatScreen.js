import React, {
   useContext,
   useCallback,
   useState,
   useRef,
   useEffect,
} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import ChartService from "../service/ChatService";

import CustomCamera from "../components.js/CustomCamera";
import { UserContext } from "./MainScreen";
import ChatService from "../service/ChatService";

const ChatScreen = () => {
   const { user, setUser } = useContext(UserContext);
   const [messages, setMessages] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const caseType = useRef(-1);
   const stage = useRef(0);

   useEffect(() => {
      ChartService.chat(caseType, stage).then(appendMessages);
   }, []);

   const onLogout = () => {
      setUser(null);
   };

   const appendMessages = useCallback((messages = []) => {
      setMessages((previousMessages) =>
         GiftedChat.append(previousMessages, messages),
      );
   }, []);

   const onSend = (messages) => {
      appendMessages(messages);
      ChatService.chat(caseType, stage, messages).then(appendMessages);
   };

   const openCamera = () => {
      setModalVisible(true);
   };

   const closeCamera = () => {
      setModalVisible(false);
   };

   const sendImageMessage = (image) => {
      if (!image?.uri) return;
      closeCamera();

      //  TODO: upload the file and append the message
      onSend({
         _id: messages.length + 1,
         image: image.uri,
         createdAt: new Date(),
         user,
      });
   };

   const renderActions = () => {
      return (
         <View style={styles.actionRow}>
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
            onSend={onSend}
            renderActions={renderActions}
            user={user}
         />

         <Modal visible={modalVisible} transparent>
            <CustomCamera onClose={closeCamera} onCapture={sendImageMessage} />
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

   actionRow: {
      flexDirection: "row",
      paddingBottom: 12,
   },

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
