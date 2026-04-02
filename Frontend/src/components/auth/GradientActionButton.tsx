import { ReactNode, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientActionButtonProps = {
  label: string;
  onPress: () => void;
  leftNode?: ReactNode;
  disabled?: boolean;
};

export default function GradientActionButton({
  label,
  onPress,
  leftNode,
  disabled = false
}: GradientActionButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedStyle = {
    transform: [{ scale }]
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          Animated.spring(scale, {
            toValue: 0.98,
            useNativeDriver: true,
            speed: 25,
            bounciness: 6
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 25,
            bounciness: 6
          }).start();
        }}
        style={[styles.pressable, disabled && styles.disabled]}
      >
        <LinearGradient colors={["#5C5CDB", "#7B5CF6"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bg}>
          {leftNode}
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#5C5CDB",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7
  },
  bg: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  disabled: {
    opacity: 0.5
  }
});
