import { Chain } from '../../../types/types';
import React, { useState } from 'react';
import { ChainCard } from '../../../components/ChainCard';
import { Box } from '@mui/material';
import { useWidgetEvents, WidgetEvent } from '@collabland/lifi-widget';

export const Assets = ({
  assets,
  onSubmit,
}: {
  assets: Chain[];
  onSubmit: (value: string, chain: Chain) => Promise<void>;
}) => {
  const [expanded, setExpanded] = useState<number | undefined>(42161);
  const emitter = useWidgetEvents();
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : undefined);
      const chain = assets.find((asset) => asset.id === panel);
      if (chain) {
        emitter.emit(WidgetEvent.OnChainCardExpanded, {
          chain,
          expanded: newExpanded,
        });
      }
    };
  return assets.map((chain) => (
    <ChainCard
      key={chain.id}
      chain={chain}
      expanded={expanded}
      handleExpandChange={handleChange}
      onSubmit={onSubmit}
    />
  ));
};
