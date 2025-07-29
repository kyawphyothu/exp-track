import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function CurrencyList() {
  const currencies = [
    { code: "VND", name: "Vietnamese Dong" },
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
  ];
  const [search, setSearch] = useState("");

  return (
    <View>
      {/* <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search currency..."
        className="border p-2 mx-2 my-4 rounded-lg"
      /> */}
      {currencies
        .filter(
          (set) =>
            set.name.toLowerCase().includes(search.toLowerCase()) ||
            set.code.toLowerCase().includes(search.toLowerCase())
        )
        .map((set) => (
          <View
            key={set.code}
            className="px-2 py-4 flex-row items-center border-b"
          >
            <Text className="capitalize" style={{ flex: 1 }}>
              {set.name}
            </Text>
            {/* <Pressable onPress={() => console.log("edit", set.code)}>
              <IconSymbol
                name="pencil"
                size={20}
                color="#0a7ea4"
                style={{ marginRight: 12 }}
              />
            </Pressable> */}
            <Pressable onPress={() => console.log("delete", set.code)}>
              <IconSymbol name="trash" size={20} color="#e53935" />
            </Pressable>
          </View>
        ))}
    </View>
  );
}
