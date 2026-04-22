import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import { colors } from "../styles/global";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        headerTitle: "Bogø App",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.header },
      }}
    />
  );
}
