import { storageManager } from '@/LocalStorage';
import { SenderRecipientInfo, PaymentInfo } from '@/Types';




export const getButtonText = ({
    formType,
}: {
    formType: FormType;
}) => {
    switch (formType) {
        case 'from':
            return 'Add a Sender';
        case 'recipient':
            return 'Add a Recipient';
        case 'payment':
            return 'Add a Payment';
        default:
            return 'Add';
    }
};



type FormType = 'from' | 'recipient' | 'payment';
interface GetStorageDataParams<T extends FormType> {
    formType: T;
}

type StorageDataReturn<T extends FormType> = T extends 'payment'
    ? PaymentInfo[]
    : T extends 'from' | 'recipient'
    ? SenderRecipientInfo[]
    : never;

export function getStorageData<T extends FormType>(
    params: GetStorageDataParams<T>,
): StorageDataReturn<T> {
    switch (params.formType) {
        case 'from':
            return storageManager.getSenders() as StorageDataReturn<T>;
        case 'recipient':
            return storageManager.getRecipients() as StorageDataReturn<T>;
        case 'payment':
            return storageManager.getPaymentInfo() as StorageDataReturn<T>;
        default:
            throw new Error('Invalid formType');
    }
}
