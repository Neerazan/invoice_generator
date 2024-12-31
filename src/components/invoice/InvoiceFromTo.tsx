import { FileText } from 'lucide-react';

interface Props {
    invoiceDestination: string;
    invoiceText: string;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}

const InvoiceFromTo = ({ 
    invoiceDestination, 
    invoiceText, 
    modalOpen, 
    setModalOpen,
}: Props) => {

    return (
        <>
            <div className="w-full max-w-2xl mx-auto py-4">
                <h2 className="text-lg text-gray-600 mb-2">
                    {invoiceDestination}
                </h2>
                <div 
                    className="bg-[#edfff6] border-2 border-dashed rounded-lg border-transparent hover:bg-[#D8FAE9] hover:border-[#4AC49E] p-4 cursor-pointer group transition-all duration-200"
                    onClick={() => setModalOpen(!modalOpen)}
                >
                    <div 
                        className="flex items-center gap-3"
                    >
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
                </div>
            </div>
        </>
    );
};

export default InvoiceFromTo;
