import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

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
      cell: ({ row }) => {
        return (
          <div className="w-full flex items-center justify-start">
            <div
              className={`w-6 h-6 rounded`}
              style={{
                background:
                  row.original.color !== ''
                    ? row.original.color
                    : 'transparent',
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'startSales',
      header: 'Início das vendas',
      cell: ({ row }) => {
        return <p>{format(new Date(row.original.startSales), 'dd-MM-yyyy')}</p>;
      },
    },
    {
      accessorKey: 'endSales',
      header: 'Fim das vendas',
      cell: ({ row }) => {
        return <p>{format(new Date(row.original.endSales), 'dd-MM-yyyy')}</p>;
      },
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
                handleEdit(row.original);
              }}
            >
              <Pencil size={18} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                handleDelete(row.original);
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
