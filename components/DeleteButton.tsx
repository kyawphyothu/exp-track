import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Icon, TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { deleteRecord } from "@/libs/actions";
import React, { useState } from "react";
import { IconSymbol } from "./ui/IconSymbol";

const DeleteButton = ({
  db,
  item,
  table,
}: {
  db: any;
  item: {
    id: number;
    name: string;
    href?: any;
  };
  table: any;
}) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => setShowAlertDialog(false);

  return (
    <>
      <Button variant="link" onPress={() => setShowAlertDialog(true)}>
        <ButtonText>
          <IconSymbol name="trash" size={20} color="#e53935" />
        </ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="xs">
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-full gap-2 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
          </Box>
          <AlertDialogHeader className="mb-2">
            <Heading size="md">Delete account?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center">
              Are you sure want to delete this item? This action cannot be
              undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button
              size="sm"
              action="negative"
              onPress={() => {
                deleteRecord(db, item, table, setShowAlertDialog);
              }}
              className="px-[30px]"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="px-[30px]"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
