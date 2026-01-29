import { useServiceWorkerUpdate } from '../hooks/useServiceWorkerUpdate';
import styled from '@emotion/styled';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ffc627 0%, #ff7323 100%);
  color: #fafafa;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 90%;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background: #fafafa;
    color: #ff7323;
    &:hover {
      background: #fff;
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: #fafafa;
    border: 2px solid #fafafa;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

export function UpdateNotification() {
  const { needRefresh, offlineReady, updateNow, dismissUpdate, dismissOfflineReady } = useServiceWorkerUpdate();

  if (offlineReady) {
    return (
      <NotificationContainer>
        <p className="font-semibold">✅ Application prête en mode offline</p>
        <ButtonGroup>
          <Button onClick={dismissOfflineReady}>OK</Button>
        </ButtonGroup>
      </NotificationContainer>
    );
  }

  if (!needRefresh) return null;

  return (
    <NotificationContainer>
      <p className="font-semibold">🎉 Nouvelle version disponible !</p>
      <p className="text-sm mt-1">Mettez à jour pour profiter des dernières fonctionnalités.</p>
      <ButtonGroup>
        <Button primary onClick={updateNow}>
          Mettre à jour maintenant
        </Button>
        <Button onClick={dismissUpdate}>
          Plus tard
        </Button>
      </ButtonGroup>
    </NotificationContainer>
  );
}
