import React from "react";
import * as Toast from "@radix-ui/react-toast";
import styles from "./css/AddCenterSuccessToast.module.css";

export default function AddCenterSuccessToast({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={styles.ToastRoot}
        open={open}
        onOpenChange={setOpen}
        duration={3000}
      >
        <Toast.Title className={styles.ToastTitle}>Center added</Toast.Title>
        <Toast.Description className={styles.ToastDescription} asChild>
          Addedd successfully
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
}
