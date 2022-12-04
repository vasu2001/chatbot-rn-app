import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CustomCamera = ({ onClose, onCapture }) => {
   const [permission, requestPermission] = Camera.useCameraPermissions();
   const [cameraReady, setCameraReady] = useState(false);
   const cameraRef = useRef(null);

   if (!permission) {
      // Camera permissions are still loading
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
         <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>
               We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View>
      );
   }

   const takePhoto = async () => {
      if (cameraRef.current && cameraReady) {
         const data = await cameraRef.current.takePictureAsync();
         onCapture(data);
      } else {
         console.log("camera not ready");
      }
   };

   const onCameraReady = () => {
      setCameraReady(true);
   };

   const _onClose = () => {
      onClose?.();
   };

   return (
      <View style={styles.container}>
         <Camera
            style={styles.camera}
            type={CameraType.back}
            onCameraReady={onCameraReady}
            ref={cameraRef}
         >
            <View style={styles.closeContainer}>
               <TouchableOpacity style={styles.button} onPress={_onClose}>
                  <Text style={styles.text}>X</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <Text style={styles.text}>Capture</Text>
               </TouchableOpacity>
            </View>
         </Camera>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      marginVertical: 50,
      marginHorizontal: 20,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
   },
   camera: {
      flex: 1,
   },
   closeContainer: {
      position: "absolute",
      top: 15,
      right: 15,
   },
   buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 40,
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

export default CustomCamera;
