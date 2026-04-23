import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface Props {
  onNotifications: () => void;
  onLogout: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

export const HeaderIcons = ({
  onNotifications,
  onLogout,
  onThemeToggle,
  isDark,
}: Props) => {
  return (
    <View style={{ flexDirection: "row", gap: 16, marginRight: 12 }}>
      <TouchableOpacity onPress={onNotifications}>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onThemeToggle}>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
