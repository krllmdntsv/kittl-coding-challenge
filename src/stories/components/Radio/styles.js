import styled from 'styled-components';

import { theme as defaultTheme } from 'utils/theme';

export const Container = styled.div`
  display: inline-flex;
  flex-direction: ${({ $direction }) => ($direction === 'column' ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Label = styled.label`
  position: relative;
  padding-left: 24px;
  cursor: pointer;
`;

export const Control = styled.input`
  margin: 0 8px 0 0;
  appearance: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme }) => theme.colors.grey300};
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.grey500};
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    cursor: pointer;
  }
  
  &:checked::after {
    transform: scale(1);
  }
`;

Control.defaultProps = {
  theme: defaultTheme,
};
