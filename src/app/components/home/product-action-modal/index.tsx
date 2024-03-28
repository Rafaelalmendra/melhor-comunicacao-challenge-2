'use client';

import { useState } from 'react';

import type { ProductsType } from 'types';

import {
  Button,
  ColorPickerModal,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FormInput,
  Label,
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
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [color, setColor] = useState(defaultData?.color ?? '');

  const handleOpenColorPicker = () => {
    setColorPickerModal(true);
  };

  const handleCloseColorPicker = () => {
    setColorPickerModal(false);
  };

  console.log('color: ', color);

  return (
    <>
      {colorPickerModal && (
        <ColorPickerModal
          color={color}
          setColor={setColor}
          isOpen={colorPickerModal}
          onClose={handleCloseColorPicker}
        />
      )}

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

              <div className="flex flex-col gap-1">
                <Label>Cor</Label>
                <Button
                  className={`w-full`}
                  style={{
                    background: color !== '' ? color : 'transparent',
                  }}
                  variant="outline"
                  onClick={handleOpenColorPicker}
                >
                  {color !== '' ? 'Alterar cor' : 'Selecionar cor'}
                </Button>
              </div>
              <FormInput label="Preço" placeholder="Preço do produto" />

              <FormInput type="date" label="Início das vendas" />
              <FormInput type="date" label="Fim das vendas" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ProductActionModal };
