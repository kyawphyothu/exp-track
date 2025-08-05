import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const settings: {
  title: string;
  icon: string;
  href?: "/currencies" | "/account-settings";
}[] = [
  { title: "currencies", icon: "coloncurrencysign", href: "/currencies" },
  {
    title: "account settings",
    icon: "coloncurrencysign",
    href: "/account-settings",
  },
  { title: "income categories", icon: "coloncurrencysign" },
  { title: "expense categories", icon: "coloncurrencysign" },
];

export default function MoreScreen() {
  const router = useRouter();
  return (
    <View>
      {settings.map((set) => (
        <Pressable
          key={set.title}
          onPress={() => {
            if (set.href) router.push(set.href);
          }}
        >
          {({ pressed }) => (
            <View
              className={`py-6 flex-row items-center border ${
                pressed ? "bg-slate-400" : ""
              }`}
            >
              <IconSymbol name={set.icon} size={22} style={{ margin: 8 }} />
              <View>
                <Text className="capitalize">{set.title}</Text>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
