import { Product } from "./product.model";

export interface Order {
    _id: string,
    userId: string,
    order_status: string,
    amount: number,
    products: Product[],
    created_at: Date,
    updated_at: Date
}