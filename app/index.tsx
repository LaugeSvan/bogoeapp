import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/global";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={styles.text}>Velkommen til appen.</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Opret</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
