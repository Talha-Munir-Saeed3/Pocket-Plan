import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InputField from "../../components/common/inputField";
import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";

const EXPENSE_CATEGORY_EMOJIS = {
  food: "🍔",
  transport: "🚗",
  shopping: "🛍",
  rent: "🏠",
  health: "💊",
  entertainment: "🎬",
  education: "📚",
  utilities: "💡",
  travel: "✈️",
  business: "💼",
  personal_care: "💇",
  clothing: "👕",
  groceries: "🛒",
  subscriptions: "📱",
  charity: "🤲",
  repairs: "🔧",
  insurance: "🛡",
  taxes: "📋",
  gifts: "🎁",
  sports: "⚽",
  equipment: "🧰",
  events: "🎟",
  other: "➕"
};

const INCOME_CATEGORY_EMOJIS = {
  salary: "💼",
  freelance: "🧑‍💻",
  business_profit: "📈",
  bonus: "🎉",
  refund: "↩️",
  investment: "🏦",
  rental_income: "🏠",
  side_hustle: "🛠",
  commission: "🧾",
  dividend: "📊",
  gift: "🎁",
  interest: "💹",
  other: "➕"
};

const TRANSFER_CATEGORY_EMOJIS = {
  bank_transfer: "🏦",
  wallet_transfer: "👛",
  savings_move: "🧾",
  cash_withdrawal: "🏧",
  cash_deposit: "💵",
  currency_exchange: "💱",
  card_payment: "💳",
  account_top_up: "🔋",
  investment_move: "📈",
  other: "➕"
};

const BORROW_CATEGORY_EMOJIS = {
  friend: "🧑",
  family: "👨‍👩‍👧",
  loan: "📄",
  credit_advance: "💳",
  split_bill: "🧮",
  emergency: "🚨",
  medical: "🩺",
  education_fee: "🎓",
  rent_support: "🏘",
  business_support: "🏪",
  other: "➕"
};

const CATEGORY_EMOJIS_BY_TYPE = {
  Expense: EXPENSE_CATEGORY_EMOJIS,
  Income: INCOME_CATEGORY_EMOJIS,
  Transfer: TRANSFER_CATEGORY_EMOJIS,
  Borrow: BORROW_CATEGORY_EMOJIS
};

const SAVINGS_ACTIONS = [
  { key: "savings_deposit", label: "Deposit", emoji: "💰" },
  { key: "savings_withdrawal", label: "Withdraw", emoji: "💸" },
  { key: "goal_transfer", label: "Transfer", emoji: "🔁" }
];

const SAMPLE_GOALS = [
  { id: "g1", name: "Emergency Fund" },
  { id: "g2", name: "New Laptop" },
  { id: "g3", name: "Vacation" }
];

const GRACE_PERIOD_DAYS = 2;
const WHEEL_ROW_HEIGHT = 56;

const categoryLabel = (key) => key.replace(/_/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
const firstCategoryKey = (typeName) => Object.keys(CATEGORY_EMOJIS_BY_TYPE[typeName] || {})[0] || "other";

const startOfDay = (dateValue) => {
  const d = new Date(dateValue);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (dateValue) => {
  const d = new Date(dateValue);
  d.setHours(23, 59, 59, 999);
  return d;
};

const addDays = (dateValue, days) => {
  const d = new Date(dateValue);
  d.setDate(d.getDate() + days);
  return d;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const eachDayInRange = (start, end) => {
  const days = [];
  let cursor = startOfDay(start);
  const endDate = startOfDay(end);

  while (cursor <= endDate) {
    days.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }

  return days;
};

const formatDateChip = (dateValue) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(dateValue);

const clampNumber = (value, min, max) => Math.max(min, Math.min(max, value));
const sanitizeNumber = (value) => value.replace(/[^0-9]/g, "");
const formatNumberInput = (value) => {
  const numeric = sanitizeNumber(String(value ?? ""));
  if (!numeric) return "";
  return Number(numeric).toLocaleString();
};

export default function AddTransactionScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((theme) => theme.id === selectedThemeId) ?? THEME_OPTIONS[0];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const graceEnabled = now.getDate() <= GRACE_PERIOD_DAYS;

  const minAllowedDate = graceEnabled ? startOfDay(addDays(monthStart, -GRACE_PERIOD_DAYS)) : startOfDay(monthStart);
  const maxAllowedDate = endOfDay(monthEnd);

  const dateSliderOptions = useMemo(() => eachDayInRange(minAllowedDate, maxAllowedDate), [minAllowedDate, maxAllowedDate]);

  const dateWheelRef = useRef(null);
  const hasInitializedDateScrollRef = useRef(false);

  const [type, setType] = useState("Expense");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [savingsAction, setSavingsAction] = useState("savings_deposit");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [transferTargetGoal, setTransferTargetGoal] = useState("");
  const [goalPickerField, setGoalPickerField] = useState(null);
  const [goalError, setGoalError] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [selectedDate, setSelectedDate] = useState(startOfDay(now));
  const [description, setDescription] = useState("");
  const [dateError, setDateError] = useState("");

  const activeCategoryMap = CATEGORY_EMOJIS_BY_TYPE[type] || {};


  const selectedGoalName = SAMPLE_GOALS.find((goal) => goal.id === selectedGoal)?.name || "Select goal";
  const selectedTargetGoalName = SAMPLE_GOALS.find((goal) => goal.id === transferTargetGoal)?.name || "Select target goal";

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  useEffect(() => {
    const pAction = searchParams?.action ? String(searchParams.action) : "";
    const pType = searchParams?.type ? String(searchParams.type) : "";
    const pGoal = searchParams?.goalId ? String(searchParams.goalId) : "";

    if (pType) setType(pType);
    if (pAction) setSavingsAction(pAction);
    if (pGoal) setSelectedGoal(pGoal);
  }, [searchParams]);

  const scrollDateWheelToSelected = (animated = false) => {
    const dateIndex = dateSliderOptions.findIndex((d) => isSameDay(d, selectedDate));
    if (dateIndex >= 0 && dateWheelRef.current) {
      dateWheelRef.current.scrollTo({ y: dateIndex * WHEEL_ROW_HEIGHT, animated });
    }
  };

  const onDateWheelScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const nextIndex = clampNumber(Math.round(offsetY / WHEEL_ROW_HEIGHT), 0, dateSliderOptions.length - 1);
    const nextDate = dateSliderOptions[nextIndex];
    if (nextDate && !isSameDay(nextDate, selectedDate)) {
      setDateError("");
      setSelectedDate(startOfDay(nextDate));
    }
  };

  useEffect(() => {
    if (hasInitializedDateScrollRef.current) {
      scrollDateWheelToSelected(false);
    }
  }, [selectedThemeId]);


  const saveTransaction = () => {
    if (!String(title ?? "").trim()) {
      setTitleError("Title is required");
      return;
    }
    setTitleError("");
    // savings-specific validation
    setGoalError("");
    if (type === "Savings") {
      if (!selectedGoal) {
        setGoalError("Select a goal");
        return;
      }
      if (savingsAction === "goal_transfer") {
        if (!transferTargetGoal) {
          setGoalError("Select a target goal");
          return;
        }
        if (transferTargetGoal === selectedGoal) {
          setGoalError("Source and target goals must be different");
          return;
        }
      }
    }
    if (selectedDate < minAllowedDate || selectedDate > maxAllowedDate) {
      setDateError(
        `Allowed range is ${formatDateChip(minAllowedDate)} to ${formatDateChip(maxAllowedDate)}${graceEnabled ? " (grace enabled)" : ""}.`
      );
      return;
    }

    setDateError("");

    router.back();
  };

  const selectGoal = (goalId) => {
    if (goalPickerField === "source") {
      setSelectedGoal(goalId);
      if (goalId) setGoalError("");
      if (transferTargetGoal === goalId) setTransferTargetGoal("");
    }
    if (goalPickerField === "target") {
      setTransferTargetGoal(goalId);
      if (goalId) setGoalError("");
    }
    setGoalPickerField(null);
  };
  return (
    <ScreenContainer style={[styles.screen, { backgroundColor: activeTheme.backgroundColor }]} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 28 }]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <LinearGradient colors={[activeTheme.boxColor, activeTheme.supportingAccent]} style={[styles.heroWrap, { paddingTop: insets.top + 8 }] }>
          <View style={styles.hero}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroTitle}>Add Transaction</Text>
              <Pressable style={styles.headerHelpButton} onPress={() => router.push("/add-transaction-help")}>
                <Text style={styles.headerHelpText}>?</Text>
              </Pressable>
            </View>
            <Text style={styles.heroSubtitle}>Log spending, income, transfer, or borrow/lend records.</Text>
          </View>
        </LinearGradient>

        <View style={styles.typeCard}>
          <Text style={styles.sectionTitle}>Type</Text>
          <View style={styles.typeRow}>
          {["Expense", "Income", "Transfer", "Borrow", "Savings"].map((item) => (
            <Pressable
              key={item}
              style={[styles.typeChip, type === item && styles.typeChipActive]}
              onPress={() => {
                setType(item);
                setSelectedCategory(firstCategoryKey(item));
                if (item !== "Savings") {
                  setSelectedGoal("");
                  setSavingsAction("savings_deposit");
                  setTransferTargetGoal("");
                  setGoalError("");
                }
              }}
            >
              <Text style={[styles.typeChipIcon, type === item && styles.typeChipIconActive]}>{item === "Expense" ? "💸" : item === "Income" ? "💰" : item === "Transfer" ? "🔁" : item === "Borrow" ? "🤝" : "🗄️"}</Text>
              <Text style={[styles.typeChipText, type === item && styles.typeChipTextActive]}>{item}</Text>
            </Pressable>
          ))}
          </View>
        </View>

        {type === "Savings" ? (
          <View style={styles.savingsPanel}>
            <View style={styles.savingsHeaderRow}>
              <Text style={styles.sectionTitle}>Savings Action</Text>
              <Text style={styles.savingsHeaderEmoji}>🗄️</Text>
            </View>
            <View style={styles.savingsActionRow}>
              {SAVINGS_ACTIONS.map((action) => (
                <Pressable
                  key={action.key}
                  style={[styles.savingsActionChip, savingsAction === action.key && styles.savingsActionChipActive]}
                  onPress={() => {
                    setSavingsAction(action.key);
                    setGoalError("");
                    if (action.key !== "goal_transfer") setTransferTargetGoal("");
                  }}
                >
                  <Text style={styles.savingsActionEmoji}>{action.emoji}</Text>
                  <Text style={[styles.savingsActionText, savingsAction === action.key && styles.savingsActionTextActive]}>{action.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.goalSelectionCard}>
              <Text style={styles.goalSelectionLabel}>{savingsAction === "goal_transfer" ? "Source Goal" : "Goal"}</Text>
              <Pressable style={styles.goalSelectBox} onPress={() => setGoalPickerField("source")}>
                <Text style={styles.goalSelectText}>{selectedGoalName}</Text>
                <Text style={styles.goalSelectChevron}>⌄</Text>
              </Pressable>

              {savingsAction === "goal_transfer" ? (
                <>
                  <Text style={[styles.goalSelectionLabel, { marginTop: 12 }]}>Target Goal</Text>
                  <Pressable style={styles.goalSelectBox} onPress={() => setGoalPickerField("target")}>
                    <Text style={styles.goalSelectText}>{selectedTargetGoalName}</Text>
                    <Text style={styles.goalSelectChevron}>⌄</Text>
                  </Pressable>
                </>
              ) : null}

              {goalError ? <Text style={styles.errorText}>{goalError}</Text> : null}
            </View>
          </View>
        ) : (
          <View style={styles.categoryCard}>
            <Text style={styles.sectionTitle}>{type} Category</Text>
            <View style={styles.categoryGrid}>
              {Object.entries(activeCategoryMap).map(([key, emoji]) => (
                <Pressable
                  key={key}
                  style={[styles.categoryChip, selectedCategory === key && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(key)}
                >
                  <Text style={styles.categoryEmoji}>{emoji}</Text>
                  <Text style={[styles.categoryText, selectedCategory === key && styles.categoryTextActive]}>{categoryLabel(key)}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.inlineHintRow}>
            <Text style={styles.inlineHintLabel}>Selected Type</Text>
            <Text style={styles.inlineHintValue}>{type}</Text>
          </View>
          <InputField
            label="Title"
            placeholder="e.g., Grocery shopping"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (String(text ?? "").trim()) setTitleError("");
            }}
          />
          {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

          <InputField
            label="Amount"
            placeholder="PKR 0"
            keyboardType="number-pad"
            value={formatNumberInput(amount)}
            onChangeText={(text) => setAmount(sanitizeNumber(text))}
          />

          <Text style={styles.sliderLabel}>Date</Text>
          <View style={styles.wheelCard}>
            <ScrollView
              ref={dateWheelRef}
              style={styles.wheelScroll}
              contentContainerStyle={styles.wheelContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              snapToInterval={WHEEL_ROW_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={onDateWheelScrollEnd}
              onContentSizeChange={() => {
                if (!hasInitializedDateScrollRef.current) {
                  scrollDateWheelToSelected(false);
                  hasInitializedDateScrollRef.current = true;
                }
              }}
            >
            <View style={styles.wheelSpacer} />
            {dateSliderOptions.map((dateItem) => (
              <Pressable
                key={dateItem.toISOString()}
                style={[styles.wheelRow, isSameDay(selectedDate, dateItem) && styles.wheelRowActive]}
                onPress={() => {
                  setDateError("");
                  setSelectedDate(startOfDay(dateItem));
                  const dateIndex = dateSliderOptions.findIndex((d) => isSameDay(d, dateItem));
                  if (dateIndex >= 0 && dateWheelRef.current) {
                    dateWheelRef.current.scrollTo({ y: dateIndex * WHEEL_ROW_HEIGHT, animated: true });
                  }
                }}
              >
                <Text style={[styles.wheelNumber, isSameDay(selectedDate, dateItem) && styles.wheelNumberActive]}>{dateItem.getDate()}</Text>
                <Text style={[styles.wheelText, isSameDay(selectedDate, dateItem) && styles.wheelTextActive]}>{dateItem.toLocaleDateString("en-US", { weekday: "short", month: "short" })}</Text>
              </Pressable>
            ))}
            <View style={styles.wheelSpacer} />
            </ScrollView>
          </View>
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

          <View style={styles.descriptionGroup}>
            <Text style={styles.descriptionLabel}>Description (Optional)</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add a short note (optional)"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>
          <PrimaryButton label="Save Transaction" style={{ marginTop: 10 }} onPress={saveTransaction} />
        </View>
      </ScrollView>
      <Modal visible={Boolean(goalPickerField)} transparent animationType="fade" onRequestClose={() => setGoalPickerField(null)}>
        <Pressable style={styles.goalModalOverlay} onPress={() => setGoalPickerField(null)}>
          <Pressable style={styles.goalModalCard} onPress={() => {}}>
            <View style={styles.goalModalHeader}>
              <Text style={styles.goalModalTitle}>
                {goalPickerField === "target" ? "Select Target Goal" : "Select Goal"}
              </Text>
              <Pressable onPress={() => setGoalPickerField(null)} hitSlop={10}>
                <Text style={styles.goalModalClose}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.goalModalSubtitle}>
              {goalPickerField === "target"
                ? "Pick a different goal from the source goal."
                : "Choose the goal this savings action should apply to."}
            </Text>
            <View style={styles.goalModalList}>
              {SAMPLE_GOALS.filter((goal) => !(goalPickerField === "target" && goal.id === selectedGoal)).map((goal) => {
                const isSelected = goalPickerField === "target" ? transferTargetGoal === goal.id : selectedGoal === goal.id;
                return (
                  <Pressable key={goal.id} style={[styles.goalModalItem, isSelected && styles.goalModalItemActive]} onPress={() => selectGoal(goal.id)}>
                    <Text style={[styles.goalModalItemText, isSelected && styles.goalModalItemTextActive]}>{goal.name}</Text>
                    {isSelected ? <Text style={styles.goalModalItemCheck}>✓</Text> : null}
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#5C5CDB"
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 0,
    paddingBottom: 28
  },
  heroWrap: {
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingTop: 10,
    marginBottom: 12,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26
  },
  hero: {
    paddingTop: 6,
    paddingBottom: 14,
    paddingHorizontal: 2
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontFamily: "Sora_800ExtraBold"
  },
  headerHelpButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7CEFF",
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center"
  },
  headerHelpText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Sora_700Bold"
  },
  heroSubtitle: {
    marginTop: 6,
    color: "#E2E7FF",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
  },
  typeCard: {
    backgroundColor: "#FCFCFF",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#CBD5FF",
    padding: 12,
    marginBottom: 10
  },
  sectionTitle: {
    color: "#1F2937",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    marginBottom: 10
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  typeChip: {
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  typeChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#5C5CDB",
    transform: [{ scale: 1.02 }],
    shadowColor: "#5C5CDB",
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2
  },
  typeChipIcon: {
    fontSize: 14
  },
  typeChipIconActive: {
    transform: [{ scale: 1.06 }]
  },
  typeChipText: {
    color: "#2E2FA8",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  typeChipTextActive: {
    color: "#FFFFFF"
  },
  savingsPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12,
    marginBottom: 10
  },
  savingsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  savingsHeaderEmoji: {
    fontSize: 18
  },
  savingsActionRow: {
    flexDirection: "row",
    gap: 8
  },
  savingsActionChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 4
  },
  savingsActionChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#EEF0FF"
  },
  savingsActionEmoji: {
    fontSize: 16
  },
  savingsActionText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  savingsActionTextActive: {
    color: "#1F2937"
  },
  goalSelectionCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12
  },
  goalSelectionLabel: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginBottom: 8
  },
  goalSelectBox: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#CBD5FF",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  goalSelectText: {
    color: "#111827",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    flex: 1,
    paddingRight: 10
  },
  goalSelectChevron: {
    color: "#5C5CDB",
    fontSize: 18,
    fontFamily: "Sora_700Bold"
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12,
    marginBottom: 10
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  categoryChip: {
    width: "31%",
    minHeight: 76,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 6,
    paddingVertical: 8
  },
  categoryChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#EEF0FF"
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4
  },
  categoryText: {
    color: "#334155",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold",
    textAlign: "center"
  },
  categoryTextActive: {
    color: "#2E2FA8",
    fontFamily: "Sora_700Bold"
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12
  },
  inlineHintRow: {
    backgroundColor: "#F5F7FF",
    borderWidth: 1,
    borderColor: "#E1E8FF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inlineHintLabel: {
    color: "#4B5563",
    fontSize: 12,
    fontFamily: "Sora_500Medium"
  },
  inlineHintValue: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  sliderLabel: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginTop: 3,
    marginBottom: 6
  },
  wheelCard: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden"
  },
  wheelScroll: {
    height: WHEEL_ROW_HEIGHT * 3
  },
  wheelContent: {
    paddingVertical: 0
  },
  wheelSpacer: {
    height: WHEEL_ROW_HEIGHT
  },
  wheelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 8,
    marginVertical: 0,
    height: WHEEL_ROW_HEIGHT,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEF2FF",
    backgroundColor: "#FFFFFF"
  },
  wheelRowActive: {
    borderColor: "#4C3FC2",
    backgroundColor: "#ECEBFF"
  },
  wheelNumber: {
    color: "#1E293B",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    minWidth: 24
  },
  wheelNumberActive: {
    color: "#2E2FA8"
  },
  wheelText: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  wheelTextActive: {
    color: "#2E2FA8",
    fontFamily: "Sora_700Bold"
  },
  descriptionGroup: {
    marginBottom: 4
  },
  descriptionLabel: {
    color: "#4B5563",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginBottom: 6,
    textTransform: "uppercase"
  },
  descriptionInput: {
    minHeight: 92,
    borderWidth: 1,
    borderColor: "#D7DEFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
  },
  errorText: {
    color: "#C62828",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 6
  },
  goalModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.42)",
    justifyContent: "center",
    paddingHorizontal: 16
  },
  goalModalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8F3",
    padding: 14
  },
  goalModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  },
  goalModalTitle: {
    color: "#111827",
    fontSize: 16,
    fontFamily: "Sora_800ExtraBold"
  },
  goalModalClose: {
    color: "#64748B",
    fontSize: 16,
    fontFamily: "Sora_700Bold"
  },
  goalModalSubtitle: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginBottom: 10
  },
  goalModalList: {
    gap: 8
  },
  goalModalItem: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  goalModalItemActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#EEF0FF"
  },
  goalModalItemText: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  goalModalItemTextActive: {
    color: "#2E2FA8",
    fontFamily: "Sora_700Bold"
  },
  goalModalItemCheck: {
    color: "#5C5CDB",
    fontSize: 14,
    fontFamily: "Sora_800ExtraBold"
  }
});
