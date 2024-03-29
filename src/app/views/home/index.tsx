'use client';

import { useEffect, useState } from 'react';

import { useProductsTableColumn } from 'hooks';

import type { ProductsType } from 'types';

import {
  Button,
  DataTable,
  NoDataTable,
  ProductActionModal,
  ProductDeleteModal,
} from 'components';

import { Plus, Smartphone } from 'lucide-react';

const HomeView = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);

  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductsType | null>(
    null,
  );

  useEffect(() => {
    const localProducts = localStorage.getItem('products');
    const items: ProductsType[] =
      localProducts !== null ? JSON.parse(localProducts) : [];

    setProducts(items);
  }, [editProductModal, deleteProductModal, currentProduct]);

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
          {products === undefined || (products.length === 0 && <NoDataTable />)}

          {products !== undefined && products.length > 0 && (
            <DataTable data={products} columns={productsColumn} />
          )}
        </div>
      </div>

      {editProductModal && (
        <ProductActionModal
          isOpen={editProductModal}
          onClose={handleCloseModal}
          defaultData={currentProduct}
        />
      )}

      {deleteProductModal && currentProduct !== null && (
        <ProductDeleteModal
          isOpen={deleteProductModal}
          onClose={handleCloseModal}
          code={currentProduct.code}
        />
      )}
    </>
  );
};

export { HomeView };
