import { StyleSheet } from "react-native";

export const colors = {
  primary: "#7dc75a",
  background: "#c1e1c1",
  header: "#b5d5b5",
};

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 15,
    margin: 5,
    minWidth: 250,
    alignItems: "center",
  },
});
