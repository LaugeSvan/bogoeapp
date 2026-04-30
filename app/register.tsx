import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioOption } from "../components";
import { supabase } from "../lib/supabase";
import styles from "../styles/global";

const Screen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            isOnBogø: selectedOption === "true",
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.replace("/(tabs)");
    } catch {
      setError("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.text}>Opret dig på vores fællesskab!</Text>
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
        <TouchableOpacity
          style={styles.welcomeBtn}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.text}>{loading ? "Opretter..." : "Opret"}</Text>
        </TouchableOpacity>
        <Text style={styles.alreadyText}>
          Allerede bruger?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Log ind
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Screen;
