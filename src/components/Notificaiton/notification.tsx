import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { HORIZONTAL, VERTICAL } from "../../constants/position";
import { NotificationGlobalProps } from "../../context.tsx/alertContext";

export interface MuiNotificationProps extends Omit<SnackbarProps, 'open' |'anchorOrigin'> {
  timeout?: number,
  horizontal?: HORIZONTAL,
  vertical?: VERTICAL,
  globalProps?: NotificationGlobalProps
}

export const Notification = ({ horizontal, vertical, globalProps, ...rest}: MuiNotificationProps) => {
  return (
    <Snackbar open anchorOrigin={{ vertical: vertical ?? globalProps?.vertical ?? 'top', horizontal: horizontal ?? globalProps?.horizontal ?? 'center'  }} { ...rest } />
  );
}