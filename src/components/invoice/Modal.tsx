'use client';

import React, { useState, useEffect } from 'react';
import { useRef } from 'react';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

import BankDetails from './BankDetails';
import SenderRecipientDetails from './SenderRecipientDetails';
import SenderRecipentForm from './SenderRecipentForm';
import PaymentForm from './PaymentForm';
import { getButtonText, getStorageData } from '@/lib/helper';
import { PaymentInfo, SenderRecipientInfo } from '@/Types';

type FormType = 'from' | 'recipient' | 'payment';

interface Props {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    modalHeader: string;
    formType: FormType;
    selectedId: string;
    setSelectedId: (value: string) => void;
}

const Modal = ({ modalOpen, setModalOpen, modalHeader, formType, selectedId, setSelectedId }: Props) => {
    const [storageData, setStorageData] = useState<PaymentInfo[] | SenderRecipientInfo[]>([]);

    useEffect(() => {
        if (modalOpen) {
            const data = getStorageData({ formType });
            setStorageData(data);
        }
    }, [modalOpen, formType]);


    const handleDataUpdate = () => {
        const newData = getStorageData({ formType });
        setStorageData(newData);
    };

    const buttonRef = useRef<HTMLButtonElement>(null);

    const renderForm = () => {
        if (formType === 'from' || formType === 'recipient') {
            return (
                <SenderRecipentForm
                    setModalOpen={setModalOpen}
                    onSuccess={handleDataUpdate}
                    formType={formType}
                    buttonRef={buttonRef}
                />
            );
        }
        return (
            <PaymentForm 
                onSuccess={handleDataUpdate} 
                buttonRef={buttonRef} 
            />
        );
    };

    const renderContent = () => {
        if (formType === 'from' || formType === 'recipient') {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {(storageData as SenderRecipientInfo[]).map(
                        (data, index) => (
                            <div key={index} className="col-span-1">
                                <SenderRecipientDetails
                                    data={data}
                                    onClose={() => setModalOpen(false)}
                                    onDelete={handleDataUpdate}
                                    formType={formType}
                                    selectedId={selectedId}
                                    setSelectedId={setSelectedId}
                                />
                            </div>
                        ),
                    )}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 gap-4">
                {(storageData as PaymentInfo[]).map((data, index) => (
                    <div key={index} className="col-span-1">
                        <BankDetails
                            paymentInfo={data}
                            onClose={() => setModalOpen(false)}
                            onDelete={handleDataUpdate}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {modalOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setModalOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] overflow-y-auto overflow-x-hidden max-h-full ${
                    modalOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            >
                <div className="relative w-full max-w-5xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-6 md:p-8 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-2xl font-bold text-gray-600 dark:text-white uppercase">
                                {modalHeader}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setModalOpen(false)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-8 space-y-4">
                            <Collapsible>
                                <CollapsibleTrigger>
                                    <Button
                                        ref={buttonRef}
                                        variant="outline"
                                        className="border-2 border-dashed border-[#90E6C7] bg-[#edfff6] text-gray-500 hover:border-[#4AC49E] hover:text-gray-600 hover:bg-[#D8FAE9] transition-colors duration-200 font-bold rounded-sm"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        {getButtonText({ formType })}
                                    </Button>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="mt-8">
                                    {renderForm()}
                                </CollapsibleContent>
                            </Collapsible>

                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
