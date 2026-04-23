import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    const checkLogin = async () => {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (currentUser) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    };
    checkLogin();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
