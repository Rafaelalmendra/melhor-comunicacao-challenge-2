/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useLocalStorage } from 'hooks';

import { productsSchema, type ProductsSchemaType } from 'schemas';
import type { ProductsType } from 'types';

import { formatMoney } from 'utils';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useLocalStorage('products', []);

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
    },
  });

  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [color, setColor] = useState(defaultData?.color ?? '');
  const [price, setPrice] = useState(defaultData?.price ?? '');
  const [startSalesDate, setStartSalesDate] = useState('');
  const [endSalesDate, setEndSalesDate] = useState('');

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

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (
      value === '' ||
      value === 'R$' ||
      value === 'R$ ' ||
      value === 'R$ 0,0' ||
      value === undefined
    ) {
      setPrice('');
      setValue('price', '');
      return;
    }

    const newPrice = formatMoney(value);

    setPrice(newPrice);
    setValue('price', newPrice);
  };

  const handleChangeDate = (type: 'initial' | 'final', date: string) => {
    if (type === 'initial') {
      setStartSalesDate(date);
      setValue('startSales', new Date(date));
    } else {
      setEndSalesDate(date);
      setValue('endSales', new Date(date));
    }
  };

  const onSubmit: SubmitHandler<ProductsSchemaType> = (data) => {
    const newProduct: ProductsType = {
      code: crypto.randomUUID(),
      ...data,
      startSales: String(new Date(data.startSales).toISOString().split('T')[0]),
      endSales: String(new Date(data.endSales).toISOString().split('T')[0]),
    };

    console.log(newProduct);
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
                  value={price}
                  messageError={errors.price?.message}
                  onChange={handleChangePrice}
                />

                <FormInput
                  type="date"
                  label="Início das vendas"
                  value={startSalesDate}
                  messageError={errors.startSales?.message}
                  onChange={(e) => {
                    handleChangeDate('initial', e.target.value);
                  }}
                />
                <FormInput
                  type="date"
                  label="Fim das vendas"
                  value={endSalesDate}
                  messageError={errors.endSales?.message}
                  onChange={(e) => {
                    handleChangeDate('final', e.target.value);
                  }}
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
