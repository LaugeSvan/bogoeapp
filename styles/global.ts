import { StyleSheet } from "react-native";

export const colors = {
  primary: "#7dc75a",
  background: "#c1e1c1",
  header: "#b5d5b5",
  link: "#2a335e",
  border: "#141414",
  text: "#141414",
  input: "#d8d8d8",
};

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    marginBottom: 5,
    fontSize: 64,
  },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
  },
  alreadyText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
  },
  link: {
    color: colors.link,
    textDecorationLine: "underline",
  },
  welcomeBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 15,
    margin: 5,
    marginBottom: 15,
    minWidth: 250,
    alignItems: "center",
  },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 36,
    marginVertical: 10,
    backgroundColor: colors.input,
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingVertical: 16,
    width: "70%",
  },
  tagline: {
    marginBottom: 50,
  },
});
