import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertContext } from '../context.tsx/context';
import { AlertProvider } from '../context.tsx/alertContext';
import { useContext, useState } from 'react';
import { SEVERITY } from '../constants/severity';


export const AlertDemo = () => {
    return (
        <Box display="flex" width="100hw" height="100vh" alignItems="center" justifyContent="center">
            <AlertProvider alertProps={{ stackAlerts: true }}>
                <AlertTest />
            </AlertProvider>
        </Box>
    );
}

const AlertTest = () => {
    const { alert } = useContext(AlertContext);
    const [count, setCount] = useState<number>(0);
    const [severity, setSeverity] = useState<SEVERITY>(SEVERITY.SUCCESS)
    const show = () => {
        setCount(prev => prev + 1)
        alert({
            message: "Hello there! You are welcome" + count,
            severity: severity
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
                                <FormControlLabel value={SEVERITY.ERROR} control={<Radio />} label={SEVERITY.ERROR} />
                                <FormControlLabel value={SEVERITY.SUCCESS} control={<Radio />} label={SEVERITY.SUCCESS} />
                                <FormControlLabel value={SEVERITY.INFO} control={<Radio />} label={SEVERITY.INFO} />
                                <FormControlLabel value={SEVERITY.WARNING} control={<Radio />} label={SEVERITY.WARNING} />
                            </RadioGroup>
                            </FormControl>
                    </Box>
                </Box>
            </Box>
            <Button variant='contained' onClick={show}>Click Me</Button>
        </>
    )
}