import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface Props {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}

export default function NotesSection({
    modalOpen,
    setModalOpen
} : Props) {
    return (
        <div className="w-full max-w-2xl space-y-4 p-4">
            <h2 className="text-lg text-gray-600">Notes:</h2>
            <Card className="bg-[#edfff6] p-6 cursor-pointer transition-all border-2 border-transparent hover:border-dashed hover:border-[#4AC49E] hover:bg-[#D8FAE9] group">
                <div 
                    className="flex items-start gap-4"
                    onClick={() => setModalOpen(!modalOpen)}
                >
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
