import type { ColumnDef } from '@tanstack/react-table';

import type { ProductsType } from 'types';

import { Button } from 'components';

import { Pencil, Trash } from 'lucide-react';

type useProductsTableColumnProps = {
  handleEdit: (row: ProductsType) => void;
  handleDelete: (row: ProductsType) => void;
};

const useProductsTableColumn = ({
  handleEdit,
  handleDelete,
}: useProductsTableColumnProps) => {
  const productsColumn: Array<ColumnDef<ProductsType>> = [
    {
      accessorKey: 'code',
      header: 'Código',
    },
    {
      accessorKey: 'model',
      header: 'Modelo',
    },
    {
      accessorKey: 'price',
      header: 'Preço',
    },
    {
      accessorKey: 'brand',
      header: 'Marca',
    },
    {
      accessorKey: 'color',
      header: 'Cor',
    },
    {
      accessorKey: 'startSales',
      header: 'Início das vendas',
    },
    {
      accessorKey: 'endSales',
      header: 'Fim das vendas',
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      enableSorting: false,
      meta: {
        width: '100px',
        textAlign: 'center',
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                handleEdit(row.original as ProductsType);
              }}
            >
              <Pencil size={18} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                handleDelete(row.original as ProductsType);
              }}
            >
              <Trash size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  return { productsColumn };
};

export { useProductsTableColumn };
