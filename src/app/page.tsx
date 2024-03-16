import Actions from '@/components/actions';
import { Button } from '@/components/ui/button';
import { DynamicWidget } from '@/lib/dynamic';

export default function Home() {
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

      <Actions />
    </main>
  );
}
