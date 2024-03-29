import { z } from 'zod';

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
    .date({ required_error: 'O campo é obrigatório' }),
  endSales: z
    .date({ required_error: 'O campo é obrigatório' })
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;

export { productsSchema };
