import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5C5CDB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E7EB",
          borderTopWidth: 1,
          height: 58 + Math.max(insets.bottom, 8),
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8)
        },
        tabBarItemStyle: {
          paddingVertical: 2
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={20} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={20} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={20} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={20} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={20} color={color} />
          )
        }}
      />
    </Tabs>
  );
}


