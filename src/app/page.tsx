import Actions from '@/components/actions';
import BalanaceChart from '@/components/balance-chart';
import { DynamicWidget } from '@/lib/dynamic';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <DynamicWidget />

      <BalanaceChart />

      <Actions />
    </main>
  );
}
