'use client'

import React, { useEffect, useState } from 'react';
import LogoUpload from '@/components/invoice/LogoUpload';
import InvoiceFromTo from '@/components/invoice/InvoiceFromTo';
import InvoiceInfo from '@/components/invoice/InvoiceInfo';
import InvoiceItemsTable from '@/components/invoice/InvoiceItemsTable';
import InvoiceSummary from '@/components/invoice/InvoiceSummary';
import PaymentDetails from '@/components/invoice/PaymentDetails';
import NotesSection from '@/components/invoice/NotesSection';
import TaxDiscount from '@/components/invoice/TaxDiscountSetting';
import Modal from './Modal';
import { LineItem, Invoice } from '@/Types';
import { InvoiceManager } from '@/lib/InvoiceManager';
import { useDebounce } from '../hooks/useDebounce';
import { storageManager } from '@/LocalStorage';


const MainPage: React.FC = () => {
    const [currency, setCurrency] = useState<string>('USD-$-227');
    const [taxTitle, setTaxTitle] = useState<string>('Tax');
    const [taxRate, setTaxRate] = useState<number>(10);
    const [discount, setDiscount] = useState<number>(10);
    const [taxEnabled, setTaxEnabled] = useState<boolean>(true);
    const [discountEnabled, setDiscountEnabled] = useState<boolean>(false);
    const [items, setItems] = useState<LineItem[]>([
        {
            id: 1,
            description: '',
            quantity: 1,
            rate: 1,
        },
    ]);
    const [fromModalOpen, setFromModalOpen] = useState<boolean>(false);
    const [recipientModalOpen, setRecipientModalOpen] = useState<boolean>(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
    const [selectedRecipient, setSelectedRecipient] = useState<string>('');
    const [selectedSender, setSelectedSender] = useState<string>('');
    const [selectedPaymentInfo, setSelectedPaymentInfo] = useState<string>('');
    const [curentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
    

    const debouncedItems = useDebounce(items, 500);

    useEffect(() => {
        const invoice = InvoiceManager();
        if (invoice) {
            setCurrentInvoice(invoice);
        }
    }, []);

    useEffect(() => {
        const invoice = InvoiceManager();
        if (invoice) {
            if (curentInvoice) {
                storageManager.updateInvoice(
                    invoice.id,
                    {
                        taxTitle: taxTitle,
                        taxPercentage: taxRate,
                        discountPercentage: discount,
                        taxEnabled: taxEnabled,
                        discountEnabled: discountEnabled,
                        senderId: selectedSender,
                        recipientId: selectedRecipient,
                        paymentInfoId: selectedPaymentInfo
                    }
                )
            }
        }
    }, [debouncedItems, taxTitle, taxRate, discount, taxEnabled, discountEnabled, selectedSender, selectedRecipient, selectedPaymentInfo]);


    return (
        <main className="container mx-auto mt-8 rounded relative">
            <div className={`grid grid-cols-6 p-4 md:p-8 gap-4`}>
                <div className="col-span-6 md:col-span-4 bg-white rounded-lg p-8 shadow-md">
                    {/* Invoice Title */}
                    <div className="uppercase w-full font-bold text-3xl mb-4 text-gray-600">
                        Invoice
                    </div>


                    {/* Logo and Invoice Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full flex items-center">
                            <div className="w-[50%] rounded-md text-gray-600">
                                <LogoUpload />
                            </div>
                        </div>
                        <InvoiceInfo />
                    </div>


                    {/* Invoice From and To */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <InvoiceFromTo
                            invoiceDestination="Invoice From"
                            invoiceText="Company/Person Information"
                            modalOpen={fromModalOpen}
                            setModalOpen={setFromModalOpen}
                        />

                        <InvoiceFromTo
                            invoiceDestination="Invoice To"
                            invoiceText="Recipient Information"
                            modalOpen={recipientModalOpen}
                            setModalOpen={setRecipientModalOpen}
                        />
                    </div>


                    {/* Invoice Items Table */}
                    <InvoiceItemsTable 
                        currency={currency}
                        items={items}
                        setItems={setItems}
                        currentInvoice={curentInvoice}
                    />


                    {/* Payment and Invoice Summary */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <PaymentDetails 
                            modalOpen={paymentModalOpen}
                            setModalOpen={setPaymentModalOpen}
                        />

                        <InvoiceSummary 
                            taxEnabled={taxEnabled}
                            discountEnabled={discountEnabled}
                            currency={currency}
                            taxTitle={taxTitle}
                            taxRate={taxRate}
                            discount={discount}
                            items={items}
                        />
                    </div>

                    {/* Notes Section */}
                    <div className="w-full mt-4">
                        <NotesSection />
                    </div>
                </div>


                {/* Tax and Discount Settings (SIDEBAR) */}
                <div className="col-span-6 md:col-span-2 bg-white rounded-lg p-6 shadow-md">
                    <TaxDiscount
                        taxEnabled={taxEnabled}
                        discountEnabled={discountEnabled}
                        setTaxEnabled={setTaxEnabled}
                        setDiscountEnabled={setDiscountEnabled}
                        currency={currency}
                        taxTitle={taxTitle}
                        taxRate={taxRate}
                        discount={discount}
                        setCurrency={setCurrency}
                        setTaxTitle={setTaxTitle}
                        setTaxRate={setTaxRate}
                        setDiscount={setDiscount}
                    />
                </div>
            </div>

            {
                fromModalOpen && 
                <Modal 
                    modalOpen={fromModalOpen}
                    setModalOpen={setFromModalOpen}
                    modalHeader="Sender Information"
                    formType='from'
                    selectedId={selectedSender}
                    setSelectedId={setSelectedSender}
                />
            }


            {
                recipientModalOpen && 
                <Modal 
                    modalOpen={recipientModalOpen}
                    setModalOpen={setRecipientModalOpen}
                    modalHeader="Recipient Information"
                    formType='recipient'
                    selectedId={selectedRecipient}
                    setSelectedId={setSelectedRecipient}
                />
            }

            {
                paymentModalOpen && 
                <Modal 
                    modalOpen={paymentModalOpen}
                    setModalOpen={setPaymentModalOpen}
                    modalHeader="Payment Details"
                    formType='payment'
                    selectedId={selectedPaymentInfo}
                    setSelectedId={setSelectedPaymentInfo}
                />
            }
        </main>
    );
};

export default MainPage;
