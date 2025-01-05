import { Card } from '@/components/ui/card';
import { Invoice as InvoiceType } from '@/Types';

interface PaymentInfo {
    accountNumber?: string;
    accountName?: string;
    bankDetails?: string;
    accountType?: string;
    currency?: string;
    address?: string;
    swiftCode?: string;
}

interface InvoiceProps {
    companyName?: string;
    registrationNumber?: string;
    panNumber?: string;
    address?: string;
    email?: string;
    phone?: string;
    billedTo?: {
        name?: string;
        registrationNumber?: string;
        panNumber?: string;
        address?: string;
        email?: string;
        phone?: string;
    };
    invoiceNumber?: string;
    invoiceDate?: string;
    dueDate?: string;
    items?: Array<{
        description?: string;
        qty?: number;
        rate?: number;
        amount?: number;
    }>;
    paymentInfo?: PaymentInfo;
    discount?: number;
    tax?: number;
}

export function InvoicePreview({
    companyName = 'Henry and Anderson Associates',
    registrationNumber = 'Norton Hardy Plc',
    panNumber = '537',
    address = '45 First Avenue, Fugit ut exercitati lure asperiores opti, Quia cupidatat neces, 70786 Nepal',
    email = 'gykyna@mailinator.com',
    phone = '+1 (343) 661-1382',
    billedTo = {
        name: 'Norris and Lane Trading',
        registrationNumber: 'Barlow and Long Inc',
        panNumber: '202',
        address:
            '408 First Extension, Facilis excepturi ma Ex sed harum aperiam, Asperiores pariatur, 35797 Nepal',
        email: 'lexa@mailinator.com',
        phone: '+1 (271) 956-5684',
    },
    invoiceNumber = '788',
    invoiceDate = '31/12/2024',
    dueDate = '31/12/2024',
    items = [],
    paymentInfo = {
        accountNumber: '58',
        accountName: 'Maggie Freeman',
        bankDetails: 'Qui non placeat ame',
        accountType: 'Current',
        currency: 'USD ($)',
        address:
            '59 South New Parkway, Quasi aut qui eum lo, Debitis consequun-Uti, Pariatur Rerum omni, 58536, Afghanistan',
        swiftCode: 'Eos quibusdam dolore',
    },
    discount = 0,
    tax = 0,
}: InvoiceProps) {
    const subTotal = items.reduce((acc, item) => acc + item.amount, 0) || 0;
    const total = subTotal - discount + tax;

    return (
        <Card className="w-full max-w-3xl mx-auto p-8 bg-white">
            <div className="flex justify-between mb-8">
                <div className="w-full space-y-5">
                    <div className="grid grid-cols-2">
                        <div className="w-32 h-12 bg-black rounded-lg flex items-center justify-center text-white mb-4">
                            App Store
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm text-gray-600">
                                Invoice Number: {invoiceNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                Invoice Date: {invoiceDate}
                            </p>
                            <p className="text-sm text-gray-600">
                                Due Date: {dueDate}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="col-span-1 space-y-1">
                            <h3 className="text-sm text-gray-600 mb-1">
                                BILLED FROM :
                            </h3>
                            <h2 className="text-xl font-semibold">
                                {companyName}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Registration Number: {registrationNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                PAN/VAT/EIN: {panNumber}
                            </p>
                            <p className="text-sm text-gray-600 max-w-xs mt-2">
                                {address}
                            </p>
                            <p className="text-sm text-gray-600">{email}</p>
                            <p className="text-sm text-gray-600">{phone}</p>
                        </div>

                        <div className="col-span-1 space-y-1 text-right">
                            <h3 className="text-sm text-gray-600 mb-1">
                                BILLED TO :
                            </h3>
                            <h2 className="text-xl font-semibold">
                                {billedTo.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Registration Number:{' '}
                                {billedTo.registrationNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                PAN/VAT/EIN: {billedTo.panNumber}
                            </p>
                            <p className="text-sm text-gray-600 max-w-xs mt-2 ml-auto">
                                {billedTo.address}
                            </p>
                            <p className="text-sm text-gray-600">
                                {billedTo.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                {billedTo.phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {items.length > 0 && (
                <div className="mb-8">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                    Item Description
                                </th>
                                <th className="text-right p-4 text-sm font-semibold text-gray-600">
                                    Qty
                                </th>
                                <th className="text-right p-4 text-sm font-semibold text-gray-600">
                                    Rate
                                </th>
                                <th className="text-right p-4 text-sm font-semibold text-gray-600">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-4 text-sm">
                                        {item.description}
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        {item.qty}
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        ${item.rate.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        ${item.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-semibold mb-4">
                        PAYMENT INFO :
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>Account Number: {paymentInfo.accountNumber}</p>
                        <p>Account Name: {paymentInfo.accountName}</p>
                        <p>Bank Details: {paymentInfo.bankDetails}</p>
                        <p>Account Type: {paymentInfo.accountType}</p>
                        <p>Currency: {paymentInfo.currency}</p>
                        <p>Address: {paymentInfo.address}</p>
                        <p>Swift Code: {paymentInfo.swiftCode}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sub Total</span>
                        <span className="font-semibold">
                            ${subTotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                            Discount (${discount.toFixed(2)})
                        </span>
                        <span className="font-semibold">
                            ${discount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                            Tax (0%)
                        </span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                        <span className="text-sm font-semibold">Total</span>
                        <span className="font-semibold">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default InvoicePreview;
