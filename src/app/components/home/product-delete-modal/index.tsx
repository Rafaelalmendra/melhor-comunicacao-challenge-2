/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';

import { toast, useLocalStorage } from 'hooks';

import type { ProductsType } from 'types';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components';

import { Loader2 } from 'lucide-react';

type ProductDeleteModalProps = {
  code: string;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDeleteModal = ({
  code,
  isOpen,
  onClose,
}: ProductDeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useLocalStorage('products', []);

  const handleDeleteProduct = () => {
    setLoading(true);

    const newProducts = products.filter(
      (product: ProductsType) => product.code !== code,
    );

    setProducts(newProducts);

    toast({
      title: 'Produto deletado com sucesso! ✅',
    });
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar produto</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-3 mt-4">
          <p className="text-slate-700">
            Tem certeza que deseja deletar o produto com o código: {code}?
          </p>
        </div>

        <DialogFooter className="mt-8">
          <Button className="w-full" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            disabled={loading}
            onClick={handleDeleteProduct}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Confirmar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ProductDeleteModal };
