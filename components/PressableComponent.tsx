import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import DeletButton from "./DeleteButton";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";

const PressableComponent = ({
  db,
  uri,
  item,
  table,
  icon,
}: {
  db: any;
  uri: "/account-category";
  item: {
    id: number;
    name: string;
    href?: any;
  };
  table: any;
  icon: boolean;
}) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        if (item.href) {
          router.push(item.href);
        } else {
          router.push(`${uri}/${item.id}/page` as any);
        }
      }}
    >
      {({ pressed }) => (
        <View
          className={`h-16 px-6 flex-row items-center justify-between border-b bg-slate-200 ${
            pressed ? "bg-slate-400" : ""
          }`}
        >
          <Text>{item.name}</Text>
          {icon && <DeletButton db={db} item={item} table={table} />}
        </View>
      )}
    </Pressable>
  );
};

export default PressableComponent;
