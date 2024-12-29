'use client'

import React, { useState } from 'react';
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
            rate: 0,
        },
    ]);

    const [fromModalOpen, setFromModalOpen] = useState<boolean>(false);
    const [recipientModalOpen, setRecipientModalOpen] = useState<boolean>(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);


    // useEffect(() => {
    const invoice = InvoiceManager();
    // }, []);

    return (
        <main className="container mx-auto mt-8 rounded relative">
            <div className={`grid grid-cols-6 p-4 md:p-8 gap-4`}>
                <div className="col-span-6 md:col-span-4 bg-white rounded-lg p-8 shadow-md">
                    {/* Invoice Title */}
                    <div className="uppercase w-full font-bold text-3xl mb-4 text-gray-600">
                        Invoice
                        {/* {invoice && <span className="text-sm text-gray-400"> # {invoice.id}</span>} */}
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
                />
            }


            {
                recipientModalOpen && 
                <Modal 
                    modalOpen={recipientModalOpen}
                    setModalOpen={setRecipientModalOpen}
                    modalHeader="Recipient Information"
                    formType='recipient'
                />
            }

            {
                paymentModalOpen && 
                <Modal 
                    modalOpen={paymentModalOpen}
                    setModalOpen={setPaymentModalOpen}
                    modalHeader="Payment Details"
                    formType='payment'
                />
            }
        </main>
    );
};

export default MainPage;
