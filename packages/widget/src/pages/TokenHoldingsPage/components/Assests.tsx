import { Chain } from '../../../types/types';
import React, { useState } from 'react';
import { ChainCard } from '../../../components/ChainCard';
import { Box } from '@mui/material';

export const Assets = ({
  assets,
  onSubmit,
}: {
  assets: Chain[];
  onSubmit: (value: string, chain: Chain) => Promise<void>;
}) => {
  const [expanded, setExpanded] = useState<number | undefined>(42161);
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : undefined);
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
