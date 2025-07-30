import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelStyle: {
            textAlign: 'center'
          }
          // tabBarStyle: {

          // }
          // tabBarStyle: Platform.select({
          //   ios: {
          //     position: "absolute",
          //   },
          //   default: {},
          //   android: {
          //     textAlign: "center"
          //   }
          // }),
        }}
      >
        {/* Left: Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        {/* Middle: Plus */}
        {/* <Tabs.Screen
          name="entry"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={36} name="plus.circle.fill" color={color} />
            ),
          }}
        /> */}
        {/* Right: Account */}
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Accounts",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="creditcard" color={color} />
            ),
          }}
        />
        {/* Right: More */}
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="ellipsis" color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="dev"
          options={{
            title: "DEV",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="exclamationmark.shield" color={color} />
            ),
          }}
        />
      </Tabs>

      <Fab
        className="bg-[#0a7ea4] mb-24"
        size="lg"
        placement="bottom right"
        isHovered={true}
        isDisabled={false}
        isPressed={true}
      >
        <FabIcon className="color-white" size="xl" as={AddIcon} />
      </Fab>
      {/* </Box> */}
    </View>
  );
}
