import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
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

const categories = ["Alle", "Begivenheder", "Spørgsmål", "Nyheder", "Andet"];

type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const previewText =
    post.description.length > 120
      ? post.description.slice(0, 120)
      : post.description;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{post.title}</Text>
      <Text style={[styles.chipText, { marginBottom: 6 }]}>
        {post.category}
      </Text>
      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.cardText}>
          {expanded ? post.description : previewText}
          {!expanded && post.description.length > 120 && (
            <Text style={styles.readMoreText}> Læs mere</Text>
          )}
          {expanded && (
            <Text style={styles.readMoreText}> Vis mindre</Text>
          )}
        </Text>
      </Pressable>
    </View>
  );
}

const dummyPosts: Post[] = [
  {
    id: "1",
    title: "Velkomstfest på havnen",
    description:
      "Vi holder en stor velkomstfest nede ved havnen lørdag den 10. maj kl. 14. Alle er velkomne! Der vil være mad, musik og hygge for hele familien. Kom og mød dine naboer og nye beboere på øen.",
    category: "Begivenheder",
  },
  {
    id: "2",
    title: "Nogen der kender en god VVS'er?",
    description: "Har brug for hjælp til et vandrør der er gået i stykker. Tips modtages gerne!",
    category: "Spørgsmål",
  },
  {
    id: "3",
    title: "Ny sti åbnet ved skoven",
    description: "Kommunen har åbnet en ny natursti ved skoven mod nord. Perfekt til en gåtur.",
    category: "Nyheder",
  },
  {
    id: "4",
    title: "Fælles havedag",
    description: "Vi mødes søndag kl. 10 for at rydde op i fællesarealet ved indkørslen. Medbring handsker og godt humør.",
    category: "Begivenheder",
  },
];

export default function Fællesskab() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Begivenheder");
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const filteredPosts =
    selectedCategory === "Alle"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = () => {
    if (!title.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now().toString(),
        title,
        description,
        category: newPostCategory,
      },
      ...prev,
    ]);
    setTitle("");
    setDescription("");
    setNewPostCategory("Begivenheder");
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

        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={[styles.text, { marginTop: 40 }]}>
              Ingen opslag i denne kategori
            </Text>
          }
        />

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