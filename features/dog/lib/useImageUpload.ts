import React, { useState, useRef } from "react";

export function useImageUpload(initialImage: string | null = null){
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file){
            setImageFile(file)
            const reader = new FileReader()
            reader.onload =() => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const resetImage = () => {
        setImagePreview(null)
        setImageFile(null)
    }

    return { imagePreview, imageFile, fileInputRef, handleImageChange, resetImage}
}