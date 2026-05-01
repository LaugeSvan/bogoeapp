import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useTheme } from "../../styles";

const HomeScreen = () => {
  const router = useRouter();
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hjem</Text>
    </View>
  );
};

export default HomeScreen;