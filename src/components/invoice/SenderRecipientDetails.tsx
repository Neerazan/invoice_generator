'use client';

import { Card } from '@/components/ui/card';

import { X, Check, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SenderRecipientInfo } from '@/Types';

import { storageManager } from '@/LocalStorage';
import { useToast } from '../hooks/use-toast';

interface Props {
    data?: SenderRecipientInfo;
    onDelete?: () => void;
    onClose?: () => void;
    formType: 'from' | 'recipient' | 'payment';
    selectedId: string;
    setSelectedId: (value: string) => void;
}

export default function SenderRecipientDetails({
    data = {} as SenderRecipientInfo,
    onDelete,
    onClose,
    formType,
    selectedId,
    setSelectedId
}: Props) {

    const { toast } = useToast();

    const handleDelete = (id:string) => {
        const response = formType === 'from' ? storageManager.deleteSender(id) : storageManager.deleteRecipient(id);
        if (response) {
            toast({
                title: 'Sender removed successfully',
                variant: 'success'
            });
            onDelete?.();
        } else {
            toast({
                title: `Failed to remove ${formType === 'from' ? 'sender' : 'recipient'}`,
                variant: 'destructive'
            });
        }
    }

    const handleSelect = (id: string) => {
        setSelectedId(id);  
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
                    onClick={() => handleDelete(data.id)}
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
                        onClick={() => handleSelect(data.id)}
                    >
                        Select
                    </span>
                </Button>
            </div>

            {/* Account Details */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-8 z-50">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Company Name
                        </h2>
                        <p className="text-gray-900">
                            {data?.companyName ?? 'N/A'}
                        </p>
                    </div>
                    <div className="relative">
                        <h2 className="text-sm text-gray-500 mb-1">
                            Taxation Number
                        </h2>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-900">
                                {data?.taxationNumber ?? 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Email</h2>
                        <p className="text-gray-900">{data?.email ?? 'N/A'}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Phone</h2>
                        <p className="text-gray-900">{data?.phone ?? 'N/A'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Address</h2>
                        <p className="text-gray-900">
                            {data?.address ?? 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Country</h2>
                        <p className="text-gray-900">
                            {data?.country ?? 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">City</h2>
                        <p className="text-gray-900">{data?.city ?? 'N/A'}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">State</h2>
                        <p className="text-gray-900">{data?.state ?? 'N/A'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">
                            Zip/Postal Code
                        </h2>
                        <p className="text-gray-900">{data?.zip ?? 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Company Icon */}
            <div className="absolute bottom-4 right-4 text-gray-100 z-0">
                <Building2 className="h-24 w-24" />
            </div>
        </Card>
    );
}
