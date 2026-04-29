import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioOption } from "../../components";
import styles, { colors } from "../../styles/global";

const categories = ["Alle", "Sælger", "Søges", "Gives væk"];

export default function Børsen() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for nyt opslag
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Sælger");

  const handleCreatePost = () => {
    console.log("Nyt opslag:", { title, description, newPostCategory });
    // Nulstil felter og luk modal
    setTitle("");
    setDescription("");
    setNewPostCategory("Sælger");
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>
            Her kommer opslag for: {selectedCategory}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>

            <Text
              style={[
                styles.title,
                { fontSize: 24, marginBottom: 20, textAlign: "center" },
              ]}
            >
              Opret nyt opslag
            </Text>

            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Titel"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[
                styles.input,
                { width: "100%", height: 100, textAlignVertical: "top" },
              ]}
              placeholder="Beskrivelse"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={[styles.text, { fontSize: 16, marginBottom: 10 }]}>
              Vælg kategori:
            </Text>

            <View
              style={{ width: "100%", marginBottom: 20, alignItems: "center" }}
            >
              {categories
                .filter((cat) => cat !== "Alle")
                .map((cat) => (
                  <RadioOption
                    key={cat}
                    label={cat}
                    value={cat}
                    selected={newPostCategory === cat}
                    onSelect={setNewPostCategory}
                  />
                ))}
            </View>

            <TouchableOpacity
              style={[
                styles.welcomeBtn,
                { width: "100%", alignItems: "center" },
              ]}
              onPress={handleCreatePost}
            >
              <Text style={styles.text}>Opret opslag</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
