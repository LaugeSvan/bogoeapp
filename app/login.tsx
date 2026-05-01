import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import { lightColors, createStyles } from "../styles";

const colors = lightColors;
const styles = createStyles(colors);

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Udfyld email og kodeord");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError("Forkert email eller kodeord");
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
        <Text style={styles.title}>Login</Text>

        <Text style={[styles.text, { fontSize: 16, marginBottom: 20 }]}>
          Log ind på fællesskabet
        </Text>

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

          <TouchableOpacity
            style={styles.welcomeBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.text}>
              {loading ? "Logger ind..." : "Log ind"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          Har du ikke en bruger?{" "}
          <Text style={styles.link} onPress={() => router.push("/register")}>
            Opret
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;