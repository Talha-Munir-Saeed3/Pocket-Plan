import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4FF"
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
