import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertContext } from '../context.tsx/context';
import { AlertProvider } from '../context.tsx/alertContext';
import { useContext, useState } from 'react';
import { SEVERITY } from '../constants/severity';


export const NotificationDemo = () => {
    return (
        <Box display="flex" width="100hw" height="100vh" alignItems="center" justifyContent="center">
            <AlertProvider notificationGlobalProps={{ horizontal: 'center', vertical: 'bottom'}}>
                <Demo />
            </AlertProvider>
        </Box>
    );
}

const Demo = () => {
    const { notification } = useContext(AlertContext);
    const [count, setCount] = useState<number>(0);
    const [severity, setSeverity] = useState<SEVERITY>('success')
    const show = () => {
        setCount(prev => prev + 1)
        notification({
            message: "Hello there! You are welcome" + count,
        });
    }
    return (
        <>
            <Box minWidth="400px">
                <Typography variant="h3">Settings</Typography>
                <Box display="flex">
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Severity</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={severity}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(_e, value: any) => setSeverity(value)}
                            >
                                <FormControlLabel value={'error'} control={<Radio />} label={'error'} />
                                <FormControlLabel value={'success'} control={<Radio />} label={'success'} />
                                <FormControlLabel value={'info'} control={<Radio />} label={'info'} />
                                <FormControlLabel value={'warning'} control={<Radio />} label={'warning'} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Button variant='contained' onClick={show}>Click Me</Button>
        </>
    )
}