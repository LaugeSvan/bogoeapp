import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioOption } from "../components";
import styles from "../styles/global";

const Screen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opret dig på vores fælleskab!</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Navn" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Kodeord" />
        <TextInput style={styles.input} placeholder="Gentag kodeord" />
        <Text style={styles.alreadyText}>Er du på Bogø?</Text>
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
      <TouchableOpacity style={styles.welcomeBtn}>
        <Text style={styles.text}>Opret</Text>
      </TouchableOpacity>
      <Text style={styles.alreadyText}>
        Allerede bruger?{" "}
        <Text style={styles.link} onPress={() => router.push("/login")}>
          Log ind
        </Text>
      </Text>
    </View>
  );
};

export default Screen;
