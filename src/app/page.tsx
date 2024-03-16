'use client';

import Actions from '@/components/actions';
import LoginHeader from '@/components/login-header';
import Transactions from '@/components/transactions';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DynamicUserProfile, useDynamicContext } from '@/lib/dynamic';
import { LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Address, formatUnits } from 'viem';
import { useBalance } from 'wagmi';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [price, setPrice] = useState('0');

  const { primaryWallet, setShowAuthFlow, setShowDynamicUserProfile } =
    useDynamicContext();

  const balance = useBalance({
    address: (primaryWallet?.address || '') as Address,
  });

  const formattedValue = formatUnits(balance.data?.value || BigInt(0), 18);

  const WalletButton = () =>
    primaryWallet?.address ? (
      <Avatar onClick={() => setShowDynamicUserProfile(true)}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/96269716" />
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
      const resPrice = await fetch(
        new URL(
          'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=9DMYEXFSETNIBCGADF3JRXZACKAKX71S44'
        )
      );
      const data = await res.json();
      const priceData = await resPrice.json();
      // const emails = await fetchDynamicApi();

      // console.log(emails);

      setTransactions(data.result);
      setPrice(priceData.result.ethusd.substring(0, 6));
    };

    getTransactions();
  }, [primaryWallet?.address]);

  if (primaryWallet !== null) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-between w-full pt-12 p-10">
        <div className="flex justify-between items-center w-full mb-8">
          <h1>Hey, welcome back 👋</h1>
          <WalletButton />
        </div>

        <div className="flex flex-col items-center text-lg font-medium">
          Your Balance:
          <span className="flex flex-col gap-4">
            {(Number(price) * Number(formattedValue))
              .toString()
              .substring(0, 6)}{' '}
            USD ({formattedValue.toString()} Ξ)
          </span>
        </div>

        <Transactions price={price} transactions={transactions} />

        <Actions />

        <DynamicUserProfile />
      </div>
    );
  } else {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoginHeader />
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>Click to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <WalletButton />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
