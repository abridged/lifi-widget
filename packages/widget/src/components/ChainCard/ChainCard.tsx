import { ChainCardProps } from '../../types/types';
import { BigNumber } from 'ethers';
import {
  AccordionDetails,
  Avatar,
  Box,
  Button,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Accordion, AccordionSummary, ChainContainer } from './ChainCard.style';
import { useState } from 'react';
import { parseEther } from 'viem';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAvailableChains } from '@collabland/lifi-widget';
import { TokenAvatar } from '../TokenAvatar';

export const ChainCard: React.FC<ChainCardProps> = ({
  chain,
  expanded,
  handleExpandChange,
  onSubmit,
}) => {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { chains } = useAvailableChains();
  const validate = (val: string) => {
    if (!val) {
      setError('Required');
      return false;
    }
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) {
      setError('Amount not valid');
      return false;
    }
    if (
      chain.nativeToken.balanceInBigInt &&
      BigNumber.from(chain.nativeToken.balanceInBigInt).lt(parseEther(val))
    ) {
      setError('Not enough balance');
      return false;
    }
    setError(undefined);
    return true;
  };

  const chainDetail = chains?.find((c) => c.id === chain.id);
  return (
    <ChainContainer>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'start'}
        gap={1}
      >
        <Typography
          color={'#AAA'}
          textAlign="right"
          fontSize={18}
          fontStyle={'normal'}
          fontWeight={600}
        >
          Chain:{' '}
        </Typography>
        <Avatar
          sx={{ width: 24, height: 24 }}
          alt={chain.name}
          src={chainDetail?.logoURI}
        />{' '}
        <Typography
          color={'#FFF'}
          fontSize={18}
          fontStyle={'normal'}
          fontWeight={700}
        >
          {chain.name}
        </Typography>
      </Box>
      <Accordion
        expanded={expanded === chain.id}
        onChange={handleExpandChange(chain.id)}
      >
        <AccordionSummary
          aria-controls={`${chain.id}-content`}
          id={`${chain.id}-header`}
        >
          <Box display={'flex'} flexDirection={'column'} width={'100%'}>
            {chain.isRecommended && (
              <Box textAlign={'center'}>
                <Typography
                  color={'#EDC803'}
                  fontSize={18}
                  fontStyle={'normal'}
                  fontWeight={500}
                >
                  RECOMMENDED
                </Typography>
              </Box>
            )}

            <Box
              display={'flex'}
              flexDirection={'row'}
              width={'100%'}
              alignItems={'center'}
              gap={2}
            >
              <TokenAvatar
                chain={chainDetail}
                token={chainDetail?.nativeToken}
              />
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                >
                  <Typography
                    color={'#FFF'}
                    fontSize={16}
                    fontStyle={'normal'}
                    fontWeight={700}
                  >
                    {chain.nativeToken.name}
                  </Typography>
                  {chain.nativeToken.balance && (
                    <Typography
                      color={'#FFF'}
                      fontSize={16}
                      fontStyle={'normal'}
                      fontWeight={700}
                    >
                      {chain.nativeToken.balance.substring(0, 10)}
                    </Typography>
                  )}
                </Box>
                {/*<Typography>{chain.nativeToken.symbol}</Typography>*/}
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display={'flex'} flexDirection={'column'}>
            <Box
              justifyContent={'space-between'}
              display={'flex'}
              flexDirection={'row'}
              width={'100%'}
              alignItems={'center'}
            >
              <OutlinedInput
                value={value}
                style={{
                  borderRadius: '10px',
                  width: '70%',
                  height: '38px',
                  border: '0px',
                  backgroundColor: '#232323',
                }}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (isDirty) {
                    validate(event.target.value);
                  }
                }}
                placeholder="Enter Amount"
              />{' '}
              <LoadingButton
                disabled={!!error}
                loading={loading}
                style={{
                  borderRadius: '24px',
                  fontWeight: 700,
                  height: '32px',
                }}
                onClick={async () => {
                  setIsDirty(true);
                  if (validate(value)) {
                    setLoading(true);
                    await onSubmit(value, chain);
                    setLoading(false);
                  }
                }}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Box>
            {error && (
              <Typography
                color={'#d90606'}
                fontSize={14}
                fontStyle={'normal'}
                fontWeight={500}
              >
                {error}
              </Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </ChainContainer>
  );
};
