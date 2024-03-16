'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { sendTransaction, waitForTransaction } from '@wagmi/core';
import { MoveDownLeft, MoveUpRight, X } from 'lucide-react';
import { useState } from 'react';
import { parseEther } from 'viem';
import { Button } from './ui/button';

const Actions = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    const { hash } = await sendTransaction({
      to: '0x94B2ceA71F9bA7A6e55c40bE320033D1151145B6',
      value: parseEther('0.01'),
    });

    console.log(hash);

    const data = await waitForTransaction({
      hash,
    });

    console.log(data);
  };

  return (
    <>
      <div className="flex justify-between w-full flex-col xs:flex-row gap-4">
        <Button size="lg" className="gap-4" onClick={() => setOpen(!open)}>
          <MoveUpRight className="h-4 w-4" />
          <span className="hidden xss:block">Send</span>
        </Button>

        <Button size="lg" className="gap-4" onClick={() => setOpen(!open)}>
          <MoveDownLeft className="h-4 w-4" />
          <span className="hidden xss:block">Receive</span>
        </Button>
      </div>

      <Drawer open={open}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col justify-center">
            <DrawerTitle>How do you want to proceed?</DrawerTitle>
            <DrawerDescription>
              Select either one of the options below.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col justify-center items-center gap-4 xs:flex-row">
            <Button onClick={onSubmit}>Phone Number</Button>
            <Button onClick={onSubmit}>QR</Button>
            <Button onClick={onSubmit}>Wallet Address</Button>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full	"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Actions;
