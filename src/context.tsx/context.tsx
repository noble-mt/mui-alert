/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { AlertContent, ConfirmContent, NotificationContent } from "./alertContext";

export const AlertContext = createContext({
    alert: (_item: AlertContent) => {},
    confirm: (_item: ConfirmContent) => {},
    notification: (_item: NotificationContent) => {},
  });