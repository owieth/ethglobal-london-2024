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
import { sendWalletFormSchema } from '@/schema/send';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendTransaction, waitForTransaction } from '@wagmi/core';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { parseEther } from 'viem';
import { z } from 'zod';

type FormData = z.infer<typeof sendWalletFormSchema>;

type Props = {
  callback: () => void;
};

export default function SendWalletForm({ callback }: Props) {
  const onSubmit = async (data: FormData) => {
    callback();

    toast.info('Pending...');
    const validatedFields = sendWalletFormSchema.safeParse(data);

    if (!validatedFields.success) {
      // TOOD: set toast error
    }

    const { hash } = await sendTransaction({
      to: data.wallet,
      value: parseEther(data.amount.toString()),
    });

    toast.promise(
      waitForTransaction({
        hash,
      }),
      {
        loading: 'Pending...',
        success: data => {
          return `Transaction finished!`;
        },
        error: 'Error',
      }
    );
  };

  const form = useForm<FormData>({
    resolver: zodResolver(sendWalletFormSchema),
    defaultValues: {
      amount: 0.0,
      wallet: '',
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
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet</FormLabel>
                  <FormControl>
                    <Input id="wallet" className="col-span-3" {...field} />
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
