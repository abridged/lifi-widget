import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { Chain } from '../../../types/types';
import { TransactionStatus, useTransfer } from '../../../hooks/useTransfer';
import React, { ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import { TokenAvatar } from '../../../components/TokenAvatar';
import { useChain } from '../../../hooks';

export interface TransactionDialogProps {
  chain: Chain;
  amount: string;
  toSmartAccount: string;
  quote?: any;
  onError: (error?: string) => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  width: '100%',
  '& .MuiDialog-paper': {
    display: 'flex',
    // width: '600px',
    // minHeight: '400px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 30px 20px 30px',
    backgroundColor: '#111111',
    border: '2px solid #565656',
    margin: '0px',
  },
}));

export default function TransactionDialog({
  chain,
  amount,
  toSmartAccount,
  quote,
  onError,
}: TransactionDialogProps) {
  const { transfer, status, tx, error, isLoading } = useTransfer();
  const { chain: arbChain } = useChain(42161);
  const { chain: chainDetail } = useChain(chain.id);
  let title = 'Bridging Account';
  useEffect(() => {
    transfer(chain, amount, toSmartAccount, quote);
  }, []);

  let content: ReactNode = <></>;
  switch (status) {
    case TransactionStatus.WAITING_TO_SWITCH:
      content = (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Typography>Switch network in your wallet</Typography>
        </Box>
      );
      break;
    case TransactionStatus.WAITING_TO_SIGN:
      content = (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Typography>Sign transaction on your wallet</Typography>
        </Box>
      );
      break;
    case TransactionStatus.WAITING_TO_COMPLETE:
      content = (
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            <TokenAvatar
              // sx={{ width: 64, height: 64 }}
              chain={chainDetail}
              token={chainDetail?.nativeToken}
            />
            <LoadingScreen />
            <TokenAvatar
              // sx={{ width: 64, height: 64 }}
              chain={arbChain}
              token={arbChain?.nativeToken}
            />
          </Box>
          <Typography color={'#AAA'} fontWeight={400} textAlign={'center'}>
            Converting your selections to{' '}
            <Typography color={'#FFF'} fontWeight={700}>
              Arbitrum ETH
            </Typography>{' '}
            and transferring to your Telefrens account
          </Typography>
          <Typography
            color={'#FFF'}
            fontWeight={700}
            fontSize={'20px'}
            textAlign={'center'}
          >
            No need to wait:
          </Typography>
          <Typography color={'#AAA'} fontWeight={400} textAlign={'center'}>
            The bot will message you when this transaction is complete.
          </Typography>
        </Box>
      );
      break;
    case TransactionStatus.COMPLETED:
      title = 'Success!';
      content = (
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            <TokenAvatar
              // sx={{ width: 64, height: 64 }}
              chain={arbChain}
              token={arbChain?.nativeToken}
            />
          </Box>
          <Typography
            color={'#FFF'}
            fontWeight={700}
            fontSize={'20px'}
            textAlign={'center'}
          >
            Arbitrum ETH
          </Typography>
          <Typography color={'#FFF'} fontWeight={700} textAlign={'center'}>
            Balance:
          </Typography>

          <Typography
            color={'#AAA'}
            fontWeight={400}
            textAlign={'center'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            Transfer complete of Arbitrum ETH to your Telefrens account is
            complete!
          </Typography>
        </Box>
      );
      break;
    case TransactionStatus.FAILED:
      onError(error);
      break;
  }
  return (
    <CustomDialog
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle
        sx={{ fontWeight: 700, padding: 0 }}
        id="customized-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}
      >
        <Button
          variant={'contained'}
          color={'warning'}
          style={{
            borderRadius: '24px',
            fontWeight: 700,
            height: '32px',
            padding: '20px',
            width: '240px',
          }}
          onClick={() => {}}
        >
          Return to Telefrens
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

//TODO:
// show a popup to indicate how long this will take
// this is under quote.estimate.executionDuration

// setModalContent(
//   <div>
//     Converting your selections to Arbitrum ETH and transferring to your
//     Telefrens account
//     <a href={`"https://arbiscan.io/tx/${tx}"`} target="_blank">
//       view transaction hash
//     </a>
//     <div>Estimate time: {quote.estimate.executionDuration} seconds</div>
//     <div>
//       No need to wait: The bot will message you when this transaction is
//       complete.
//     </div>
//   </div>,
// );