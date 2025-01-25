import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar"
import { ReactNode, useState } from "react";
import Alert, { AlertProps } from '@mui/material/Alert';
import { SEVERITY } from "../../constants/severity";



// import Snackbar from "@mui/material/Snackbar";
export interface MuiAlertProps extends Omit<AlertProps, 'anchorOrigin'> {
    message: ReactNode | string
    inout?: number,
    severity?: SEVERITY,
    variant?: 	'filled' | 'outlined' | 'standard'
}

export const MuiAlert = ({ message, severity = SEVERITY.SUCCESS, variant = 'standard', ...rest }: MuiAlertProps) => {
    const [open, setOpen] = useState<boolean>(false);
    console.log('HErE')
    return (
        <Box my="8px">
            <Alert severity={severity} variant={variant} {...rest} >{message}</Alert>
        </Box>
    );
}