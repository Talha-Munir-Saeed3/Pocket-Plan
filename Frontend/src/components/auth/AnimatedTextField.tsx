import { ReactNode, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";

type AnimatedTextFieldProps = {
  label: string;
  value: string;
  rightAccessory?: ReactNode;
  rightAccessoryPress?: () => void;
  palette: {
    inputBg: string;
    inputBorder: string;
    inputBorderActive: string;
    label: string;
    labelActive: string;
    text: string;
  };
  onChangeText: (value: string) => void;
} & Omit<TextInputProps, "value" | "onChangeText">;

export default function AnimatedTextField({
  label,
  value,
  rightAccessory,
  rightAccessoryPress,
  palette,
  onFocus,
  onBlur,
  onChangeText,
  ...textInputProps
}: AnimatedTextFieldProps) {
  const focusProgress = useRef(new Animated.Value(value.length > 0 ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(focusProgress, {
      toValue: value.length > 0 ? 1 : 0,
      duration: 170,
      useNativeDriver: false
    }).start();
  }, [focusProgress, value]);

  const onFieldFocus = (event: any) => {
    Animated.timing(focusProgress, {
      toValue: 1,
      duration: 170,
      useNativeDriver: false
    }).start();
    onFocus?.(event);
  };

  const onFieldBlur = (event: any) => {
    Animated.timing(focusProgress, {
      toValue: value.length > 0 ? 1 : 0,
      duration: 170,
      useNativeDriver: false
    }).start();
    onBlur?.(event);
  };

  const containerStyle = {
    borderColor: focusProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [palette.inputBorder, palette.inputBorderActive]
    })
  };

  const labelStyle = {
    transform: [
      {
        translateY: focusProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10]
        })
      },
      {
        scale: focusProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.84]
        })
      }
    ],
    color: focusProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [palette.label, palette.labelActive]
    })
  };

  return (
    <Animated.View style={[styles.fieldWrap, { backgroundColor: palette.inputBg }, containerStyle]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>

      <View style={styles.inputRow}>
        <TextInput
          {...textInputProps}
          style={[styles.input, { color: palette.text }]}
          value={value}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
          onChangeText={onChangeText}
          placeholderTextColor="rgba(148, 163, 184, 0.9)"
        />

        {rightAccessory ? <Pressable onPress={rightAccessoryPress}>{rightAccessory}</Pressable> : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fieldWrap: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 12
  },
  label: {
    position: "absolute",
    top: 12,
    left: 14,
    fontSize: 13,
    fontWeight: "600"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    flex: 1,
    fontSize: 15,
    minHeight: 28,
    paddingTop: 8,
    paddingBottom: 2
  }
});
