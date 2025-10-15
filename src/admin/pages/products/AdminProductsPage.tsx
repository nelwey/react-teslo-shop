import { AdminTitle } from "@/admin/components/AdminTitle"
import { ConfirmDeleteModal } from "@/admin/components/ConfirmDeleteModal"
import { useProduct } from "@/admin/hooks/useProduct"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();

  const [pendingId, setPendingId] = useState<string | null>(null);

  const { deleteMutation } = useProduct(pendingId ?? "", { enabled: false });

  const openDelete = (id: string) => setPendingId(id);
  const closeDelete = () => setPendingId(null);

  const onConfirmDelete = () => {
    if (!pendingId) return;
    deleteMutation.mutate(pendingId, {
      onSuccess: () => {
        closeDelete();
      },
      onError: () => {
        // optionally show a toast here
      },
    });
  };


  if (isLoading) {
    return <CustomFullScreenLoading />
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle title="Productos" subtitle="Aqui puedes ver y administrar tus productos" />

        <div className="flex justify-end mb-10 gap-4">
          <Link to={"/admin/products/new"}>
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.images[0]} alt="Product" className="w-20 h-20 object-cover rounded-md" />
              </TableCell>
              <TableCell>

                <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500">
                  {product.title}
                </Link>

              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.gender} </TableCell>
              <TableCell>{product.stock} stock </TableCell>
              <TableCell>{product.sizes.join(', ')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-3">
                  <Link to={`/admin/products/${product.id}`} title="Editar">
                    <PencilIcon className="w-4 h-4 text-blue-500" />
                  </Link>

                  <button
                    title="Eliminar"
                    onClick={() => openDelete(product.id)}
                    className="cursor-pointer p-1 rounded hover:bg-gray-100"
                  >
                    <Trash2Icon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >

      <CustomPagination
        totalPages={data?.pages || 0}
      />
      <ConfirmDeleteModal
        open={!!pendingId}
        onOpenChange={(open) => (open ? null : closeDelete())}
        title="Eliminar producto"
        description="Esta acción no se puede deshacer. ¿Seguro que quieres eliminar este producto?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={deleteMutation?.isPending}
        onConfirm={onConfirmDelete}
      />

    </>
  )
}
