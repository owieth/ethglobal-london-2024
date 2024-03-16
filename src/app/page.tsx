import Actions from '@/components/actions';
import Transactions from '@/components/transactions';
import { Button } from '@/components/ui/button';
import { DynamicWidget } from '@/lib/dynamic';

async function getData() {
  const transactions = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];

  return { transactions };
}

export default async function Home() {
  const { transactions } = await getData();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="absolute top-12 right-12 md:top-24 md:right-24">
        <DynamicWidget
          innerButtonComponent={
            <Button variant="outline" size="icon">
              {/* <LogIn className='h-4 w-4' /> */}
              Get started
            </Button>
          }
        />
      </div>

      {/* <BalanaceChart /> */}
      <Transactions transactions={transactions} />

      <Actions />
    </main>
  );
}
