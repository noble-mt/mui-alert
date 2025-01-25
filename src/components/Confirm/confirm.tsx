export interface ConfirmProperties {
    onClose?: () => void,
    onSuccess: () => void,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Confirm = (props: ConfirmProperties) => {
    return 'Confirm'
}