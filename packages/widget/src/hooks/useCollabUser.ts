import { useEffect, useState } from 'react';
import { getBalance, getUserProfile, getUserSmartAccount } from '../utils/apis';
import { chains } from '../utils/constant';
import { Balance, Chain, EthereumAsset } from '../types/types';
import { formatUnits } from 'viem';
import { useAccount } from '@collabland/lifi-widget';
import useSWR from 'swr';

async function getUserInfo(accountAddress: string) {
  const [userProfile, smartAccountRes] = await Promise.all([
    getUserProfile(),
    getUserSmartAccount(),
  ]);
  const balanceResponse = await getBalance({
    account: accountAddress,
    assets: chains.map((chain) => {
      return {
        chainId: chain.id,
      } as EthereumAsset;
    }),
  });
  return {
    userProfile,
    smartAccountRes,
    balanceResponse,
  };
}

export const useCollabUser = () => {
  const { account } = useAccount();
  const [error, setError] = useState<string | undefined>(undefined);
  const { data } = useSWR(
    `/api/profile/${account.address}`,
    async (): Promise<{
      assets?: Chain[];
      toSmartAccount?: string;
      pkpAddr?: string;
    }> => {
      if (account.address) {
        try {
          const response = await getUserInfo(account.address);
          const { userProfile, smartAccountRes, balanceResponse } = response;
          const cwb: Chain[] = [];
          chains.forEach((chain) => {
            const balanceObj = balanceResponse.balances.find(
              (c: Balance) => c.chainId === chain.id,
            );
            if (balanceObj && balanceObj.balance !== '0') {
              chain.nativeToken.balanceInBigInt = balanceObj.balance;
              chain.nativeToken.balance = formatUnits(
                BigInt(balanceObj.balance),
                18,
              );
              cwb.push(chain);
            }
          });
          return {
            assets: cwb,
            toSmartAccount: smartAccountRes.smartAccount,
            pkpAddr: smartAccountRes.account,
          };
        } catch (e) {
          setError('Session Expired');
          throw e;
        }
      }
      return {
        assets: undefined,
        toSmartAccount: undefined,
        pkpAddr: undefined,
      };
    },
  );
  return {
    account,
    ...data,
    error,
  };
};

// const id = `TEL#USER#${userProfile.id}`;
// TODO: enable mixpanel
// Mixpanel.register({
//   userId: id,
// });
// if (id) {
//   Mixpanel.identify(id);
// }
// Mixpanel.people.union({
//   userInfo: userProfile,
// });

// Mixpanel.people.set({
//   smartAccount: smartAccountRes.account,
// });

// Mixpanel.track('mem_lifi_widget_loaded', {
//   userId: userProfile.id,
//   smartAccount: smartAccountRes.account,
// });
