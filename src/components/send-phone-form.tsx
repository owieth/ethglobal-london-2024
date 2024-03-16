import { fetchDynamicApi } from '@/api/service/dynamic';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sendPhoneFormSchema } from '@/schema/send';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendTransaction, waitForTransaction } from '@wagmi/core';
import { useForm } from 'react-hook-form';
import { parseEther } from 'viem';
import { z } from 'zod';

type FormData = z.infer<typeof sendPhoneFormSchema>;

export default function SendPhoneForm() {
  const onSubmit = async (data: FormData) => {
    const validatedFields = sendPhoneFormSchema.safeParse(data);

    if (!validatedFields.success) {
      // TOOD: set toast error
    }

    const wallet = await fetchDynamicApi();

    const { hash } = await sendTransaction({
      to: wallet,
      value: parseEther(data.amount.toString()),
    });

    console.log(hash);

    const transactionConfirmed = await waitForTransaction({
      hash,
    });
    // TODO: set toast success
    console.log(transactionConfirmed);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(sendPhoneFormSchema),
    defaultValues: {
      amount: 0.0,
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="amount"
                      step="0.01"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input id="phone" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
