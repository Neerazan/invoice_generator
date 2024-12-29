// localStorage.ts
import { STORAGE_KEYS } from './storageKeys';
import { SenderRecipientInfo, PaymentInfo, InvoiceItem, Invoice } from './Types';

class LocalStorageManager {
    private static instance: LocalStorageManager;

    private constructor() {}

    static getInstance(): LocalStorageManager {
        if (!LocalStorageManager.instance) {
            LocalStorageManager.instance = new LocalStorageManager();
        }
        return LocalStorageManager.instance;
    }

    private getItem<T>(key: string): T[] {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
            return [];
        }
    }

    private setItem<T>(key: string, value: T[]): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    }

    // Sender Methods
    getSenders(): SenderRecipientInfo[] {
        return this.getItem<SenderRecipientInfo>(STORAGE_KEYS.SENDERS);
    }

    addSender(
        sender: Omit<SenderRecipientInfo, 'id' | 'createdAt' | 'updatedAt'>,
    ): SenderRecipientInfo {
        const senders = this.getSenders();
        const newSender: SenderRecipientInfo = {
            id: crypto.randomUUID(),
            ...sender,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.setItem(STORAGE_KEYS.SENDERS, [...senders, newSender]);
        return newSender;
    }

    updateSender(id: string, updates: Partial<SenderRecipientInfo>): SenderRecipientInfo | null {
        const senders = this.getSenders();
        const index = senders.findIndex(sender => sender.id === id);
        if (index === -1) return null;

        const updatedSender: SenderRecipientInfo = {
            ...senders[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        senders[index] = updatedSender;
        this.setItem(STORAGE_KEYS.SENDERS, senders);
        return updatedSender;
    }

    deleteSender(id: string): boolean {
        const senders = this.getSenders();
        const filtered = senders.filter(sender => sender.id !== id);
        if (filtered.length === senders.length) return false;
        this.setItem(STORAGE_KEYS.SENDERS, filtered);
        return true;
    }

    // Similar methods for Recipients
    getRecipients(): SenderRecipientInfo[] {
        return this.getItem<SenderRecipientInfo>(STORAGE_KEYS.RECIPIENTS);
    }

    addRecipient(
        recipient: Omit<SenderRecipientInfo, 'id' | 'createdAt' | 'updatedAt'>,
    ): SenderRecipientInfo {
        const recipients = this.getRecipients();
        const newRecipient: SenderRecipientInfo = {
            id: crypto.randomUUID(),
            ...recipient,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.setItem(STORAGE_KEYS.RECIPIENTS, [...recipients, newRecipient]);
        return newRecipient;
    }

    deleteRecipient(id: string): boolean {
        const recipients = this.getRecipients();
        const filtered = recipients.filter(recipient => recipient.id !== id);
        if (filtered.length === recipients.length) return false;
        this.setItem(STORAGE_KEYS.RECIPIENTS, filtered);
        return true;
    }

    // Payment Info methods
    getPaymentInfo(): PaymentInfo[] {
        return this.getItem<PaymentInfo>(STORAGE_KEYS.PAYMENT_INFO);
    }

    addPaymentInfo(
        paymentInfo: Omit<PaymentInfo, 'id' | 'createdAt' | 'updatedAt'>,
    ): PaymentInfo {
        const paymentInfos = this.getPaymentInfo();
        const newPaymentInfo: PaymentInfo = {
            ...paymentInfo,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.setItem(STORAGE_KEYS.PAYMENT_INFO, [
            ...paymentInfos,
            newPaymentInfo,
        ]);
        return newPaymentInfo;
    }

    deletePaymentInfo(id: string): boolean {
        const paymentInfos = this.getPaymentInfo();
        const filtered = paymentInfos.filter(paymentInfo => paymentInfo.id !== id);
        if (filtered.length === paymentInfos.length) return false;
        this.setItem(STORAGE_KEYS.PAYMENT_INFO, filtered);
        return true;
    }

    // Invoice methods
    getInvoices(): Invoice[] {
        return this.getItem<Invoice>(STORAGE_KEYS.INVOICES);
    }

    addInvoice(
        invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
    ): Invoice {
        const invoices = this.getInvoices();
        const newInvoice: Invoice = {
            ...invoice,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.setItem(STORAGE_KEYS.INVOICES, [...invoices, newInvoice]);
        return newInvoice;
    }

    // Utility methods
    getInvoiceWithDetails(invoiceId: string): {
        invoice: Invoice;
        sender: SenderRecipientInfo;
        recipient: SenderRecipientInfo;
        paymentInfo: PaymentInfo;
    } | null {
        const invoice = this.getInvoices().find(inv => inv.id === invoiceId);
        if (!invoice) return null;

        const sender = this.getSenders().find(s => s.id === invoice.senderId);
        const recipient = this.getRecipients().find(
            r => r.id === invoice.recipientId,
        );
        const paymentInfo = this.getPaymentInfo().find(
            p => p.id === invoice.paymentInfoId,
        );

        if (!sender || !recipient || !paymentInfo) return null;

        return {
            invoice,
            sender,
            recipient,
            paymentInfo,
        };
    }

    // Storage management methods
    clearAllData(): void {
        Object.values(STORAGE_KEYS).forEach(key =>
            localStorage.removeItem(key),
        );
    }

    exportData(): string {
        const data = {
            senders: this.getSenders(),
            recipients: this.getRecipients(),
            paymentInfo: this.getPaymentInfo(),
            invoices: this.getInvoices(),
        };
        return JSON.stringify(data);
    }

    importData(jsonData: string): boolean {
        try {
            const data = JSON.parse(jsonData);
            if (data.senders) this.setItem(STORAGE_KEYS.SENDERS, data.senders);
            if (data.recipients)
                this.setItem(STORAGE_KEYS.RECIPIENTS, data.recipients);
            if (data.paymentInfo)
                this.setItem(STORAGE_KEYS.PAYMENT_INFO, data.paymentInfo);
            if (data.invoices)
                this.setItem(STORAGE_KEYS.INVOICES, data.invoices);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}

export const storageManager = LocalStorageManager.getInstance();
