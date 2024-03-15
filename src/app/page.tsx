import { Button } from '@/components/ui/button';
import { MoveDownLeft, MoveUpRight } from 'lucide-react';

import { DynamicWidget } from '@/lib/dynamic';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <DynamicWidget />

      <div className="flex justify-between w-full flex-col xs:flex-row gap-4">
        <Button size="lg" className="gap-4">
          <MoveUpRight className="h-4 w-4" />
          <span className="hidden xss:block">Send</span>
        </Button>

        <Button size="lg" className="gap-4">
          <MoveDownLeft className="h-4 w-4" />
          <span className="hidden xss:block">Receive</span>
        </Button>
      </div>
    </main>
  );
}
