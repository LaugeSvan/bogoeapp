import { SafeAreaView, Text, View } from "react-native";
import styles from "../../styles/global";

export default function Profil() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.text}>Profil</Text>
      </View>
    </SafeAreaView>
  );
}
