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

const categories = ["Alle", "Sælger", "Søges", "Gives væk"];

type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type ListingCardProps = {
  listing: Listing;
};

function ListingCard({ listing }: ListingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const previewText =
    listing.description.length > 120
      ? listing.description.slice(0, 120)
      : listing.description;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{listing.title}</Text>
      <Text style={[styles.chipText, { marginBottom: 6 }]}>
        {listing.category}
      </Text>
      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.cardText}>
          {expanded ? listing.description : previewText}
          {!expanded && listing.description.length > 120 && (
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

const dummyListings: Listing[] = [
  {
    id: "1",
    title: "Gammel cykel sælges",
    description:
      "Sælger en gammel damecykel i god stand. 7 gear, nylige bremser. Afhentes på Bogø. Pris: 300 kr.",
    category: "Sælger",
  },
  {
    id: "2",
    title: "Søger trailer til lån",
    description: "Har nogen en trailer jeg må låne en weekend i maj? Skal flytte noget havemøbler.",
    category: "Søges",
  },
  {
    id: "3",
    title: "Gives væk: blomsterpotter",
    description: "Har en masse tomme blomsterpotter i forskellige størrelser som gives væk. Kom og hent!",
    category: "Gives væk",
  },
  {
    id: "4",
    title: "Plæneklipper sælges",
    description:
      "Benzindrevet plæneklipper sælges. Virker fint, men vi har fået en robotklipper. Årgang 2018. Pris: 800 kr. eller kom med et bud.",
    category: "Sælger",
  },
  {
    id: "5",
    title: "Søger babysitter",
    description: "Vi søger en pålidelig babysitter til vores to børn (4 og 7 år) et par fredage om måneden.",
    category: "Søges",
  },
];

export default function Børsen() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Sælger");
  const [listings, setListings] = useState<Listing[]>(dummyListings);

  const filteredListings =
    selectedCategory === "Alle"
      ? listings
      : listings.filter((l) => l.category === selectedCategory);

  const handleCreatePost = () => {
    if (!title.trim()) return;
    setListings((prev) => [
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

        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListingCard listing={item} />}
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