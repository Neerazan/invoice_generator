export interface LineItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
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