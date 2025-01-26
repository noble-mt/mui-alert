/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { MuiConfirmProps } from "../components/Confirm/confirm";
import { AlertContent } from "./alertContext";
import { MuiNotificationProps } from "../components/Notificaiton/notification";

export const AlertContext = createContext({
    alert: (_item: AlertContent) => {},
    confirm: (_item: MuiConfirmProps) => {},
    notification: (_item: MuiNotificationProps) => {},
  });