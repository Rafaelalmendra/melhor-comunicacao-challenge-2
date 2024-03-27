'use client';

import { useState } from 'react';

import { useProductsTableColumn } from 'hooks';

import type { ProductsType } from 'types';

import { Button, DataTable, ProductActionModal } from 'components';

import { Plus, Smartphone } from 'lucide-react';

const HomeView = () => {
  const [editProductModal, setEditProductModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductsType | null>(
    null,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

  const handleAddProduct = () => {
    setEditProductModal(true);
  };

  const handleEditProduct = (row: ProductsType) => {
    setEditProductModal(true);
    setCurrentProduct(row);
  };

  const handleDeleteProduct = (row: ProductsType) => {
    setDeleteProductModal(true);
    setCurrentProduct(row);
  };

  const handleCloseModal = () => {
    setCurrentProduct(null);
    setEditProductModal(false);
    setDeleteProductModal(false);
  };

  const { productsColumn } = useProductsTableColumn({
    handleDelete: handleDeleteProduct,
    handleEdit: handleEditProduct,
  });

  return (
    <>
      <div className="w-full flex flex-col mt-12">
        <div className="w-full flex items-center justify-between mb-5">
          <h1 className="text-3xl font-semibold">Produtos</h1>
          <Button
            className="flex items-center gap-2 text-base py-6"
            onClick={handleAddProduct}
          >
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

      {editProductModal && (
        <ProductActionModal
          isOpen={editProductModal}
          onClose={handleCloseModal}
          defaultData={currentProduct}
        />
      )}
    </>
  );
};

export { HomeView };
