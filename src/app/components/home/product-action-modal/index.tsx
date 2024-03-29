/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { toast, useLocalStorage } from 'hooks';

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

import { Loader2 } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (defaultData !== null) {
      setStartSalesDate(defaultData.startSales);
      setValue('startSales', new Date(defaultData.startSales));
      setEndSalesDate(defaultData.endSales);
      setValue('endSales', new Date(defaultData.endSales));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

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
    setLoading(true);

    const newProduct: ProductsType = {
      code: crypto.randomUUID(),
      ...data,
      startSales: String(new Date(data.startSales).toISOString().split('T')[0]),
      endSales: String(new Date(data.endSales).toISOString().split('T')[0]),
    };

    if (new Date(endSalesDate) < new Date(startSalesDate)) {
      setLoading(false);
      return toast({
        title: 'Data final não pode ser menor que a data inicial',
        variant: 'destructive',
      });
    }

    if (defaultData === null) {
      if (products === undefined || products.length === 0) {
        setProducts([newProduct]);
      } else {
        const newProducts = [newProduct, ...products];
        setProducts(newProducts);
      }

      toast({
        title: 'Produto adicionado com sucesso ✅',
      });

      return setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1500);
    }

    const newProducts = products.map((product: ProductsType) => {
      if (product.code === defaultData.code) return newProduct;
      return product;
    });

    setProducts(newProducts);
    toast({
      title: 'Produto editado com sucesso ✅',
    });

    return setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
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
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ProductActionModal };
