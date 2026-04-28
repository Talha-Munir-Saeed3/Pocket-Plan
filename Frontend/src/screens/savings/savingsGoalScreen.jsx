import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";
import PrimaryButton from "../../components/common/primaryButton";

const sanitizeNumber = (value) => value.replace(/[^0-9]/g, "");
const toCurrency = (value) => `PKR ${Math.max(0, Number(value) || 0).toLocaleString()}`;
const formatNumberInput = (value) => {
  const numeric = sanitizeNumber(String(value ?? ""));
  if (!numeric) return "";
  return Number(numeric).toLocaleString();
};

const SPLIT_GOAL_OPTIONS = [
  { id: "emergency", name: "Emergency Fund" },
  { id: "laptop", name: "New Laptop" },
  { id: "vacation", name: "Vacation" },
  { id: "wedding", name: "Wedding Fund" },
  { id: "car", name: "Car Down Payment" },
  { id: "medical", name: "Medical Reserve" },
  { id: "travel", name: "Travel Fund" }
];
const MAX_SPLIT_GOALS = SPLIT_GOAL_OPTIONS.length;

const rebalanceSplitGoals = (items) => {
  if (!items.length) return items;

  const baseShare = Math.floor(100 / items.length);
  const remainder = 100 - baseShare * items.length;

  return items.map((item, index) => ({
    ...item,
    percentage: String(baseShare + (index < remainder ? 1 : 0)),
    isPrimary: index === 0
  }));
};

const createSplitGoals = (count, sourceGoals = []) => {
  const safeCount = Math.max(1, Math.min(MAX_SPLIT_GOALS, Number(count) || 1));
  const trimmedGoals = sourceGoals.slice(0, safeCount).map((item, index) => ({
    ...item,
    isPrimary: index === 0
  }));

  while (trimmedGoals.length < safeCount) {
    const usedGoalIds = trimmedGoals.map((item) => item.goalId);
    const nextGoalId = SPLIT_GOAL_OPTIONS.find((goal) => !usedGoalIds.includes(goal.id))?.id ?? SPLIT_GOAL_OPTIONS[0].id;

    trimmedGoals.push({
      id: `split-${Date.now()}-${trimmedGoals.length + 1}`,
      goalId: nextGoalId,
      percentage: "0",
      isPrimary: false
    });
  }

  return rebalanceSplitGoals(trimmedGoals);
};

export default function SavingsGoalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState("overview");
  const [goalName, setGoalName] = useState("New Laptop");
  const [targetAmount, setTargetAmount] = useState("150000");
  const [monthlyContribution, setMonthlyContribution] = useState("12000");
  const [savedAmount] = useState("42500");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftGoalName, setDraftGoalName] = useState(goalName);
  const [draftTargetAmount, setDraftTargetAmount] = useState(targetAmount);
  const [draftMonthlyContribution, setDraftMonthlyContribution] = useState(monthlyContribution);
  const [showOverallPercent, setShowOverallPercent] = useState(false);
  const [showMonthlyPercent, setShowMonthlyPercent] = useState(false);
  const [isCreatingNewGoal, setIsCreatingNewGoal] = useState(false);
  const [goals, setGoals] = useState([
    { id: `user-${Date.now()}`, name: goalName, target: String(targetAmount), monthly: String(monthlyContribution) }
  ]);
  const [splitGoals, setSplitGoals] = useState(() => createSplitGoals(2, [
    { id: "split-1", goalId: "emergency", percentage: "50", isPrimary: true },
    { id: "split-2", goalId: "laptop", percentage: "30", isPrimary: false },
    { id: "split-3", goalId: "vacation", percentage: "20", isPrimary: false }
  ]));
  const [splitGoalPickerIndex, setSplitGoalPickerIndex] = useState(null);
  const [extraSplitGoalsEnabled, setExtraSplitGoalsEnabled] = useState(false);

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const targetValue = Number(targetAmount) || 0;
  const savedValue = Number(savedAmount) || 0;
  const monthlyValue = Number(monthlyContribution) || 0;
  const remaining = Math.max(0, targetValue - savedValue);
  const progress = targetValue > 0 ? Math.round((savedValue / targetValue) * 100) : 0;
  const monthsToGoal = monthlyValue > 0 ? Math.ceil(remaining / monthlyValue) : 0;
  const recommendedMonthly = targetValue > 0 ? Math.ceil(targetValue / 12) : 0;
  const monthlyProgress = recommendedMonthly > 0 ? Math.round((monthlyValue / recommendedMonthly) * 100) : 0;
  const monthlyHealth = monthlyProgress >= 100 ? "On Track" : monthlyProgress >= 75 ? "Caution" : "Off Track";
  const monthlyHealthColor = monthlyHealth === "On Track" ? "#16A34A" : monthlyHealth === "Caution" ? "#EAB308" : "#DC2626";
  const splitTotal = splitGoals.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
  const splitRemaining = Math.max(0, 100 - splitTotal);
  const isPremium = true;

  const availableGoals = [
    ...SPLIT_GOAL_OPTIONS,
    ...goals.map((g) => ({ id: g.id, name: g.name }))
  ];

  const paceMessage = `At ${toCurrency(monthlyValue)}/month you will reach your goal in ${monthsToGoal} month${monthsToGoal === 1 ? "" : "s"} 🎯`;

  const daysLeft = useMemo(() => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.max(0, daysInMonth - now.getDate());
  }, []);

  const startedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric"
      }).format(new Date()),
    []
  );

  const openEditSheet = () => {
    setDraftGoalName(goalName);
    setDraftTargetAmount(targetAmount);
    setDraftMonthlyContribution(monthlyContribution);
    setIsSheetOpen(true);
  };

  const createNewGoal = () => {
    // prepare empty drafts for a new saving plan
    setDraftGoalName("");
    setDraftTargetAmount("0");
    setDraftMonthlyContribution("0");
    setIsCreatingNewGoal(true);
    setIsSheetOpen(true);
  };

  const saveEditSheet = () => {
    const name = draftGoalName.trim() || "New Goal";
    const target = sanitizeNumber(draftTargetAmount) || "0";
    const monthly = sanitizeNumber(draftMonthlyContribution) || "0";

    if (isCreatingNewGoal) {
      // create a new user goal and add it to the goals list
      const newGoal = { id: `user-${Date.now()}`, name, target: String(target), monthly: String(monthly) };
      setGoals((current) => [...current, newGoal]);
      // Do NOT switch the main displayed goal — keep the existing goal visible
      setIsCreatingNewGoal(false);
    } else {
      // editing existing main goal
      setGoalName(name || "New Laptop");
      setTargetAmount(target);
      setMonthlyContribution(monthly);
    }

    setIsSheetOpen(false);
  };

  const revealOverallProgress = () => {
    setShowOverallPercent(true);
    setTimeout(() => setShowOverallPercent(false), 1600);
  };

  const revealMonthlyProgress = () => {
    setShowMonthlyPercent(true);
    setTimeout(() => setShowMonthlyPercent(false), 1600);
  };

  const updateSplitGoal = (index, changes) => {
    setSplitGoals((current) => {
      const nextGoals = current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...changes } : item));

      if (changes.percentage !== undefined) {
        const requestedValue = Number(sanitizeNumber(String(changes.percentage))) || 0;
        const otherTotal = current.reduce((sum, item, itemIndex) => {
          if (itemIndex === index) return sum;
          return sum + (Number(item.percentage) || 0);
        }, 0);
        const allowedValue = Math.max(0, 100 - otherTotal);

        nextGoals[index] = {
          ...nextGoals[index],
          percentage: String(Math.min(requestedValue, allowedValue))
        };
      }

      return nextGoals;
    });
  };

  const addSplitGoal = () => {
    if (!isPremium) return;
    setSplitGoals((current) => {
      if (current.length >= MAX_SPLIT_GOALS) return current;
      const nextGoalId = availableGoals.find((goal) => !current.some((item) => item.goalId === goal.id))?.id || availableGoals[0].id;
      const nextIndex = current.length;

      setSplitGoalPickerIndex(nextIndex);

      return [
        ...current,
        {
          id: `split-${current.length + 1}`,
          goalId: nextGoalId,
          percentage: "0",
          isPrimary: false
        }
      ];
    });
  };

  const removeSplitGoal = (index) => {
    setSplitGoals((current) => {
      if (current.length <= 1) return current;
      return current.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({
        ...item,
        isPrimary: itemIndex === 0
      }));
    });
  };

  const balanceSplitGoals = () => {
    setSplitGoals((current) => {
      if (!current.length) return current;
      return rebalanceSplitGoals(current);
    });
  };

  const saveSplitGoals = () => {
    setSplitGoals((current) => current.map((item) => ({ ...item })));
  };

  const selectSplitGoal = (goalId) => {
    if (splitGoalPickerIndex === null) return;
    updateSplitGoal(splitGoalPickerIndex, { goalId });
    setSplitGoalPickerIndex(null);
  };

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 12 }] }>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>Savings Goal</Text>
            <Pressable
              style={styles.headerHelpButton}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={() => router.push(`/savings-help?section=${activeView}`)}
            >
              <Text style={styles.headerHelpText}>?</Text>
            </Pressable>
          </View>

          <Text style={styles.heroSub}>{startedLabel} · {daysLeft} days left</Text>

          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>Target</Text>
              <Text style={styles.pillValue}>{toCurrency(targetValue)}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>Saved</Text>
              <Text style={styles.pillValue}>{toCurrency(savedValue)}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>ETA</Text>
              <Text style={styles.pillValue}>{monthsToGoal} months</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.viewTabsWrap}>
          <Pressable
            style={[styles.viewTab, activeView === "overview" && styles.viewTabActive]}
            onPress={() => setActiveView("overview")}
          >
            <Text style={[styles.viewTabText, activeView === "overview" && styles.viewTabTextActive]}>Overview</Text>
          </Pressable>
          <Pressable
            style={[styles.viewTab, activeView === "plan" && styles.viewTabActive]}
            onPress={() => setActiveView("plan")}
          >
            <Text style={[styles.viewTabText, activeView === "plan" && styles.viewTabTextActive]}>Plan</Text>
          </Pressable>
        </View>

        {activeView === "overview" ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Goal Progress</Text>
            <Text style={styles.goalContextText}>Main Goal: {goalName} ({toCurrency(targetValue)})</Text>

            <Pressable style={styles.progressTrackWrap} onPress={revealOverallProgress}>
              {showOverallPercent ? (
                <View style={[styles.progressBubble, { left: `${Math.min(95, Math.max(6, progress))}%` }]}>
                  <Text style={styles.progressBubbleText}>{Math.max(0, progress)}%</Text>
                </View>
              ) : null}
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, progress))}%` }]} />
              </View>
            </Pressable>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Saved So Far</Text>
              <Text style={styles.statValue}>{toCurrency(savedValue)}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Remaining To Goal</Text>
              <Text style={styles.statValue}>{toCurrency(remaining)}</Text>
            </View>

            <View style={styles.monthlyCard}>
              <View style={styles.monthlyHeadRow}>
                <Text style={styles.monthlyTitle}>Monthly Progress</Text>
                <View style={[styles.healthBadge, { borderColor: monthlyHealthColor, backgroundColor: `${monthlyHealthColor}1A` }]}>
                  <Text style={[styles.healthBadgeText, { color: monthlyHealthColor }]}>{monthlyHealth}</Text>
                </View>
              </View>
              <Text style={styles.monthlyContextText}>This compares your current monthly saving against the recommended monthly amount.</Text>

              <Pressable style={styles.progressTrackWrap} onPress={revealMonthlyProgress}>
                {showMonthlyPercent ? (
                  <View style={[styles.progressBubble, { left: `${Math.min(95, Math.max(6, monthlyProgress))}%`, backgroundColor: monthlyHealthColor }]}>
                    <Text style={styles.progressBubbleText}>{Math.max(0, monthlyProgress)}%</Text>
                  </View>
                ) : null}
                <View style={styles.monthlyTrack}>
                  <View style={[styles.monthlyFill, { width: `${Math.min(100, Math.max(0, monthlyProgress))}%`, backgroundColor: monthlyHealthColor }]} />
                </View>
              </Pressable>

              <View style={styles.monthlyStatsRow}>
                <Text style={styles.monthlyStatText}>Recommended: {toCurrency(recommendedMonthly)}/mo</Text>
                <Text style={styles.monthlyStatText}>Current: {toCurrency(monthlyValue)}/mo</Text>
              </View>
            </View>

            <View style={styles.motivationBox}>
              <Text style={styles.etaMessage}>{paceMessage}</Text>
            </View>

            <View style={styles.overviewFooterSpace} />
          </View>
        ) : null}

        {activeView === "plan" ? (
          <>
            <View style={styles.card}>
              <View style={styles.cardHeadRow}>
                <Text style={styles.sectionTitle}>Savings Plan</Text>
                <Pressable style={styles.editBtn} onPress={openEditSheet}>
                  <Text style={styles.editBtnText}>Adjust</Text>
                </Pressable>
              </View>

              <View style={styles.setupRow}>
                <Text style={styles.setupLabel}>Goal Name</Text>
                <Text style={styles.setupValue}>{goalName}</Text>
              </View>

              <View style={styles.setupRow}>
                <Text style={styles.setupLabel}>Total Target</Text>
                <Text style={styles.setupValue}>{toCurrency(targetValue)}</Text>
              </View>

              <View style={styles.setupRow}>
                <Text style={styles.setupLabel}>Monthly Saving</Text>
                <Text style={styles.setupValue}>{toCurrency(monthlyValue)}</Text>
              </View>

              <View style={styles.setupRow}>
                <Text style={styles.setupLabel}>Started</Text>
                <Text style={styles.setupValue}>{startedLabel}</Text>
              </View>

              <PrimaryButton
                label="Add Saving Plan"
                style={styles.planActionButton}
                onPress={createNewGoal}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeadRow}>
                <Text style={styles.sectionTitle}>Split Allocation</Text>
              </View>
              <Text style={styles.splitHint}>
                Add another goal when you want to extend the plan.
              </Text>

              <View style={styles.splitControlCard}>
                <View style={styles.splitControlRow}>
                  <View style={styles.splitControlCopy}>
                    <Text style={styles.splitControlTitle}>Extra goals</Text>
                    <Text style={styles.splitControlText}>
                      Activate this to add new rows manually.
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.splitToggle, extraSplitGoalsEnabled && styles.splitToggleActive, !isPremium && styles.splitToggleDisabled]}
                    onPress={() => {
                      if (!isPremium) return;
                      setExtraSplitGoalsEnabled((current) => !current);
                    }}
                  >
                    <View style={[styles.splitToggleKnob, extraSplitGoalsEnabled && styles.splitToggleKnobActive]} />
                  </Pressable>
                </View>
              </View>

              <View style={styles.splitActionRow}>
                <Pressable style={styles.splitActionBtn} onPress={addSplitGoal}>
                  <Ionicons name="add-circle-outline" size={14} color="#2E2FA8" />
                  <Text style={styles.splitActionBtnText}>Add Split Row</Text>
                </Pressable>

                <Pressable style={styles.splitActionBtn} onPress={balanceSplitGoals}>
                  <Ionicons name="scale" size={14} color="#2E2FA8" />
                  <Text style={styles.splitActionBtnText}>Balance</Text>
                </Pressable>
              </View>

              <View style={styles.splitSummaryRow}>
                <View style={styles.splitSummaryPill}>
                  <Text style={styles.splitSummaryLabel}>Total</Text>
                  <Text style={styles.splitSummaryValue}>{splitTotal}%</Text>
                </View>
                <View style={styles.splitSummaryPill}>
                  <Text style={styles.splitSummaryLabel}>Remaining</Text>
                  <Text style={styles.splitSummaryValue}>{splitRemaining}%</Text>
                </View>
              </View>

              <View style={styles.splitList}>
                {splitGoals.map((item, index) => {
                  const selectedGoalName = availableGoals.find((goal) => goal.id === item.goalId)?.name ?? "Select goal";
                  return (
                    <View key={item.id} style={styles.splitRow}>
                      <View style={styles.splitRowHeader}>
                        <View style={styles.splitRowTitleWrap}>
                          <Text style={styles.splitRowTitle}>{index === 0 ? "Primary Goal" : `Goal ${index + 1}`}</Text>
                          {index === 0 ? <Text style={styles.splitPrimaryBadge}>Primary</Text> : null}
                        </View>
                        <Pressable
                          onPress={() => removeSplitGoal(index)}
                          disabled={splitGoals.length <= 1}
                          style={[styles.splitRemoveBtn, splitGoals.length <= 1 && styles.splitRemoveBtnDisabled]}
                        >
                          <Ionicons name="close" size={14} color={splitGoals.length <= 1 ? "#CBD5E1" : "#DC2626"} />
                        </Pressable>
                      </View>

                      <Pressable style={styles.splitGoalBox} onPress={() => setSplitGoalPickerIndex(index)}>
                        <Text style={styles.splitGoalText}>{selectedGoalName}</Text>
                        <Text style={styles.goalSelectChevron}>⌄</Text>
                      </Pressable>

                      <View style={styles.splitPercentRow}>
                        <Text style={styles.splitPercentLabel}>Share</Text>
                        <View style={styles.splitPercentInputWrap}>
                          <TextInput
                            style={styles.splitPercentInput}
                            value={String(item.percentage)}
                            onChangeText={(text) => updateSplitGoal(index, { percentage: sanitizeNumber(text) })}
                            keyboardType="number-pad"
                            placeholder="0"
                            placeholderTextColor="#9CA3AF"
                          />
                          <Text style={styles.splitPercentSuffix}>%</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>

              <PrimaryButton label="Save" style={styles.splitSaveButton} onPress={saveSplitGoals} />
            </View>
          </>
        ) : null}
      </ScrollView>

      <Modal visible={isSheetOpen} transparent animationType="slide" onRequestClose={() => setIsSheetOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setIsSheetOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 14 }]} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{isCreatingNewGoal ? "Create Goal" : "Edit Goal"}</Text>

            <Text style={styles.sheetLabel}>Goal Name</Text>
            <TextInput
              value={draftGoalName}
              onChangeText={setDraftGoalName}
              placeholder="Goal name"
              placeholderTextColor="#9CA3AF"
              style={styles.sheetInput}
            />

            <Text style={styles.sheetLabel}>Total Target</Text>
            <TextInput
              value={formatNumberInput(draftTargetAmount)}
              onChangeText={(text) => setDraftTargetAmount(sanitizeNumber(text))}
              placeholder="PKR 0"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              style={styles.sheetInput}
            />

            <Text style={styles.sheetLabel}>Monthly Saving</Text>
            <TextInput
              value={formatNumberInput(draftMonthlyContribution)}
              onChangeText={(text) => setDraftMonthlyContribution(sanitizeNumber(text))}
              placeholder="PKR 0"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              style={styles.sheetInput}
            />

            <View style={styles.sheetActions}>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnGhost]} onPress={() => setIsSheetOpen(false)}>
                <Text style={styles.sheetBtnGhostText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnPrimary]} onPress={saveEditSheet}>
                <Text style={styles.sheetBtnPrimaryText}>Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={splitGoalPickerIndex !== null} transparent animationType="fade" onRequestClose={() => setSplitGoalPickerIndex(null)}>
        <Pressable style={styles.goalModalOverlay} onPress={() => setSplitGoalPickerIndex(null)}>
          <Pressable style={styles.goalModalCard} onPress={() => {}}>
            <View style={styles.goalModalHeader}>
              <Text style={styles.goalModalTitle}>Select Split Goal</Text>
              <Pressable onPress={() => setSplitGoalPickerIndex(null)} hitSlop={10}>
                <Text style={styles.goalModalClose}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.goalModalSubtitle}>Choose the goal for this split row.</Text>
            <View style={styles.goalModalList}>
              {availableGoals.filter((goal) => !splitGoals.some((item, index) => index !== splitGoalPickerIndex && item.goalId === goal.id)).map((goal) => {
                const isSelected = splitGoals[splitGoalPickerIndex]?.goalId === goal.id;
                return (
                  <Pressable key={goal.id} style={[styles.goalModalItem, isSelected && styles.goalModalItemActive]} onPress={() => selectSplitGoal(goal.id)}>
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
    backgroundColor: "#F4F4FF"
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 0
  },
  hero: {
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heroRightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSub: {
    marginTop: 6,
    color: "#DCE2FF",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  pillsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12
  },
  headerHelpButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  headerHelpText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Sora_700Bold"
  },
  pill: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10
  },
  pillLabel: {
    color: "#DCE2FF",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  pillValue: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderColor: "#DDE3F4",
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#2F2F8F",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  viewTabsWrap: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#E8EBFF",
    padding: 4,
    gap: 6
  },
  viewTab: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 8,
    alignItems: "center"
  },
  viewTabActive: {
    backgroundColor: "#5C5CDB"
  },
  viewTabText: {
    color: "#3949A2",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  viewTabTextActive: {
    color: "#FFFFFF"
  },
  sectionTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    marginBottom: 6
  },
  goalContextText: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 12
  },
  progressTrackWrap: {
    marginBottom: 12,
    position: "relative",
    paddingTop: 22
  },
  progressTrack: {
    height: 20,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    overflow: "hidden",
    marginBottom: 2
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  progressBubble: {
    position: "absolute",
    top: -2,
    transform: [{ translateX: -18 }],
    backgroundColor: "#5C5CDB",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 3
  },
  progressBubbleText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  statRow: {
    marginTop: -1,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statLabel: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  statValue: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  progressPercent: {
    color: "#4C46C8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  healthBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4
  },
  healthBadgeText: {
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  monthlyCard: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E3E8FB",
    backgroundColor: "#FBFCFF",
    borderRadius: 10,
    padding: 12
  },
  monthlyHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  monthlyTitle: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  monthlyContextText: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 4
  },
  monthlyStatus: {
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  monthlyTrack: {
    height: 14,
    borderRadius: 999,
    backgroundColor: "#ECF0FF",
    overflow: "hidden",
    position: "relative"
  },
  monthlyFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  monthlyStatsRow: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4
  },
  monthlyStatText: {
    color: "#475569",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  motivationBox: {
    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DED9FF",
    backgroundColor: "#F4F2FF",
    padding: 12
  },
  etaMessage: {
    color: "#1F2937",
    fontSize: 12,
    lineHeight: 19,
    fontFamily: "Sora_700Bold"
  },
  overviewFooterSpace: {
    height: 28
  },
  cardHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  editBtn: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D7DEFF",
    paddingHorizontal: 9,
    paddingVertical: 4,
    backgroundColor: "#F8FAFF"
  },
  editBtnText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  planActionButton: {
    marginTop: 14
  },
  setupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EBFB",
    paddingVertical: 10,
    gap: 12
  },
  setupRowLast: {
    borderBottomWidth: 0
  },
  setupLabel: {
    flex: 1,
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  setupValue: {
    color: "#0F172A",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    textAlign: "right"
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderColor: "#DDE3F4",
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#2F2F8F",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  premiumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  premiumLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  premiumActionBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D6D3FE",
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  premiumActionBtnDisabled: {
    backgroundColor: "#EEF2F7",
    borderColor: "#E2E8F0"
  },
  premiumActionBtnText: {
    color: "#6D28D9",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  premiumTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  splitHint: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginBottom: 10
  },
  splitControlCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6EBFB",
    backgroundColor: "#FBFCFF",
    padding: 12,
    marginBottom: 10
  },
  splitControlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  splitControlCopy: {
    flex: 1
  },
  splitControlTitle: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  splitControlText: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "Sora_500Medium"
  },
  extraGoalBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  extraGoalBtnActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#EEF0FF"
  },
  extraGoalBtnDisabled: {
    backgroundColor: "#EEF2F7",
    borderColor: "#E2E8F0"
  },
  extraGoalBtnText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  extraGoalBtnTextActive: {
    color: "#5C5CDB"
  },
  splitToggle: {
    width: 50,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    paddingHorizontal: 3,
    flexShrink: 0
  },
  splitToggleActive: {
    backgroundColor: "#5C5CDB"
  },
  splitToggleDisabled: {
    opacity: 0.5
  },
  splitToggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 0 }]
  },
  splitToggleKnobActive: {
    transform: [{ translateX: 19 }]
  },
  splitActionRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10
  },
  splitActionBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#F8FAFF",
    paddingVertical: 9,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  splitActionBtnText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  splitSaveButton: {
    marginBottom: 10
  },
  splitSavedText: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_500Medium",
    marginBottom: 10
  },
  splitSummaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10
  },
  splitSummaryPill: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    backgroundColor: "#FBFCFF",
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  splitSummaryLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  splitSummaryValue: {
    marginTop: 3,
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  splitList: {
    gap: 10
  },
  splitRow: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    backgroundColor: "#F8FAFF",
    padding: 12
  },
  splitRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  splitRowTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  splitRowTitle: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  splitPrimaryBadge: {
    color: "#6D28D9",
    fontSize: 10,
    fontFamily: "Sora_700Bold",
    backgroundColor: "#F3E8FF",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  splitRemoveBtn: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center"
  },
  splitRemoveBtnDisabled: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0"
  },
  splitGoalBox: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#CBD5FF",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  splitGoalText: {
    color: "#111827",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    flex: 1,
    paddingRight: 10
  },
  splitPercentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  },
  splitPercentLabel: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  splitPercentInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    minWidth: 92
  },
  splitPercentInput: {
    flex: 1,
    minWidth: 32,
    color: "#0F172A",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    paddingVertical: 8,
    textAlign: "right"
  },
  splitPercentSuffix: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginLeft: 4
  },
  splitFooterNote: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_500Medium",
    marginTop: 10
  },
  splitCountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  splitCountChip: {
    minWidth: 72,
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    backgroundColor: "#F8FAFF",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  splitCountChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#EEF0FF"
  },
  splitCountChipText: {
    color: "#1F2937",
    fontSize: 16,
    fontFamily: "Sora_800ExtraBold"
  },
  splitCountChipLabel: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  splitCountChipTextActive: {
    color: "#2E2FA8"
  },
  premiumBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E9D5FF",
    backgroundColor: "#F5EDFF",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  premiumBadgeText: {
    color: "#6D28D9",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.35)"
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 10
  },
  sheetHandle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#D4DAFF",
    marginBottom: 10
  },
  sheetTitle: {
    color: "#1F2937",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    marginBottom: 10
  },
  sheetLabel: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 6
  },
  sheetInput: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    backgroundColor: "#FFFFFF",
    marginBottom: 10
  },
  sheetActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 2
  },
  sheetBtn: {
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  sheetBtnGhost: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    backgroundColor: "#FFFFFF"
  },
  sheetBtnPrimary: {
    backgroundColor: "#5C5CDB"
  },
  sheetBtnGhostText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  sheetBtnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  goalModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
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
    color: "#1F2937",
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
