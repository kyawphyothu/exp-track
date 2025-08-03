import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useDatabase } from "@/context/DatabaseContext";
import { accountCategoriesTable } from "@/db/schema";
import { insertRecord } from "@/libs/actions";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { View } from "react-native";

export default function AddAccountCategory() {
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { db } = useDatabase();

  // Submit
  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      insertRecord(db, name, accountCategoriesTable);
      setName("");
      router.back();
    } catch (error) {
      console.error("Error adding account category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (value: string) => {
    setName(value);
  };

  return (
    <View className="flex-col gap-4 p-4">
      <View>
        <Input
          variant="underlined"
          size="md"
          isDisabled={isSubmitting}
          isReadOnly={false}
        >
          <InputField
            ref={inputRef}
            placeholder="Account category name"
            value={name}
            onChangeText={handleInputChange}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        </Input>
      </View>

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={onSubmit}
        isDisabled={isSubmitting || !name.trim()}
      >
        <ButtonText>{isSubmitting ? "Saving..." : "Save"}</ButtonText>
      </Button>
    </View>
  );
}
