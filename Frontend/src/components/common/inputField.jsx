import { Text, TextInput, View } from "react-native";

import { appStyles } from "../../styles/appStyles";

export default function InputField({
  label,
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  keyboardType,
  ...rest
}) {
  return (
    <View style={appStyles.inputGroup}>
      <Text style={appStyles.inputLabel}>{label}</Text>
      <TextInput
        style={appStyles.inputControl}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...rest}
      />
    </View>
  );
}

