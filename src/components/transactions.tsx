'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { shortenBytes32 } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { formatUnits } from 'viem';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timeStamp: number;
  hash: string;
};

export const getColumns = (price: string): ColumnDef<Transaction>[] => [
  {
    accessorKey: 'from',
    header: 'From',
    cell: ({ row }) => {
      const from = row.original.from;

      return (
        <Link
          href={`https://sepolia.etherscan.io/address/${from}`}
          target="_blank"
        >
          {shortenBytes32(from)}
        </Link>
      );
    },
  },
  {
    accessorKey: 'to',
    header: 'To',
    cell: ({ row }) => {
      const to = row.original.to;

      return (
        <Link
          href={`https://sepolia.etherscan.io/address/${to}`}
          target="_blank"
        >
          {shortenBytes32(to)}
        </Link>
      );
    },
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const value = row.original.value;

      const formattedValue = formatUnits(BigInt(value), 18);

      return (
        <span>
          {Number(price) * Number(formattedValue)} USD (
          {formattedValue.toString()} Ξ)
        </span>
      );
    },
  },
  {
    accessorKey: 'timeStamp',
    header: 'Date',
    cell: ({ row }) => {
      const timeStamp = row.original.timeStamp;

      return <span>{new Date(timeStamp * 1000).toLocaleString()}</span>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const hash = row.original.hash;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
              >
                See Transactions
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type Props = {
  price: string;
  transactions: Transaction[];
};

const Transactions = ({ price, transactions }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: transactions,
    columns: getColumns(price),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
