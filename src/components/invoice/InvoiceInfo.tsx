import React from "react"
import { Input } from "../ui/input"


interface Props {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    setInvoiceNumber: (value: string) => void;
    setInvoiceDate: (value: string) => void;
    setDueDate: (value: string) => void;
}

const InvoiceInfo = ({
    invoiceNumber,
    invoiceDate,
    dueDate,
    setInvoiceNumber,
    setInvoiceDate,
    setDueDate,
} : Props) => {
    return (
        <div className="p-8 flex flex-col justify-center items-center w-full bg-gray-50 rounded-md text-gray-600">
            <div className="flex w-full">
                <label htmlFor="" className="w-[35%] font-bold">
                    Invoice No.:{" "}
                </label>
                <Input
                    className="w-[65%] hover:bg-gray-100 bg-gray-50 rounded-sm px-3 py-[2px] border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#059669]"
                    type="text"
                    placeholder="#INV-123"
                    value = {invoiceNumber}
                    onChange = {(e) => setInvoiceNumber(e.target.value)}
                />
            </div>
            <div className="flex w-full mt-1">
                <label htmlFor="" className="w-[35%] font-bold">
                    Invoice Date:{" "}
                </label>
                <Input
                    className="w-[65%] hover:bg-gray-100 bg-gray-50 rounded-sm px-3 py-[2px] border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#059669]"
                    type="text"
                    value = {invoiceDate}
                    onChange = {(e) => setInvoiceDate(e.target.value)}
                />
            </div>
            <div className="flex w-full mt-1">
                <label htmlFor="" className="w-[35%] font-bold">
                    Due Date:{" "}
                </label>
                <Input
                    className="w-[65%] hover:bg-gray-100 bg-gray-50 rounded-sm px-3 py-[2px] border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#059669]"
                    type="text"
                    value = {dueDate}
                    onChange = {(e) => setDueDate(e.target.value)}
                />
            </div>
        </div>
    )
}

export default InvoiceInfo
