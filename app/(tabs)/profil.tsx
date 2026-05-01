import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioOption } from "../../components";
import { supabase } from "../../lib/supabase";
import { lightColors, darkColors, createStyles } from "../../styles";

interface UserData {
  email: string;
  name: string;
  isOnBogø: boolean;
}

export default function Profil() {
  const [isDark] = useState(false);
  const colors = isDark ? darkColors : lightColors;
  const styles = createStyles(colors);

  const [user, setUser] = useState<UserData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editIsOnBogø, setEditIsOnBogø] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser({
            email: authUser.email ?? "",
            name: authUser.user_metadata?.name ?? "",
            isOnBogø: authUser.user_metadata?.isOnBogø ?? false,
          });
        }
      };
      loadUser();
    }, [])
  );

  const openModal = () => {
    if (!user) return;
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword("");
    setEditIsOnBogø(user.isOnBogø ? "true" : "false");
    setError("");
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    if (!editName.trim()) return setError("Navn skal udfyldes");
    if (!editEmail.trim() || !/\S+@\S+\.\S+/.test(editEmail)) return setError("Ugyldig email");
    if (editPassword && editPassword.length < 6) return setError("Kodeord skal være mindst 6 tegn");

    setLoading(true);

    try {
      const updates: any = {
        data: {
          name: editName.trim(),
          isOnBogø: editIsOnBogø === "true",
        },
      };

      if (editEmail.trim() !== user!.email) updates.email = editEmail.trim();
      if (editPassword) updates.password = editPassword;

      const { error: updateError } = await supabase.auth.updateUser(updates);
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setUser({
        email: editEmail.trim(),
        name: editName.trim(),
        isOnBogø: editIsOnBogø === "true",
      });

      setIsModalVisible(false);
    } catch {
      setError("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>

        <View style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}>
          <Ionicons name="person" size={48} color="white" />
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            <Text style={styles.cardTitle}>{user.name}</Text>
            <TouchableOpacity onPress={openModal}>
              <Ionicons name="pencil-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ProfileRow label="Email" value={user.email} styles={styles} colors={colors} />
          <ProfileRow label="Kodeord" value="••••••••" styles={styles} colors={colors} />
          <ProfileRow label="Bor på Bogø" value={user.isOnBogø ? "Ja" : "Nej"} styles={styles} colors={colors} />
        </View>

      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setIsModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>

            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.title}>Rediger profil</Text>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <TextInput style={styles.input} value={editName} onChangeText={setEditName} />
            <TextInput style={styles.input} value={editEmail} onChangeText={setEditEmail} />
            <TextInput style={styles.input} value={editPassword} onChangeText={setEditPassword} secureTextEntry />

            <TouchableOpacity
              style={styles.welcomeBtn}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.text}>{loading ? "Gemmer..." : "Gem"}</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value, styles, colors }: any) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
      <Text style={[styles.cardText, { color: colors.text }]}>{label}</Text>
      <Text style={styles.cardText}>{value}</Text>
    </View>
  );
}