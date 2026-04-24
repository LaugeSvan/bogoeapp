import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import styles from "../../styles/global";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hjem</Text>
    </View>
  );
};

export default HomeScreen;
