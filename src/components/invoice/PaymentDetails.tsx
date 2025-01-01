import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PaymentInfo } from '@/Types';
import { storageManager } from '@/LocalStorage';

interface Props {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    selectedPaymentInfo: string;
}

export default function PaymentDetails({
    modalOpen,
    setModalOpen,
    selectedPaymentInfo,
}: Props) {
    const [paymentData, setPaymentData] = useState<PaymentInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPaymentData = async () => {
            if (!selectedPaymentInfo) return;

            setIsLoading(true);
            try {
                const data = await storageManager.getIndividualPaymentInfo(
                    selectedPaymentInfo,
                );
                if (data) {
                    setPaymentData(data);
                }
            } catch (error) {
                console.error('Error fetching payment data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentData();
    }, [selectedPaymentInfo]);

    return (
        <div className="w-full max-w-2xl space-y-2 p-4">
            <h2 className="text-lg text-gray-600">Payment Details:</h2>
            <Card
                className="bg-[#edfff6] p-6 cursor-pointer transition-all border-2 border-transparent hover:border-dashed hover:border-[#4AC49E] hover:bg-[#D8FAE9] group"
                onClick={() => setModalOpen(!modalOpen)}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center text-gray-500">
                        Loading...
                    </div>
                ) : paymentData ? (
                    <div className="w-full">
                        <div className="space-y-2">
                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Account Number:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.accountNumber}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Account Name:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.accountName}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Payment Method:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.paymentMethod}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Bank Name:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.bankName}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Branch:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.bankBranch}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Address:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.address}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-600 w-32">
                                    Swift Code:
                                </span>
                                <span className="text-gray-700 ml-2">
                                    {paymentData.swiftCode}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-gray-400 group-hover:text-gray-600" />
                        <div className="space-y-1">
                            <h3 className="text-base text-gray-500 font-semibold group-hover:text-gray-600">
                                Payment Information
                            </h3>
                            <p className="text-sm text-gray-500 font-semibold group-hover:text-gray-600">
                                Add your payment details
                            </p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
