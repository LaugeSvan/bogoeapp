import { Stack } from "expo-router";
import { Text, View } from "react-native";
import styles from "../styles/global";

const Screen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.text}>This is text!</Text>
    </View>
  );
};

export default Screen;
