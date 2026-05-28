import { generateInquirNoti } from "@/entities/inquiry/model/generateInquiryNoti";
import { useMutation } from "@tanstack/react-query";

export function useGenerateInquirNoti() {

    return useMutation({
        mutationFn: generateInquirNoti,
    })
}