import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../../styles/global";

interface User {
  name: string;
  email: string;
  password: string;
  isOnBogø: boolean;
}

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      } else {
        router.replace("/");
      }
    };
    loadUser();
  }, [router]);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hjem</Text>
    </View>
  );
};

export default HomeScreen;
