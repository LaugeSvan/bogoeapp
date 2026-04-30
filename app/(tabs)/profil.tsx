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
import styles, { colors } from "../../styles/global";

interface UserData {
  email: string;
  name: string;
  isOnBogø: boolean;
}

export default function Profil() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Edit state
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
    if (!editName.trim()) { setError("Navn skal udfyldes"); return; }
    if (!editEmail.trim() || !/\S+@\S+\.\S+/.test(editEmail)) { setError("Ugyldig email"); return; }
    if (editPassword && editPassword.length < 6) { setError("Kodeord skal være mindst 6 tegn"); return; }

    setLoading(true);
    try {
      const updates: { email?: string; password?: string; data: object } = {
        data: {
          name: editName.trim(),
          isOnBogø: editIsOnBogø === "true",
        },
      };

      if (editEmail.trim() !== user!.email) updates.email = editEmail.trim();
      if (editPassword) updates.password = editPassword;

      const { error: updateError } = await supabase.auth.updateUser(updates);
      if (updateError) { setError(updateError.message); return; }

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

        {/* Avatar placeholder */}
        <View style={{
          width: 90, height: 90, borderRadius: 45,
          backgroundColor: colors.primary,
          justifyContent: "center", alignItems: "center",
          marginBottom: 16,
        }}>
          <Ionicons name="person" size={48} color="white" />
        </View>

        {/* Profile card */}
        <View style={[styles.card, { width: "90%" }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={styles.cardTitle}>{user.name}</Text>
            <TouchableOpacity onPress={openModal}>
              <Ionicons name="pencil-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ProfileRow label="Email" value={user.email} />
          <ProfileRow label="Kodeord" value="••••••••" />
          <ProfileRow label="Bor på Bogø" value={user.isOnBogø ? "Ja" : "Nej"} />
        </View>

        {/* Settings placeholder */}
        <View style={[styles.card, { width: "90%", marginTop: 0 }]}>
          <Text style={styles.cardTitle}>Indstillinger</Text>
          <Text style={[styles.cardText, { color: "#888" }]}>Kommer snart...</Text>
        </View>

      </View>

      {/* Edit modal */}
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

            <Text style={[styles.title, { fontSize: 24, marginBottom: 20, textAlign: "center" }]}>
              Rediger profil
            </Text>

            {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Navn"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Nyt kodeord (valgfrit)"
              value={editPassword}
              onChangeText={setEditPassword}
              secureTextEntry
            />

            <Text style={[styles.text, { fontSize: 16, marginBottom: 10 }]}>Bor du på Bogø?</Text>
            <View style={{ width: "100%", marginBottom: 20, alignItems: "center" }}>
              <RadioOption label="Ja" value="true" selected={editIsOnBogø === "true"} onSelect={setEditIsOnBogø} />
              <RadioOption label="Nej" value="false" selected={editIsOnBogø === "false"} onSelect={setEditIsOnBogø} />
            </View>

            <TouchableOpacity
              style={[styles.welcomeBtn, { width: "100%", alignItems: "center" }]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.text}>{loading ? "Gemmer..." : "Gem ændringer"}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value, onToggle, toggleIcon }: {
  label: string;
  value: string;
  onToggle?: () => void;
  toggleIcon?: string;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <Text style={[styles.cardText, { color: "#555", flex: 1 }]}>{label}</Text>
      <Text style={[styles.cardText, { flex: 2 }]}>{value}</Text>
      {onToggle && toggleIcon && (
        <TouchableOpacity onPress={onToggle}>
          <Ionicons name={toggleIcon as any} size={20} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}