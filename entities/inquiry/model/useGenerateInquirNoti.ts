import { generateInquirNoti } from "@/entities/inquiry/model";
import { useMutation } from "@tanstack/react-query";

export function useGenerateInquirNoti() {

    return useMutation({
        mutationFn: generateInquirNoti,
    })
}