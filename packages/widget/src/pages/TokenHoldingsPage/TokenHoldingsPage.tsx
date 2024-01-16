import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../../utils';

export const TokenHoldingsPage: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(navigationRoutes.bridgeHome);
  };
  return (
    <div className="">
      <div>Collab.Land checking your holdings</div>
      <button onClick={handleCardClick}>Bridge</button>
    </div>
  );
};
