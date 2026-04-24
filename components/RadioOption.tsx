import { Text, TouchableOpacity, View } from "react-native";

export const RadioOption = ({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 6 }}
    onPress={() => onSelect(value)}
  >
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
      }}
    >
      {selected && (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#555",
          }}
        />
      )}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);
