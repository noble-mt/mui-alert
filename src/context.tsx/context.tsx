/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { ConfirmProperties } from "../components/Confirm/confirm";
import { AlertContent, NotificationProps } from "./alertContext";

export const AlertContext = createContext({
    alert: (_item: AlertContent) => {},
    confirm: (_item: ConfirmProperties) => {},
    notification: (_item: NotificationProps) => {},
  });