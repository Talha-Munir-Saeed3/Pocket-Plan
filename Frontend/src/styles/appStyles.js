import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4FF"
  },
  signInScroll: {
    flexGrow: 1,
    backgroundColor: "#EDEEFA"
  },
  signInHero: {
    backgroundColor: "#5E5CE6",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 104,
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  },
  signInHeroGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: 999,
    top: -52,
    right: -38
  },
  signInHeroSlant: {
    position: "absolute",
    width: "190%",
    height: 144,
    backgroundColor: "#DDE1FA",
    left: -128,
    bottom: -209,
    transform: [{ rotate: "-19deg" }]
  },
  signInIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#2E2FA8",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  signInIconText: {
    fontSize: 22
  },
  signInTitle: {
    fontSize: 35,
    lineHeight: 39,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  signInSubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: "#DDE0FF"
  },
  signInCard: {
    marginHorizontal: 18,
    marginTop: -52,
    backgroundColor: "rgba(242, 243, 248, 0.95)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E6FF",
    shadowColor: "#2E2FA8",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  signInFieldGroup: {
    marginBottom: 12
  },
  signInFieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "uppercase"
  },
  signInField: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.4,
    borderColor: "#D7DBF1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111827"
  },
  signInFieldActive: {
    borderColor: "#6C63FF",
    shadowColor: "#6C63FF",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  signInPasswordWrap: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.4,
    borderColor: "#D7DBF1",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center"
  },
  signInPasswordField: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827"
  },
  signInPasswordToggle: {
    fontSize: 16,
    color: "#6B7280"
  },
  signInForgotWrap: {
    alignItems: "flex-end",
    marginBottom: 14
  },
  signInForgotText: {
    color: "#5C5CDB",
    fontSize: 12,
    fontWeight: "700"
  },
  signInDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 12
  },
  signInDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D7DBF1"
  },
  signInDividerText: {
    color: "#9CA3AF",
    fontSize: 11
  },
  signInGoogleLabel: {
    fontSize: 15,
    marginRight: 6
  },
  signInFooterWrap: {
    marginTop: 16,
    marginBottom: 22,
    alignItems: "center"
  },
  signInFooterText: {
    color: "#6B7280",
    fontSize: 14
  },
  content: {
    padding: 20
  },
  authHeader: {
    backgroundColor: "#5C5CDB",
    padding: 24,
    borderRadius: 18,
    marginBottom: 20
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  authSubtitle: {
    marginTop: 8,
    color: "#DDE0FF",
    fontSize: 14
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280"
  },
  inputGroup: {
    marginBottom: 12
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 6,
    textTransform: "uppercase"
  },
  inputControl: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF0FF"
  },
  primaryButton: {
    backgroundColor: "#5C5CDB",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15
  },
  secondaryButton: {
    backgroundColor: "#EEF0FF",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D4DAFF"
  },
  secondaryButtonText: {
    color: "#2E2FA8",
    fontWeight: "700",
    fontSize: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  chip: {
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999
  },
  chipActive: {
    backgroundColor: "#5C5CDB",
    borderColor: "#5C5CDB"
  },
  chipText: {
    color: "#2E2FA8",
    fontSize: 13,
    fontWeight: "600"
  },
  chipTextActive: {
    color: "#FFFFFF"
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF0FF"
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4
  },
  statValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827"
  },
  statValueGood: {
    color: "#16A34A"
  },
  statValueWarning: {
    color: "#D97706"
  },
  statValueBad: {
    color: "#DC2626"
  },
  listItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEF0FF",
    padding: 12,
    marginBottom: 8
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827"
  },
  itemMeta: {
    marginTop: 4,
    color: "#6B7280"
  },
  textLink: {
    color: "#5C5CDB",
    fontWeight: "700"
  }
});
