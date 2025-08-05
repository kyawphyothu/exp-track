import { Tabs, useRouter } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { Button } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Text } from "@/components/ui/text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelStyle: {
            textAlign: "center",
          },
          tabBarStyle: {
            elevation: 0
          }
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        {/* Account */}
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Accounts",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="creditcard" color={color} />
            ),
            headerTitleAlign: "center",
            headerRight: () => (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                onPress={() => router.push("/add-account/page")}
              >
                <MaterialIcons name="add" size={20} color="black" />
              </Button>
            ),
          }}
        />

        {/* More */}
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="ellipsis" color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />

        {/* Setting */}
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="folder.badge.gearshape" color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />

        {/* Account Settings */}
        <Tabs.Screen
          name="account-settings"
          options={{
            title: "Account Settings",
            href: null,
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => router.push("/more")}>
                {({ pressed }) => (
                  <View
                    className={`flex-row items-center bg-slate-200 ${
                      pressed ? "bg-slate-400" : ""
                    }`}
                  >
                    <MaterialIcons
                      name="chevron-left"
                      size={30}
                      color="black"
                    />
                    <Text size="xl">More</Text>
                  </View>
                )}
              </Pressable>
            ),
          }}
        />

        {/* Account categories */}
        <Tabs.Screen
          name="account-categories"
          options={{
            title: "Account Categories",
            href: null,
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => router.push("/account-settings")}>
                {({ pressed }) => (
                  <View
                    className={`flex-row items-center bg-slate-200 ${
                      pressed ? "bg-slate-400" : ""
                    }`}
                  >
                    <MaterialIcons
                      name="chevron-left"
                      size={30}
                      color="black"
                    />
                    <Text size="xl">Back</Text>
                  </View>
                )}
              </Pressable>
            ),
            headerRight: () => (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                onPress={() => router.push("/account-category/page")}
              >
                <MaterialIcons name="add" size={20} color="black" />
              </Button>
            ),
          }}
        />

        {/* Currencies */}
        <Tabs.Screen
          name="currencies"
          options={{
            title: "Currencies",
            href: null,
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable onPress={() => router.push("/currencies")}>
                {({ pressed }) => (
                  <View
                    className={`flex-row items-center bg-slate-200 ${
                      pressed ? "bg-slate-400" : ""
                    }`}
                  >
                    <MaterialIcons
                      name="chevron-left"
                      size={30}
                      color="black"
                    />
                    <Text size="xl">Back</Text>
                  </View>
                )}
              </Pressable>
            ),
            headerRight: () => (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                onPress={() => router.push("/currency-list/page")}
              >
                <MaterialIcons name="add" size={20} color="black" />
              </Button>
            ),
          }}
        />

        {/* Dev */}
        <Tabs.Screen
          name="dev"
          options={{
            title: "DEV",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="exclamationmark.shield"
                color={color}
              />
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
    </SafeAreaView>
  );
}
