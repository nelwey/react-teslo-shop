import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const deleteProductByIdAction = async (id: string): Promise<string> => {
  if (!id) throw new Error('Id is required');
  await tesloApi.delete<Product>(`/products/${id}`);
  return id;
} 