import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import styles from "../styles/global";

const Screen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opret dig på vores fælleskab!</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Navn" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Kodeord" />
        <TextInput style={styles.input} placeholder="Gentag kodeord" />
        <RadioButton.Group
          onValueChange={setSelectedOption}
          value={selectedOption}
        >
          <RadioButton.Item label="Option 1" value="option1" />
          <RadioButton.Item label="Option 2" value="option2" />
          <RadioButton.Item label="Option 3" value="option3" />
        </RadioButton.Group>
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
