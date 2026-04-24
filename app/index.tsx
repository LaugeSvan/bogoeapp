import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/global";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bogø</Text>
      <Text style={[styles.text, styles.tagline]}>Et lokalt fællesskab</Text>
      <TouchableOpacity
        style={styles.welcomeBtn}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.text}>Opret</Text>
      </TouchableOpacity>
      <Text style={styles.alreadyText}>
        Allerede bruger?{" "}
        <Text style={styles.link} onPress={() => router.push("/login")}>
          Log ind
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
