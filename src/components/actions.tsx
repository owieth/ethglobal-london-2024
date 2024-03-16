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
import { MoveDownLeft, MoveUpRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const Actions = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = () => {};

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
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onSubmit}>Submit</Button>
            <DrawerClose>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Actions;
