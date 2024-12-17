import React from "react"

const InvoiceInfo = () => {
    return (
        <div className="p-8 flex flex-col justify-center items-center w-full bg-[#F7FBFF] rounded-md text-gray-600">
            <div className="flex w-full">
                <label htmlFor="" className="w-[35%] font-bold">
                    Invoice No.:{" "}
                </label>
                <input
                    className="w-[65%] hover:bg-blue-50 bg-[#F7FBFF] rounded-sm px-3 py-[2px] focus:outline-none"
                    type="text"
                    placeholder="#INV-123"
                />
            </div>
            <div className="flex w-full">
                <label htmlFor="" className="w-[35%] font-bold">
                    Invoice Date:{" "}
                </label>
                <input
                    className="w-[65%] hover:bg-blue-50 bg-[#F7FBFF] rounded-sm px-3 py-[2px] focus:outline-none"
                    type="text"
                    value={"13/12/2024"}
                />
            </div>
            <div className="flex w-full">
                <label htmlFor="" className="w-[35%] font-bold">
                    Due Date:{" "}
                </label>
                <input
                    className="w-[65%] hover:bg-blue-50 bg-[#F7FBFF] rounded-sm px-3 py-[2px] focus:outline-none"
                    type="text"
                    value={"13/12/2024"}
                />
            </div>
        </div>
    )
}

export default InvoiceInfo
