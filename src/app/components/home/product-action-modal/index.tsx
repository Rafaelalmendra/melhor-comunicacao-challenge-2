import type { ProductsType } from 'types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FormInput,
} from 'components';

type ProductActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultData: ProductsType | null;
};

const ProductActionModal = ({
  isOpen,
  onClose,
  defaultData,
}: ProductActionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultData === null ? 'Adicionar produto' : 'Editar produto'}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="w-full grid grid-cols-2 gap-4">
            <FormInput label="Modelo" placeholder="Modelo do produto" />
            <FormInput label="Marca" placeholder="Marca do produto" />
            <FormInput label="Preço" placeholder="Preço do produto" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ProductActionModal };
