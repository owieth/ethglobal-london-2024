'use client';

import { Icons } from '@/components/icons';
import SendPhoneForm from '@/components/send-phone-form';
import SendWalletForm from '@/components/send-wallet-form';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Actions = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<'phonenumber' | 'qr' | 'wallet'>(
    'phonenumber'
  );
  const { primaryWallet } = useDynamicContext();

  const renderAction = () => {
    switch (value) {
      case 'phonenumber':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Phone Number</CardTitle>
              <CardDescription>Change your password here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SendPhoneForm />
            </CardContent>
          </Card>
        );

      case 'qr':
        return (
          <Card>
            <CardHeader>
              <CardTitle>QR</CardTitle>
              <CardDescription>Change your password here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-center">
              <QRCodeSVG value={primaryWallet?.address || ''} size={256} />
            </CardContent>
          </Card>
        );

      case 'wallet':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Paste the wallet to send funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SendWalletForm callback={() => setOpen(false)} />
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <Button size="lg" className="gap-4" onClick={() => setOpen(!open)}>
          <Icons.handCoins className="w-4 h-4" />
          <span className="hidden xss:block">Pay</span>
        </Button>
      </div>

      <Drawer open={open}>
        <DrawerContent>
          <div>
            <DrawerHeader className="flex flex-col justify-center items-center m-6">
              <DrawerTitle>How do you want to proceed?</DrawerTitle>
              <DrawerDescription>
                Select either one of the options below.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col justify-center items-center gap-4 xs:flex-row">
              <Tabs
                defaultValue="phonenumber"
                onValueChange={val => setValue(val as any)}
                className="w-[600px] hidden xs:block"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="phonenumber">Phone Number</TabsTrigger>
                  <TabsTrigger value="qr">QR</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                </TabsList>
                <TabsContent value="phonenumber">{renderAction()}</TabsContent>
                <TabsContent value="qr">{renderAction()}</TabsContent>
                <TabsContent value="wallet">{renderAction()}</TabsContent>
              </Tabs>

              <div className="block xs:hidden">
                <Select onValueChange={val => setValue(val as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="phonenumber">Phone Number</SelectItem>
                      <SelectItem value="qr">QR</SelectItem>
                      <SelectItem value="wallet">wallet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {renderAction()}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full	"
                  onClick={() => setOpen(false)}
                >
                  <Icons.x className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Actions;
