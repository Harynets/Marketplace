interface ProductInterface {
    id: number;
    name: string;
    price: string;
    discount?: number;
    specifications: Record<string, string>;
    description: string;
    quantity_in_stock: number;
    is_available: boolean;
    seller: string;
    category: number;
    images: ProductImageInterface[];
    reviews: ReviewInterface[];
}
