'use client';

import { Card } from '@/components/ui/card';
import { X, Check, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentInfo } from '@/Types';
import { storageManager } from '@/LocalStorage';
import { useToast } from '../hooks/use-toast';

interface BankDetailsProps {
    paymentInfo?: PaymentInfo;
    onDelete?: () => void;
    onClose?: () => void;
}

export default function BankDetails({
    paymentInfo = {} as PaymentInfo,
    onDelete,
    onClose,
}: BankDetailsProps) {

    const { toast } = useToast();

    const handleDelete = (id: string) => {
        const response = storageManager.deletePaymentInfo(id);
        if (response) {
            toast({
                title: 'Payment info removed',
                description: 'Payment info has been removed successfully',
                variant: 'success',
            });
            onDelete?.();
        } else {
            toast({
                description: 'Failed to remove payment info',
                variant: 'destructive',
            });
        }
    }

    return (
        <Card className="w-full p-6 bg-white shadow-lg relative group">
            {/* Select, Delete, and Edit buttons */}

            <div className="absolute top-[-12px] right-[-12px] space-x-1 w-full text-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Delete button */}
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:text-white bg-red-600 hover:bg-red-600 rounded-full h-auto w-auto p-1 hover:px-4 hover:py-1 group/btn transition-all duration-200"
                    onClick={() => handleDelete(paymentInfo.id)}
                >
                    <X className="h-4 w-4" />
                    <span
                        className="bg-red-600 text-white text-xs 
                        hidden group-hover/btn:block 
                        transition-all duration-500 whitespace-nowrap font-semibold"
                    >
                        Remove
                    </span>
                </Button>

                {/* Select button */}
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:text-white bg-green-600 hover:bg-green-600 rounded-full h-auto w-auto p-1 hover:px-4 hover:py-1 group/btn transition-all duration-200"
                    onClick={onClose}
                >
                    <Check className="h-4 w-4" />
                    <span
                        className="bg-green-600 text-white text-xs 
                        hidden group-hover/btn:block 
                        transition-all duration-500 whitespace-nowrap font-semibold"
                    >
                        Select
                    </span>
                </Button>
            </div>

            {/* Account Details */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Account Name
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.accountName ?? 'N/A'}
                        </p>
                    </div>
                    <div className="relative">
                        <h2 className="text-sm text-gray-500 mb-1">
                            Account Number
                        </h2>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-900">
                                {paymentInfo?.accountNumber ?? 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Bank Name
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.bankName ?? 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Bank Branch
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.bankBranch ?? 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Payment Method
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.paymentMethod ?? 'Bank Transfer'}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Swift Code
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.swiftCode ?? 'N/A'}
                        </p>
                    </div>
                </div>

                {/* <div>
                    <h2 className="text-base font-medium text-gray-900 mb-4">
                        Bank Details
                    </h2>
                </div> */}

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Address</h2>
                        <p className="text-gray-900">
                            {paymentInfo?.address ?? 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Country</h2>
                        <p className="text-gray-900">
                            {paymentInfo?.country ?? 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">City</h2>
                        <p className="text-gray-900">
                            {paymentInfo?.city ?? 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">State</h2>
                        <p className="text-gray-900">
                            {paymentInfo?.state ?? 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Zip/Postal Code
                        </h2>
                        <p className="text-gray-900">
                            {paymentInfo?.zip ?? 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bank Icon */}
            <div className="absolute bottom-4 right-4 text-gray-100">
                <Landmark className="h-24 w-24" />
            </div>
        </Card>
    );
}
