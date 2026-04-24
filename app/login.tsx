import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/global";

interface User {
  name: string;
  email: string;
  password: string;
  isOnBogø: boolean;
}

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password) {
      setError("Udfyld email og kodeord");
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem("users");
      const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

      const user = users.find(
        (u) => u.email === email.trim() && u.password === password,
      );

      if (user) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/(tabs)");
      } else {
        setError("Forkert email eller kodeord");
      }
    } catch {
      setError("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Login på vores fælleskab!</Text>
      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Kodeord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.welcomeBtn} onPress={handleLogin}>
          <Text style={styles.text}>Log ind</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.alreadyText}>
        Har du ikke en bruger?{" "}
        <Text style={styles.link} onPress={() => router.push("/register")}>
          Opret
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
