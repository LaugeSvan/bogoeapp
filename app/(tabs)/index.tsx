import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { lightColors, darkColors, createStyles } from "../../styles";
import { useState } from "react";

const HomeScreen = () => {
  const router = useRouter();
  const [isDark] = useState(false);

  const colors = isDark ? darkColors : lightColors;
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hjem</Text>
    </View>
  );
};

export default HomeScreen;