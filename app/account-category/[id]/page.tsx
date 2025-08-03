import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useDatabase } from "@/context/DatabaseContext";
import { accountCategoriesTable } from "@/db/schema";
import { updateRecord } from "@/libs/actions";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function UpdateAccountCategory() {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  const inputRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { db } = useDatabase();

  const { data: accountCategoryDB } = useLiveQuery(
    db
      .select({ name: accountCategoriesTable.name })
      .from(accountCategoriesTable)
      .where(eq(accountCategoriesTable.id, Number(id)))
  );

  useEffect(() => {
    if (accountCategoryDB && accountCategoryDB.length > 0) {
      setName(accountCategoryDB[0].name || "");
    }
  }, [accountCategoryDB]);

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      await updateRecord(db, Number(id), name, accountCategoriesTable);
      router.back();
    } catch (error) {
      console.error("Error updating account category:", error);
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
