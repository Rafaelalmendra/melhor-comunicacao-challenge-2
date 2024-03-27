'use client';

import { useState } from 'react';

import { useProductsTableColumn } from 'hooks';

import type { ProductsType } from 'types';

import { Button, DataTable } from 'components';

import { Plus, Smartphone } from 'lucide-react';

const HomeView = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

  const handleEditProduct = (row: ProductsType) => {
    console.log(row);
  };

  const handleDeleteProduct = (row: ProductsType) => {
    console.log(row);
  };

  const { productsColumn } = useProductsTableColumn({
    handleDelete: handleDeleteProduct,
    handleEdit: handleEditProduct,
  });

  return (
    <div className="w-full flex flex-col mt-12">
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-3xl font-semibold">Produtos</h1>
        <Button className="flex items-center gap-2 text-base py-6">
          <div className="flex items-center">
            <Plus size={16} />
            <Smartphone size={24} />
          </div>
          ADICIONAR
        </Button>
      </div>

      <div className="w-full">
        <DataTable
          data={[]}
          columns={productsColumn}
          totalPages={totalPages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
};

export { HomeView };
