import { SafeAreaView, Text, View } from "react-native";
import styles from "../../styles/global";

export default function Fællesskab() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.text}>Fællesskab</Text>
      </View>
    </SafeAreaView>
  );
}
