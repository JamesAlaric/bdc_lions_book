import styled from '@emotion/styled';

export const TestButton = styled.button`
  background-color: #ffc627;
  color: #333;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff7323;
    color: #fafafa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 115, 35, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export function TestEmotionComponent() {
  return (
    <div>
      <h2>Test Emotion CSS-in-JS</h2>
      <TestButton onClick={() => alert('Emotion fonctionne !')}>
        Test Button BDC Colors
      </TestButton>
    </div>
  );
}
