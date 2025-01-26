import Button, { ButtonProps } from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import React from 'react';


const StyledDialogBox = styled(Dialog)(({ theme }) => ({
'& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
},
'& .MuiDialogTitle-root': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    padding: '8px 24px',
    borderBottom: `1px solid ${theme.palette.divider}`,
},
'& .MuiDialogContent-root': {
    padding: `${theme.spacing(3)} !important`
},
'& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    justifyContent: 'flex-end',
},
}));


interface ComponentProps {
    dialogProps?: Partial<DialogProps>,
    dialogActionsProps?: Partial<DialogActionsProps>,
    dialogContentProps?: Partial<DialogContentProps>,
    dialogTitleProps?: Partial<DialogTitleProps>
}

export interface MuiConfirmProps {
  title?: string | React.ReactNode,
  message: string | React.ReactNode,
  onClose?: () => void,
  onSuccess?: () => void,
  successButtonProps?: ButtonProps,
  cancelButtonProps?:  ButtonProps,
  successButtonContent?: string | React.ReactNode,
  cancelButtonContent?: string | React.ReactNode,
  hideCancelButton?: boolean,
  hideSuccessButton?: boolean,
  hideTopCloseButton?: boolean,
  customButtons?: ButtonProps[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFooter?: () => React.ReactNode,
  styledDialogComponent?: typeof StyledDialogBox | typeof Dialog,
  componentProps?: ComponentProps
}

export const Confirm = ({
  title,
  message,
  onSuccess,
  onClose = () => {},
  successButtonProps = {},
  cancelButtonProps = {},
  successButtonContent = 'Ok',
  cancelButtonContent = 'Cancel',
  hideCancelButton,
  hideSuccessButton,
  hideTopCloseButton,
  customButtons,
  styledDialogComponent,
  componentProps,
  customFooter,
}: MuiConfirmProps) => {

  const DialogCustom = styledDialogComponent ?? StyledDialogBox;
  return (
      <DialogCustom
        maxWidth='xl'
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        data-testid='confirmation-dialog'
        {...componentProps?.dialogProps}
      >
       {title && ( <DialogTitle id="alert-dialog-title" {...componentProps?.dialogTitleProps}>
            {title}
        </DialogTitle>)}
        <DialogContent  {...componentProps?.dialogContentProps}>
            {hideTopCloseButton ?  '' :(
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 0,
                    color: theme.palette.grey[500],
                })}
                >
                    x
                </IconButton>
            )}
            {message}
        </DialogContent>
        <DialogActions {...componentProps?.dialogActionsProps}>
            {!hideCancelButton && !customFooter ? (
                <Button onClick={onClose} color="secondary" variant='outlined' data-testid={'cancel-button'} {...cancelButtonProps}>
                  {cancelButtonContent}
                </Button>
              ): ''}
              {!hideSuccessButton && !customFooter ? (
                <Button onClick={onSuccess} color="primary" variant='contained' data-testid={'success-button'} autoFocus {...successButtonProps}>
                  {successButtonContent}
                </Button>
              ): ''}
              {customButtons?.map(({ children, ...rest }, index) => 
                <Button color="secondary" variant='outlined'  key={index} {...rest} >{children}</Button>
              )}
              {customFooter?.()}
        </DialogActions>
      </DialogCustom>
  );
}
