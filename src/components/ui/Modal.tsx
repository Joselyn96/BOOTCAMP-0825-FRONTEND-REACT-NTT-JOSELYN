import React, { useState, useEffect } from 'react';
import ModalStyled from './Modal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'error' | 'forgot-password';
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onSend?: (email: string) => void;
  confirmText?: string;
  cancelText?: string;
  sendText?: string;
  isLoading?: boolean;
  errorMessage?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  description,
  onConfirm,
  onCancel,
  onSend,
  confirmText = 'Entendido',
  cancelText = 'Cancelar',
  sendText = 'Enviar',
  isLoading = false,
  errorMessage
}) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSendEmail = () => {
    if (email.trim() && onSend) {
      onSend(email.trim());
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const getIconVariant = () => {
    return type === 'error' ? 'error' : 'info';
  };

  const isEmailValid = email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!isOpen) return null;

  return (
    <ModalStyled.ModalOverlay onClick={handleOverlayClick}>
      <ModalStyled.ModalContent>
        <ModalStyled.CloseButton onClick={onClose}>×</ModalStyled.CloseButton>
        
        <ModalStyled.IconContainer $variant={getIconVariant()}>
          <ModalStyled.Icon $variant={getIconVariant()} />
        </ModalStyled.IconContainer>

        <ModalStyled.Title>{title}</ModalStyled.Title>
        <ModalStyled.Description>{description}</ModalStyled.Description>

        {type === 'forgot-password' && (
          <>
            <ModalStyled.Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {errorMessage && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '14px', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}
          </>
        )}

        {type === 'error' && (
          <ModalStyled.SingleButtonContainer>
            <ModalStyled.Button 
              $variant="primary" 
              onClick={onConfirm || onClose}
              disabled={isLoading}
            >
              {confirmText}
            </ModalStyled.Button>
          </ModalStyled.SingleButtonContainer>
        )}

        {type === 'forgot-password' && (
          <ModalStyled.ButtonContainer>
            <ModalStyled.Button 
              $variant="secondary" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelText}
            </ModalStyled.Button>
            <ModalStyled.Button 
              $variant="primary" 
              onClick={handleSendEmail}
              disabled={!isEmailValid || isLoading}
            >
              {isLoading ? 'Enviando...' : sendText}
            </ModalStyled.Button>
          </ModalStyled.ButtonContainer>
        )}
      </ModalStyled.ModalContent>
    </ModalStyled.ModalOverlay>
  );
};

export default Modal;