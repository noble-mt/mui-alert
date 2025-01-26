import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDemo, CustomFooter } from './ConfirmDemo';
import { styled, Dialog } from '@mui/material';



const CustomDialogBox = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid red',
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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Confirm',
  component: ConfirmDemo,
} satisfies Meta<typeof ConfirmDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    config: {
      title: "Confirm",
      message: "Are you absolutely sure you want to permanently delete this user? This action cannot be undone.",
    }
  },
};

export const CustomDialogStyle: Story = {
  args: {
    config: {
      message: "Are you absolutely sure you want to permanently delete this user? This action cannot be undone.",
      componentProps: {
          dialogProps: {
              maxWidth: 'xs',
              fullWidth: true,
          }
      },
      customButtons: [
          {
              children: 'Agree'
          },
          {
              children: 'Not Agree',
              variant: 'contained',
              color: 'primary'
          }
      ],
      hideCancelButton: true,
      hideSuccessButton: true,
      title: 'Confirm',
      onSuccess: () => {},
      styledDialogComponent: CustomDialogBox
    }
  },
};


export const CustomFooterDemo: Story = {
  args: {
    config: {
      message: "Are you absolutely sure ?",
      title: 'Confirm',
      customFooter: CustomFooter
    }
  },
};
