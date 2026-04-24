import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, SafeAreaView, View } from "react-native";
import { RadioOption } from "../components";
import styles from "../styles/global";

interface User {
  name: string;
  email: string;
  password: string;
  isOnBogø: boolean;
}

const Screen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError("Navn skal udfyldes");
      return false;
    }
    if (!email.trim()) {
      setError("Email skal udfyldes");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Ugyldig email adresse");
      return false;
    }
    if (password.length < 6) {
      setError("Kodeord skal være mindst 6 tegn");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Kodeordene matcher ikke");
      return false;
    }
    if (!selectedOption) {
      setError("Vælg om du bor på Bogø");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError("");
    if (!validateForm()) return;

    try {
      const existingUsers = await AsyncStorage.getItem("users");
      const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

      if (users.some((u) => u.email === email)) {
        setError("Email er allerede registreret");
        return;
      }

      const newUser: User = {
        name: name.trim(),
        email: email.trim(),
        password,
        isOnBogø: selectedOption === "true",
      };

      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
      router.push("/(tabs)");
    } catch {
      setError("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Opret dig på vores fælleskab!</Text>
      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Navn"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Gentag kodeord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Text style={styles.alreadyText}>Bor du på Bogø?</Text>
        <RadioOption
          label="Ja"
          value="true"
          selected={selectedOption === "true"}
          onSelect={setSelectedOption}
        />
        <RadioOption
          label="Nej"
          value="false"
          selected={selectedOption === "false"}
          onSelect={setSelectedOption}
        />
      </View>
      <TouchableOpacity style={styles.welcomeBtn} onPress={handleRegister}>
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

export default Screen;
