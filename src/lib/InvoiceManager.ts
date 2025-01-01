'use client';

import { STORAGE_KEYS } from '@/storageKeys';
import { Invoice } from '@/Types';
import { storageManager } from '@/LocalStorage';
import { useLocalStorage } from '@/components/hooks/useLocalStorage';


export const InvoiceManager = () => {
    // const isLocalStorageAvailable = useLocalStorage();
    if (true) {
        const storedInvoices = localStorage.getItem(STORAGE_KEYS.INVOICES);
        if (storedInvoices) {
            const invoices = JSON.parse(storedInvoices) as Invoice[];
            const invoice = invoices.find(invoice => invoice.isActive === true);
            if (invoice) return invoice;
        } else {
            const newInvoice = storageManager.addInvoice({
                logoUrl: '',
                invoiceNumber: '',
                invoiceDate: '',
                dueDate: '',
                currency: 'USD-$-227',
                taxEnabled: true,
                taxTitle: 'Vat',
                taxPercentage: 13,
                taxAmount: 0,
                discountEnabled: false,
                discountPercentage: 0,
                discountAmount: 0,
                subTotal: 0,
                total: 0,
                senderId: '',
                recipientId: '',
                paymentInfoId: '',
                items: [],
                isActive: true,
            });
            return newInvoice;
        }
    } else {
        return null;
    }
};
