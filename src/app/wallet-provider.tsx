'use client';

import {
  DynamicContextProvider,
  DynamicWagmiConnector,
  EthereumWalletConnectors,
} from '@/lib/dynamic';
import { ReactNode } from 'react';

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: 'd07c0835-0dbd-4bac-a753-38ada5b982a4',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
    </DynamicContextProvider>
  );
}
