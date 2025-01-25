import { useState, ReactNode, useCallback } from "react";
import { Confirm, ConfirmProperties } from "../components/Confirm/confirm";
import { MuiAlert, MuiAlertProps } from "../components/Alert/alert";
import { Notification } from "../components/Notificaiton/notification";
import { v4 as uuidv4 } from "uuid";
import { omit } from "lodash";
import { AlertContext } from "./context";
import { Box, Snackbar } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNodeText = (node: any): string => {
  if (["string", "number"].includes(typeof node)) return node as string;
  if (node instanceof Array) return node.map(getNodeText).join(" ");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
  return "";
};

const getWordCount = (message: string | ReactNode): number =>
  getNodeText(message).trim().split(/\s+/).length;

export interface AlertContent extends Omit<MuiAlertProps, "autoHide"> {
  timeout?: number;
  stackAlerts?: boolean
}
export interface AlertStack extends AlertContent {
  id: string;
}
export interface NotificationContent {
  message: string;
}
export interface NotificationProps extends NotificationContent {
  timeout?: number;
}
export interface NotificationStack extends NotificationContent {
  id: string;
}

export interface AlertProps {
  vertical?: 'bottom' | 'top',
  horizontal?: 'center' | 'left' | 'right',
  stackAlerts?: boolean
}

export const AlertProvider = ({ children, alertProps }: { children: ReactNode, alertProps?: AlertProps }) => {
  const [alertContent, setAlertContent] = useState<AlertStack[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmProperties | null>(
    null
  );
  const [notificationContent, setNotificationContent] = useState<
    NotificationStack[]
  >([]);
  const alert = useCallback(
    ({ timeout, message, inout = 1000, stackAlerts, ...rest }: AlertContent) => {
      let time = timeout;
      if (!time) {
        const wordCount = getWordCount(message);
        time = (wordCount > 4 ? wordCount : 4) * 1000 + inout * 2;
      }
      const id = uuidv4();
      setAlertContent((prev) => [...((stackAlerts || (stackAlerts === undefined && alertProps?.stackAlerts)) ? prev : []), { ...rest, message, id, timeout: time, inout }]);
      setTimeout(() => {
        setAlertContent((stack) => stack.filter((item) => item.id !== id));
      }, time);
    },
    [alertProps?.stackAlerts]
  );
  const notification = useCallback(
    ({ timeout = 3000, ...rest }: NotificationProps) => {
      const id = uuidv4();
      setNotificationContent(() => [{ ...rest, id }]);
      setTimeout(() => {
        setNotificationContent((stack) =>
          stack.filter((item) => item.id !== id)
        );
      }, timeout);
    },
    []
  );
  const confirm = useCallback((item: ConfirmProperties) => {
    setConfirmation(item);
  }, []);

  return (
    <AlertContext.Provider value={{ confirm, alert, notification }}>
      {children}{" "}
      {alertContent?.length > 0
        ? 
          <Snackbar open anchorOrigin={{ vertical: alertProps?.vertical ?? 'top', horizontal: alertProps?.horizontal ?? 'left'}}>
            <Box>
              {alertContent.map((alert) => (
                <MuiAlert key={alert.id} {...alert} />
              ))}
            </Box>
          </Snackbar>
        : ""}{" "}
      {notificationContent &&
        notificationContent.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}{" "}
      {confirmation && (
        <Confirm
          onClose={() => {
            if (confirmation?.onClose) {
              confirmation?.onClose();
            }
            setConfirmation(null);
          }}
          onSuccess={() => {
            confirmation.onSuccess();
            setConfirmation(null);
          }}
          {...omit(confirmation, ["onClose", "onSuccess"])}
        />
      )}{" "}
    </AlertContext.Provider>
  );
};
