'use client';

import Actions from '@/components/actions';
import Transactions from '@/components/transactions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DynamicUserProfile, useDynamicContext } from '@/lib/dynamic';
import { LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const { primaryWallet, setShowAuthFlow, setShowDynamicUserProfile } =
    useDynamicContext();

  const WalletButton = () =>
    primaryWallet?.address ? (
      <Avatar onClick={() => setShowDynamicUserProfile(true)}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ) : (
      <Button onClick={() => setShowAuthFlow(true)} className="flex gap-4">
        <LogIn className="h-4 w-4" />
        Get started
      </Button>
    );

  useEffect(() => {
    const getTransactions = async () => {
      if (!primaryWallet?.address) return;

      const res = await fetch(
        new URL(
          `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${primaryWallet.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=9DMYEXFSETNIBCGADF3JRXZACKAKX71S44`
        )
      );
      const data = await res.json();

      setTransactions(data.result);
    };

    getTransactions();
  }, [primaryWallet?.address]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <div className="flex justify-between items-center w-full mb-8">
        <h1>Hey, welcome back 👋</h1>
        <WalletButton />
      </div>

      {/* <BalanaceChart /> */}
      <Transactions transactions={transactions} />

      <Actions />

      <DynamicUserProfile />
    </main>
  );
}
