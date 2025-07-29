import { currencies } from "@/data";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SelectCurrency() {
  const [search, setSearch] = useState("");

  const filteredCurrencies = currencies.filter(
    (cur) =>
      cur.name.toLowerCase().includes(search.toLowerCase()) ||
      cur.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search currency..."
        className="border p-2 mx-2 my-4 rounded-lg"
      />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View className="px-2 py-4 flex-row items-center border-b">
            <Text className="capitalize" style={{ flex: 1 }}>
              {item.name}
            </Text>
          </View>
        )}
        className="h-full"
      />
    </View>
  );
}
