import styled from "styled-components"

const AlertContainer = styled.div<{ type: 'success' | 'warning' }>`
  background-color: ${props =>
        props.type === 'success' ? '#e6f7ef' : '#fff3cd'
    };
  color: ${props =>
        props.type === 'success' ? '#044b2b' : '#856404'
    };
  border: 1px solid ${props =>
        props.type === 'success' ? '#cbeee0' : '#ffeaa7'
    };
  padding: 12px 16px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  max-width: 300px;
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const AlertStyled = {
    AlertContainer,
}

export default AlertStyled