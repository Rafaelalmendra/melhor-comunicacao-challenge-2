/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { productsSchema, type ProductsSchemaType } from 'schemas';
import type { ProductsType } from 'types';

import {
  Button,
  ColorPickerModal,
  Dialog,
  DialogContent,
  DialogFooter,
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductsSchemaType>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      model: defaultData?.model ?? '',
      brand: defaultData?.brand ?? '',
      price: defaultData?.price ?? '',
      color: defaultData?.color ?? '',
      startSales: defaultData?.startSales ?? '',
      endSales: defaultData?.endSales ?? '',
    },
  });

  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [color, setColor] = useState(defaultData?.color ?? '');

  const handleOpenColorPicker = () => {
    setColorPickerModal(true);
  };

  const handleCloseColorPicker = () => {
    setColorPickerModal(false);
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
    setValue('color', color);
  };

  const onSubmit: SubmitHandler<ProductsSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <>
      {colorPickerModal && (
        <ColorPickerModal
          color={color}
          isOpen={colorPickerModal}
          onClose={handleCloseColorPicker}
          handleChangeColor={handleChangeColor}
        />
      )}

      <Dialog open={isOpen} onOpenChange={onClose} modal>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {defaultData === null ? 'Adicionar produto' : 'Editar produto'}
              </DialogTitle>
            </DialogHeader>

            <div className="w-full flex flex-col gap-3 mt-4">
              <div className="w-full grid grid-cols-2 gap-4">
                <FormInput
                  label="Modelo"
                  placeholder="Modelo do produto"
                  register={register('model')}
                  messageError={errors.model?.message}
                />
                <FormInput
                  label="Marca"
                  placeholder="Marca do produto"
                  messageError={errors.brand?.message}
                  register={register('brand')}
                />

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

                  {errors.color?.message !== undefined && (
                    <p className="text-sm text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>

                <FormInput
                  label="Preço"
                  placeholder="Preço do produto"
                  messageError={errors.price?.message}
                  register={register('price')}
                />

                <FormInput
                  type="date"
                  label="Início das vendas"
                  messageError={errors.startSales?.message}
                  register={register('startSales')}
                />
                <FormInput
                  type="date"
                  label="Fim das vendas"
                  messageError={errors.endSales?.message}
                  register={register('endSales')}
                />
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button className="w-full" variant="outline" onClick={onClose}>
                Voltar
              </Button>
              <Button className="w-full" type="submit">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ProductActionModal };
