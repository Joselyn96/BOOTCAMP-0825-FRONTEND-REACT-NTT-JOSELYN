import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const IconContainer = styled.div<{ $variant: 'error' | 'info' }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  background-color: ${({ $variant }) => 
    $variant === 'error' ? '#fee2e2' : '#dbeafe'
  };
`;

const Icon = styled.div<{ $variant: 'error' | 'info' }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $variant }) => 
    $variant === 'error' ? '#ef4444' : '#3b82f6'
  };
  font-size: 14px;
  font-weight: bold;

  &::after {
    content: ${({ $variant }) => 
      $variant === 'error' ? '"✕"' : '"✉"'
    };
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  color: #6b7280;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 120px;

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background-color: #22c55e;
        color: white;
        
        &:hover {
          background-color: #059669;
        }
        
        &:active {
          background-color: #047857;
        }
      `;
    } else {
      return `
        background-color: transparent;
        color: #10b981;
        border: 2px solid #10b981;
        
        &:hover {
          background-color: #f0fdf4;
        }
        
        &:active {
          background-color: #dcfce7;
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SingleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #6b7280;
  }
`;

const ModalStyled = {
  ModalOverlay,
  ModalContent,
  IconContainer,
  Icon,
  Title,
  Description,
  Input,
  ButtonContainer,
  Button,
  SingleButtonContainer,
  CloseButton
};

export default ModalStyled;