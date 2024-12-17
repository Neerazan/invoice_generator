import Image from 'next/image';
import LogoUpload from '@/components/invoice/LogoUpload';
import InvoiceFromTo from '@/components/invoice/InvoiceFromTo';
import InvoiceInfo from '@/components/invoice/InvoiceInfo';
import InvoiceItemsTable from '@/components/invoice/InvoiceItemsTable';
import InvoiceSummary from '@/components/invoice/InvoiceSummary';
import PaymentDetails from '@/components/invoice/PaymentDetails';
import NotesSection from '@/components/invoice/NotesSection';
import TaxSettings from '@/components/invoice/TaxDiscountSetting';
// Fig Tree Font

export default function Home() {
    return (
        <main className="container mx-auto mt-8 rounded">
            <div className="grid grid-cols-6 p-4 md:p-8 gap-4">
                <div className="col-span-6 md:col-span-4 bg-white rounded-lg p-8 shadow-md">
                    {/* Invoice Title */}
                    <div className="uppercase w-full font-bold text-3xl mb-4 text-gray-600">
                        invoice
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
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <InvoiceFromTo invoiceDestination="Invoice From" invoiceText="Company/Person Information" />
                        <InvoiceFromTo invoiceDestination="Invoice To" invoiceText="Recipient Information" />
                    </div>

                    {/* Invoice Items Table */}
                    <InvoiceItemsTable />

                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <PaymentDetails />
                        <InvoiceSummary />
                    </div>

                    <div className='w-full mt-4'>
                        <NotesSection />
                    </div>
                </div>
                <div className="col-span-6 md:col-span-2 bg-white rounded-lg p-6 shadow-md">
                    <TaxSettings />
                </div>
            </div>
        </main>
    );
}
