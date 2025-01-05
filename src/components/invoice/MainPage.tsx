'use client';

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
import NotesModal from './NotesModal';
import InvoicePreview from './InvoicePreview';

const MainPage: React.FC = () => {
    const [currency, setCurrency] = useState<string>('USD-$-227');
    const [taxTitle, setTaxTitle] = useState<string>('Tax');
    const [taxRate, setTaxRate] = useState<number>(10);
    const [discount, setDiscount] = useState<number>(10);
    const [taxEnabled, setTaxEnabled] = useState<boolean>(true);
    const [discountEnabled, setDiscountEnabled] = useState<boolean>(false);
    const [items, setItems] = useState<LineItem[]>([]);
    const [fromModalOpen, setFromModalOpen] = useState<boolean>(false);
    const [recipientModalOpen, setRecipientModalOpen] =
        useState<boolean>(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
    const [selectedRecipient, setSelectedRecipient] = useState<string>('');
    const [selectedSender, setSelectedSender] = useState<string>('');
    const [selectedPaymentInfo, setSelectedPaymentInfo] = useState<string>('');
    const [curentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [invoiceDate, setInvoiceDate] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>('');
    const [isPreviewModalOpen, setIsPreviewModalOpen] =
        useState<boolean>(false);

    const debouncedItems = useDebounce(items, 500);
    const debouncedCurency = useDebounce(currency, 500);
    const debouncedTaxTitle = useDebounce(taxTitle, 500);
    const debouncedTaxRate = useDebounce(taxRate, 500);
    const debouncedDiscount = useDebounce(discount, 500);
    const debouncedTaxEnabled = useDebounce(taxEnabled, 500);
    const debouncedDiscountEnabled = useDebounce(discountEnabled, 500);
    const debouncedSelectedSender = useDebounce(selectedSender, 500);
    const debouncedSelectedRecipient = useDebounce(selectedRecipient, 500);
    const debouncedSelectedPaymentInfo = useDebounce(selectedPaymentInfo, 500);
    const debouncedInvoiceNumber = useDebounce(invoiceNumber, 500);
    const debouncedInvoiceDate = useDebounce(invoiceDate, 500);
    const debouncedDueDate = useDebounce(dueDate, 500);

    useEffect(() => {
        const invoice = InvoiceManager();
        if (invoice) {
            setCurrentInvoice(invoice);
            setItems(invoice.items);
            setCurrency(invoice.currency);
            setTaxTitle(invoice.taxTitle);
            setTaxRate(invoice.taxPercentage);
            setDiscount(invoice.discountPercentage);
            setTaxEnabled(invoice.taxEnabled);
            setDiscountEnabled(invoice.discountEnabled);
            setSelectedSender(invoice.senderId);
            setSelectedRecipient(invoice.recipientId);
            setSelectedPaymentInfo(invoice.paymentInfoId);
            setInvoiceNumber(invoice.invoiceNumber);
            setInvoiceDate(invoice.invoiceDate);
            setDueDate(invoice.dueDate);
        }
    }, []);

    useEffect(() => {
        const invoice = InvoiceManager();
        if (invoice) {
            if (curentInvoice) {
                storageManager.updateInvoice(invoice.id, {
                    taxTitle: taxTitle,
                    taxPercentage: taxRate,
                    discountPercentage: discount,
                    taxEnabled: taxEnabled,
                    discountEnabled: discountEnabled,
                    senderId: selectedSender,
                    recipientId: selectedRecipient,
                    paymentInfoId: selectedPaymentInfo,
                    currency: currency,
                    items: items,
                    invoiceNumber: invoiceNumber,
                    invoiceDate: invoiceDate,
                    dueDate: dueDate,
                });
            }
        }
    }, [
        debouncedItems,
        debouncedCurency,
        debouncedTaxTitle,
        debouncedTaxRate,
        debouncedDiscount,
        debouncedTaxEnabled,
        debouncedDiscountEnabled,
        debouncedSelectedSender,
        debouncedSelectedRecipient,
        debouncedSelectedPaymentInfo,
        curentInvoice,
        selectedSender,
        selectedRecipient,
        selectedPaymentInfo,
        currency,
        taxTitle,
        taxRate,
        discount,
        taxEnabled,
        discountEnabled,
        items,
        invoiceNumber,
        invoiceDate,
        dueDate,
        debouncedInvoiceNumber,
        debouncedInvoiceDate,
        debouncedDueDate,
    ]);

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
                        <InvoiceInfo
                            invoiceNumber={invoiceNumber}
                            invoiceDate={invoiceDate}
                            dueDate={dueDate}
                            setInvoiceNumber={setInvoiceNumber}
                            setInvoiceDate={setInvoiceDate}
                            setDueDate={setDueDate}
                        />
                    </div>

                    {/* Invoice From and To */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <InvoiceFromTo
                            invoiceDestination="Invoice From"
                            invoiceText="Company/Person Information"
                            modalOpen={fromModalOpen}
                            setModalOpen={setFromModalOpen}
                            selectedUser={selectedSender}
                        />

                        <InvoiceFromTo
                            invoiceDestination="Invoice To"
                            invoiceText="Recipient Information"
                            modalOpen={recipientModalOpen}
                            setModalOpen={setRecipientModalOpen}
                            selectedUser={selectedRecipient}
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
                            selectedPaymentInfo={selectedPaymentInfo}
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
                        <NotesSection
                            modalOpen={isNotesModalOpen}
                            setModalOpen={setIsNotesModalOpen}
                        />
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
                        isPreviewModalOpen={isPreviewModalOpen}
                        setIsPreviewModalOpen={setIsPreviewModalOpen}
                    />
                </div>
            </div>

            {fromModalOpen && (
                <Modal
                    modalOpen={fromModalOpen}
                    setModalOpen={setFromModalOpen}
                    modalHeader="Sender Information"
                    formType="from"
                    selectedId={selectedSender}
                    setSelectedId={setSelectedSender}
                />
            )}

            {recipientModalOpen && (
                <Modal
                    modalOpen={recipientModalOpen}
                    setModalOpen={setRecipientModalOpen}
                    modalHeader="Recipient Information"
                    formType="recipient"
                    selectedId={selectedRecipient}
                    setSelectedId={setSelectedRecipient}
                />
            )}

            {paymentModalOpen && (
                <Modal
                    modalOpen={paymentModalOpen}
                    setModalOpen={setPaymentModalOpen}
                    modalHeader="Payment Details"
                    formType="payment"
                    selectedId={selectedPaymentInfo}
                    setSelectedId={setSelectedPaymentInfo}
                />
            )}

            {isNotesModalOpen && (
                <NotesModal
                    modalOpen={isNotesModalOpen}
                    setModalOpen={setIsNotesModalOpen}
                    notes={notes}
                    setNotes={setNotes}
                />
            )}

            {isPreviewModalOpen && (
                // backdrop black filer whole screen
                <>
                    <div
                        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-700 ease-in-out ${
                            isPreviewModalOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => setIsPreviewModalOpen(!isPreviewModalOpen)}
                    ></div>

                    <div
                        className={`fixed inset-y-0 left-0 w-2/5 bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-50 ${
                            isPreviewModalOpen
                                ? 'translate-x-0'
                                : '-translate-x-full'
                        }`}
                    >
                        <div className="p-4 h-full overflow-auto">
                            <InvoicePreview />
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default MainPage;
