import { SafeAreaView, Text, View } from "react-native";
import { lightColors, createStyles } from "../styles";

const colors = lightColors;
const styles = createStyles(colors);

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