import { Order } from "../../adapters/entities/Order";
import { Product } from "../../adapters/entities/Product";
import { OrderId } from "../../domain/valueObjects/OrderId";
import { ProductId } from "../../domain/valueObjects/ProductId";

export interface OrderRepository {
  create(order: Order): Promise<void>;
  addProduct(
    id: OrderId,
    product: Product,
    isDiscountApplied: boolean,
    price: string,
    version: number
  ): Promise<void>;
  removeProduct(
    id: OrderId,
    productId: ProductId,
    isDiscountApplied: boolean,
    price: string,
    version: number
  ): Promise<void>;
  findById(id: OrderId): Promise<Order>;
  find(): Promise<Order[]>;
}
