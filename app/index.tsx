import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { lightColors, createStyles } from "../styles";

const colors = lightColors;
const styles = createStyles(colors);

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Bogø</Text>

        <Text style={[styles.text, { fontSize: 18, marginBottom: 40 }]}>
          Et lokalt fællesskab
        </Text>

        <TouchableOpacity
          style={styles.welcomeBtn}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.text}>Opret</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Allerede bruger?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Log ind
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;