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
import { createStyles, lightColors } from "../styles";

const styles = createStyles(lightColors);

const Screen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!name || !email || password !== confirmPassword) {
      setError("Udfyld alle felter korrekt");
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          isOnBogø: selectedOption === "true",
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.text}>Opret bruger</Text>

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <TextInput style={styles.input} placeholder="Navn" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Kodeord" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Gentag kodeord" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        <RadioOption label="Ja" value="true" selected={selectedOption === "true"} onSelect={setSelectedOption} />
        <RadioOption label="Nej" value="false" selected={selectedOption === "false"} onSelect={setSelectedOption} />

        <TouchableOpacity style={styles.welcomeBtn} onPress={handleRegister}>
          <Text style={styles.text}>{loading ? "Opretter..." : "Opret"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen;