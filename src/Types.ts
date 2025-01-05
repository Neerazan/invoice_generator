
export interface LineItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
    createdAt: string;
    updatedAt: string;
}


export interface TaxDiscountSettingsProps {
    taxEnabled: boolean;
    setTaxEnabled: (value: boolean) => void;
    
    discountEnabled: boolean;
    setDiscountEnabled: (value: boolean) => void;

    currency: string;
    setCurrency: (value: string) => void;

    taxTitle: string;
    setTaxTitle: (value: string) => void;

    taxRate: number;
    setTaxRate: (value: number) => void;

    discount: number;
    setDiscount: (value: number) => void;

    isPreviewModalOpen: boolean;
    setIsPreviewModalOpen: (value: boolean) => void;
}


export interface InvoiceSummaryProps {
    taxEnabled: boolean;
    discountEnabled: boolean;
    currency: string;
    taxTitle: string;
    taxRate: number;
    discount: number;
    items: LineItem[];
}



export interface SenderRecipientInfo {
    id: string;
    companyName: string;
    taxationNumber: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentInfo {
    id: string;
    paymentMethod?: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankBranch: string;
    swiftCode: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zip: string
    createdAt: string;
    updatedAt: string;
}

export interface Invoice {
    id: string;
    logoUrl: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    currency: string;
    taxEnabled: boolean;
    taxTitle: string;
    taxPercentage: number;
    taxAmount: number;
    discountEnabled: boolean;
    discountPercentage: number;
    discountAmount: number;
    subTotal: number;
    total: number;
    senderId: string;
    recipientId: string;
    paymentInfoId: string;
    items: LineItem[];
    notes?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}