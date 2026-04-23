import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/global";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login på vores fælleskab!</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Kodeord" />
        <TouchableOpacity style={styles.welcomeBtn}>
          <Text style={styles.text}>Log ind</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
