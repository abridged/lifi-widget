import { useEffect, useState } from 'react';
import { getBalance, getUserProfile, getUserSmartAccount } from '../utils/apis';
import { chains } from '../utils/constant';
import { Balance, Chain, EthereumAsset } from '../types/types';
import { formatUnits } from 'viem';
import { useAccount } from '@collabland/lifi-widget';

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
  const [userId, setUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toSmartAccount, setSmartAccount] = useState<string>();
  const [assets, setAssets] = useState<Chain[] | undefined>(undefined);
  const [pkpAddr, setPkpAddress] = useState<string>();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (account.address) {
      setIsLoading(true);
      getUserInfo(account.address)
        .then((data) => {
          const { userProfile, smartAccountRes, balanceResponse } = data;
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
          setAssets(cwb);
          setUserId(userProfile.id);
          setSmartAccount(smartAccountRes.smartAccount);
          setPkpAddress(smartAccountRes.account);
          setIsLoading(false);
        })
        .catch((e) => {
          setError('Session Expired');
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
    }
  }, [account.address]);
  return {
    account,
    userId,
    isLoading,
    toSmartAccount,
    assets,
    pkpAddr,
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
