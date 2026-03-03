import { useState } from "react";

export function useStoreForm() {
    const [storeData, setStoreData] = useState({
        address: '',
        detailAddress: '',
        zipCode: '',
        businessNumber: ''
    })
}