import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import styles, { colors } from "../../styles/global";

interface User {
  name: string;
  email: string;
  password: string;
  isOnBogø: boolean;
}

export default function Profil() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Edit state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editIsOnBogø, setEditIsOnBogø] = useState("");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const stored = await AsyncStorage.getItem("currentUser");
        if (stored) setUser(JSON.parse(stored));
      };
      loadUser();
    }, [])
  );

  const openModal = () => {
    if (!user) return;
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword(user.password);
    setEditIsOnBogø(user.isOnBogø ? "true" : "false");
    setError("");
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    if (!editName.trim()) { setError("Navn skal udfyldes"); return; }
    if (!editEmail.trim() || !/\S+@\S+\.\S+/.test(editEmail)) { setError("Ugyldig email"); return; }
    if (editPassword.length < 6) { setError("Kodeord skal være mindst 6 tegn"); return; }

    const updated: User = {
      name: editName.trim(),
      email: editEmail.trim(),
      password: editPassword,
      isOnBogø: editIsOnBogø === "true",
    };

    // Update in users list too
    const existingUsers = await AsyncStorage.getItem("users");
    const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];
    const index = users.findIndex((u) => u.email === user!.email);
    if (index !== -1) users[index] = updated;
    await AsyncStorage.setItem("users", JSON.stringify(users));
    await AsyncStorage.setItem("currentUser", JSON.stringify(updated));

    setUser(updated);
    setIsModalVisible(false);
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
          <ProfileRow
            label="Kodeord"
            value={showPassword ? user.password : "••••••••"}
            onToggle={() => setShowPassword((v) => !v)}
            toggleIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          />
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
              placeholder="Kodeord"
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
            >
              <Text style={styles.text}>Gem ændringer</Text>
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