import * as z from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const sendWalletFormSchema = z.object({
  amount: z.coerce
    .number()
    .refine(num => num >= 0, 'Please provide a valid number'),
  wallet: z.string().min(1, { message: 'Please provide a valid address' }),
});

export const sendPhoneFormSchema = z.object({
  amount: z.coerce
    .number()
    .refine(num => num >= 0, 'Please provide a valid number'),
  phone: z.string().regex(phoneRegex, 'Please provide a valid phone number'),
});
