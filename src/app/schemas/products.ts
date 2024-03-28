import { z } from 'zod';

import { ProductsType } from 'types';

const productsSchema = z.object({
  model: z.string({ required_error: 'O campo é obrigatório' }).min(1, {
    message: 'O campo é obrigatório',
  }),
  brand: z.string({ required_error: 'O campo é obrigatório' }).min(1, {
    message: 'O campo é obrigatório',
  }),
  price: z.string({ required_error: 'O campo é obrigatório' }).min(1, {
    message: 'O campo é obrigatório',
  }),
  color: z.string({ required_error: 'O campo é obrigatório' }).min(1, {
    message: 'O campo é obrigatório',
  }),
  startSales: z
    .date({ required_error: 'O campo é obrigatório' })
    .min(new Date(), { message: 'A data deve ser maior que a data atual' }), // TODO: Fix this validation
  endSales: z
    .date({ required_error: 'O campo é obrigatório' })
    .refine(({ startSales, endSales }) => startSales < endSales, {
      message: 'A data final deve ser maior que a data inicial',
    }), // TODO: Fix this validation
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;

export { productsSchema };
