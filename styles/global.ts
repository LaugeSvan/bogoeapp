import { StyleSheet } from "react-native";

export const colors = {
  primary: "#7dc75a",
  background: "#c1e1c1",
  header: "#b5d5b5",
  link: "#2a335e",
  border: "#141414",
  text: "#141414",
  symbol: "#141414",
  input: "#d8d8d8",
};

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

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

  card: {
    backgroundColor: colors.header,
    width: "90%",
    marginVertical: 12,
    padding: 12,
  },

  cardTitle: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
  },

  cardText: {
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
    lineHeight: 24,
  },

  cardImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 10,
    borderRadius: 10,
  },

  readMoreText: {
    color: colors.link,
    textDecorationLine: "underline",
    fontSize: 18,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  fullImage: {
    width: "95%",
    height: "80%",
  },

  title: {
    fontSize: 48,
    fontFamily: "Nunito_700Bold",
    marginBottom: 10,
  },

  tagline: {
    fontSize: 18,
    marginBottom: 40,
  },

  welcomeBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },

  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },

  input: {
    backgroundColor: colors.input,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
  },

  alreadyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },

  link: {
    color: colors.link,
    textDecorationLine: "underline",
  },
});
