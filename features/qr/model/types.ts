import { ProductWithCategory } from "@/features/owner/my-store/product/model/types";

export interface QrModalProps {
    products: ProductWithCategory[]
    isPending: boolean
    open: boolean;
    qrValue: string;
    selectedProductId: string | null;
    onClose: () => void;
    onSelectProduct: (product: string | null) => void
}
