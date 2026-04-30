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
  activeItemBg: "#e8f5e9",
  activeItem: "#2e7d32",
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
    backgroundColor: "rgba(0,0,0,0.5)",
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

  filterContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  chip: {
    backgroundColor: colors.input,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },

  chipActive: {
    backgroundColor: colors.primary,
  },

  chipText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: colors.text,
  },

  chipTextActive: {
    fontFamily: "Nunito_700Bold",
  },

  modalContent: {
    backgroundColor: colors.background,
    width: "85%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
    // Skygge til iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Skygge til Android
    elevation: 5,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },

  tabBarItem: {
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 4,
    paddingBottom: 2,
  },
});
