import { SafeAreaView, Text, View } from "react-native";
import styles from "../styles/global";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.text}>coming up!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
