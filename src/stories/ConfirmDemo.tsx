import { Alert, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertContext } from '../context.tsx/context';
import { AlertProvider } from '../context.tsx/alertContext';
import { useContext } from 'react';
import { MuiConfirmProps } from '../components/Confirm/confirm';


export const ConfirmDemo = ({ config }: { config: MuiConfirmProps}) => {
    return (
        <Box display="flex" width="100hw" height="100vh" alignItems="center" justifyContent="center">
            <AlertProvider notificationGlobalProps={{ horizontal: 'center', vertical: 'bottom'}}>
                <Demo config={config} />
            </AlertProvider>
        </Box>
    );
}


export const CustomFooter = () => {
    return (
        <Box display="flex" width="100%" justifyContent="center">
            <Alert severity='success' variant='outlined'>Custom Footer</Alert>
        </Box>
    )
}

const Demo = ({ config }: { config: MuiConfirmProps}) => {
    const { confirm } = useContext(AlertContext);
    const show = () => {
        confirm({
            ...config,
        });
    }
    console.log('here')
    return (
        <>
            <Button variant='contained' onClick={show}>Click Me</Button>
        </>
    )
}