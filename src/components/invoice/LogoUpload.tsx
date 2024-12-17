"use client"

import { UploadIcon, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function LogoUploadWithPreview() {
    const [isDragging, setIsDragging] = useState(false)
    const [previewSrc, setPreviewSrc] = useState<string | null>(null)

    useEffect(() => {
        const savedLogo = localStorage.getItem("uploadedLogo")
        if (savedLogo) {
            setPreviewSrc(savedLogo)
        }
    }, [])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files)
        }
    }

    const handleFiles = (files: FileList) => {
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64 = e.target?.result as string
                localStorage.setItem("uploadedLogo", base64)
                setPreviewSrc(base64)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {previewSrc ? (
                <Image
                src={previewSrc}
                alt="Uploaded logo"
                className="max-w-full max-h-full object-contain"
                width={400}
                height={400}
            />
            ) : (
                <div
                    className={`
                    flex flex-col items-center justify-center
                    w-full h-auto p-6 mb-4
                    border-2 border-dashed rounded-lg
                    ${
                        isDragging
                            ? "border-blue-500 bg-blue-100"
                            : "border-blue-200 bg-blue-50/30"
                    }
                    hover:border-blue-400 hover:bg-blue-50
                    transition-colors duration-200
                    cursor-pointer
                    group
                `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                        document.getElementById("logo-upload")?.click()
                    }
                >
                    <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <UploadIcon className="w-8 h-8 mb-2 text-blue-300 group-hover:text-blue-500 transition-colors duration-200" />
                    <p className="text-lg font-medium text-blue-300 group-hover:text-blue-500 transition-colors duration-200">
                        Upload Your Logo
                    </p>
                </div>
            )}
            {previewSrc && (
                <div className="text-start mt-5">
                    <button
                        className="flex px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600
                            transition-all duration-300 ease-in-out transform hover:-translate-y-1
                        "
                        onClick={() => {
                            localStorage.removeItem("uploadedLogo")
                            setPreviewSrc(null)
                        }}
                    >
                        Remove Logo{" "}
                        <Trash2 className="w-[18px] h-[18px] ml-2 mt-[3px]" />
                    </button>
                </div>
            )}
        </div>
    )
}
