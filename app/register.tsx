import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/global";

const Screen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opret dig på vores fælleskab!</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Navn" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Kodeord" />
        <TextInput style={styles.input} placeholder="Gentag kodeord" />
        <TextInput style={styles.input} placeholder="placeholder" />
      </View>
      <TouchableOpacity style={styles.welcomeBtn}>
        <Text style={styles.text}>Opret</Text>
      </TouchableOpacity>
      <Text style={styles.alreadyText}>
        Allerede bruger? <Text style={styles.link}>Log ind</Text>
      </Text>
    </View>
  );
};

export default Screen;
