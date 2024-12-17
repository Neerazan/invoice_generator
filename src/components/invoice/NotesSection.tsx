import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function NotesSection() {
    return (
        <div className="w-full max-w-2xl space-y-4 p-4">
            <h2 className="text-lg text-gray-600">Notes:</h2>
            <Card className="bg-slate-50 p-6 cursor-pointer transition-all border-2 border-transparent hover:border-dashed hover:border-blue-400 hover:bg-blue-50 group">
                <div className="flex items-start gap-4">
                    <FileText className="h-8 w-8 text-gray-400 group-hover:text-gray-600" />
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold text-gray-500 group-hover:text-gray-600">
                            Add any additional informations
                        </h3>
                        <p className="text-sm text-gray-500 group-hover:text-gray-600">
                            You can add remarks, terms and conditions and
                            more...
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
