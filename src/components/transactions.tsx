'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  transactions: {
    blockHash: string;
    from: string;
    to: string;
    timeStamp: number;
    value: number;
  }[];
};

const Transactions = ({ transactions }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{transaction.from}</TableCell>
            <TableCell>{transaction.to}</TableCell>
            <TableCell>{transaction.value}</TableCell>
            <TableCell className="text-right">
              {transaction.timeStamp}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Transactions;
