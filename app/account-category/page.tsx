import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useDatabase } from "@/context/DatabaseContext";
import { accountCategoriesTable } from "@/db/schema";
import { insertRecord } from "@/libs/actions";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";

export default function AddAccountCategory() {
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { db } = useDatabase();

  // Submit
  const onSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(""); // Clear previous error

    try {
      const data = await insertRecord(db, name, accountCategoriesTable);
      if (data.success) {
        setName("");
        router.back();
      } else {
        setErrorMessage(data.message || "Faild to save record");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while saving"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (value: string) => {
    setName(value);
    if (errorMessage) setErrorMessage(""); // Clear error when user starts typing
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
        {errorMessage ? (
          <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
        ) : null}
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
