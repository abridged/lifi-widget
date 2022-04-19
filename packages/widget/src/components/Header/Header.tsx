import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { ElementId } from '../../utils/elements';
import { routes } from '../../utils/routes';
import { Container } from './Header.style';
import { NavigationHeader } from './NavigationHeader';
import { WalletHeader } from './WalletHeader';

const stickyHeaderRoutes = [
  routes.selectWallet,
  routes.settings,
  routes.swapRoutes,
];

const HeaderContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <Container
      id={ElementId.Header}
      sticky={stickyHeaderRoutes.includes(pathname)}
    >
      {children}
    </Container>
  );
};

export const Header: FC = () => (
  <HeaderContainer>
    <WalletHeader />
    <NavigationHeader />
  </HeaderContainer>
);
