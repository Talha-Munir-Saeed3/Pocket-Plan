import { Pressable, Text } from "react-native";

import { appStyles } from "../../styles/appStyles";

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  style,
  leftIcon
}) {
  const buttonStyle = variant === "primary" ? appStyles.primaryButton : appStyles.secondaryButton;
  const textStyle = variant === "primary" ? appStyles.primaryButtonText : appStyles.secondaryButtonText;

  return (
    <Pressable style={[buttonStyle, style]} onPress={onPress}>
      {leftIcon}
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

