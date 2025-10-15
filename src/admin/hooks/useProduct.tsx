import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { deleteProductByIdAction } from "../actions/delete-product-by-id.action";

type Options = { enabled?: boolean };

export const useProduct = (id: string, options: Options = {}) => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    enabled: !!id && options.enabled !== false,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const saveMutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });
      queryClient.setQueryData(['products', { id: product.id }], product);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductByIdAction,
    // Optimistic update
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const prevList = queryClient.getQueryData<Product[]>(["products"]);

      // Optimistically remove from list
      queryClient.setQueryData<Product[]>(
        ["products"],
        (old) => (old ? old.filter((p) => p.id !== productId) : old)
      );

      // Drop the detail cache for this item
      queryClient.removeQueries({ queryKey: ["product", { id: productId }], exact: true });

      return { prevList };
    },
    onError: (_err, _productId, context) => {
      if (context?.prevList) {
        queryClient.setQueryData(["products"], context.prevList);
      }
    },
    onSettled: (_data, _err, productId) => {
      // Ensure server truth
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Make sure detail cache is gone
      queryClient.removeQueries({ queryKey: ["product", { id: productId }], exact: true });
    },
  });

  return {
    ...query,
    saveMutation,
    deleteMutation
  }
}
