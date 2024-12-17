import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export default function PaymentDetails() {
    return (
        <div className="w-full max-w-2xl space-y-2 p-4">
            <h2 className="text-lg text-gray-600">Payment Details:</h2>
            <Card className="bg-slate-50 p-6 cursor-pointer transition-all border-2 border-transparent hover:border-dashed hover:border-blue-400 hover:bg-blue-50 group">
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
            </Card>
        </div>
    );
}
