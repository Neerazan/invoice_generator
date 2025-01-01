'use client';

import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SenderRecipientInfo } from '@/Types';
import { storageManager } from '@/LocalStorage';

interface Props {
    invoiceDestination: string;
    invoiceText: string;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    selectedUser: string;
}

const InvoiceFromTo = ({
    invoiceDestination,
    invoiceText,
    modalOpen,
    setModalOpen,
    selectedUser,
}: Props) => {
    const [item, setItem] = useState<SenderRecipientInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!selectedUser) return;

            setIsLoading(true);
            try {
                let data;
                if (invoiceDestination === 'Invoice From') {
                    data = await storageManager.getIndividualSender(
                        selectedUser,
                    );
                } else if (invoiceDestination === 'Invoice To') {
                    data = await storageManager.getIndividualRecipient(
                        selectedUser,
                    );
                }

                // Changed this part to handle the data correctly
                if (data && Array.isArray(data) && data.length > 0) {
                    setItem(data[0]); // Take the first item if it's an array
                } else if (data && !Array.isArray(data)) {
                    setItem(data); // If it's already a single object
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [selectedUser, invoiceDestination]);

    return (
        <div className="w-full max-w-2xl mx-auto py-4">
            <h2 className="text-lg text-gray-600 mb-2">{invoiceDestination}</h2>
            <div
                className="bg-[#edfff6] border-2 border-dashed rounded-lg border-transparent hover:bg-[#D8FAE9] hover:border-[#4AC49E] p-4 cursor-pointer group transition-all duration-200"
                onClick={() => setModalOpen(!modalOpen)}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : item ? (
                    <div className="w-full space-y-1">
                        {item.companyName && (
                            <div className="text-gray-700 font-bold text-xl">
                                {item.companyName}
                            </div>
                        )}

                        {item.taxationNumber &&(
                            <div className='text-gray-700'>
                                Taxation Number: {item.taxationNumber}
                            </div>
                        )}

                        {item.address && (
                            <div className="text-gray-600">{item.address}</div>
                        )}

                        {item.city && (
                            <div className="text-gray-600">{item.city}, {item.state}</div>
                        )}

                        {item.zip && (
                            <div className="text-gray-600">{item.zip}</div>
                        )}
                        {item.country && (
                            <div className="text-gray-600">{item.country}</div>
                        )}
                        {item.email && (
                            <div className="text-gray-600">{item.email}</div>
                        )}
                        {item.phone && (
                            <div className="text-gray-600">{item.phone}</div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="text-gray-400 group-hover:text-gray-500">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600 group-hover:text-gray-700 font-medium">
                                {invoiceText}
                            </h3>
                            <p className="text-gray-500 group-hover:text-gray-600">
                                Add your details
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoiceFromTo;
