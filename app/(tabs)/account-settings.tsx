import PressableComponent from "@/components/PressableComponent";
import React from "react";
import { FlatList } from "react-native";

const accountSettings = [
  { name: "Account categories", href: "/account-categories" },
  { name: "Deleted accounts", href: "/deleted-accounts" },
];

export default function AccountSettings() {
  return (
    <FlatList
      className="h-full"
      data={accountSettings}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <PressableComponent item={item} />}
    />
  );
}
