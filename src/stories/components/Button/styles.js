import styled, { css } from 'styled-components';

import { CaretIcon } from 'components/Icon';
import { theme as defaultTheme } from 'utils/theme';

export const Caret = styled(CaretIcon)`
  color: currentColor;
`;

const getStylesByProps = ({ variant, disabled, theme }) => {
  switch (variant) {
    case 'secondary':
      if (disabled) {
        return css`
          background-color: ${theme.colors.grey200};
          border-color: ${theme.colors.grey500};
          color: ${theme.colors.grey500};
        `;
      }

      return css`
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.primary};
        color: ${theme.colors.primary};

        &:hover {
          background-color: ${theme.colors.secondary};
        }
      `;
    case 'primary':
    default:
      if (disabled) {
        return css`
          background-color: ${theme.colors.grey300};
          border-color: ${theme.colors.grey300};
          color: ${theme.colors.grey500};
        `;
      }

      return css`
        background-color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        
        &:hover {
          background-color: ${theme.colors.primaryHover};
          border-color: ${theme.colors.primaryHover};
        }
      `;
  }
};

export const Button = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0;
  padding: 8px 14px;
  
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  
  border: 1px solid;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  
  ${(props) => getStylesByProps(props)}
  
  svg:not(${Caret}) {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }
  
  ${({ styles }) => styles}
`;

Button.defaultProps = {
  theme: defaultTheme,
};

export const Content = styled.span`
  ${({ hasIcon }) => hasIcon && css`
    margin-left: 8px;
  `}

  ${({ hasCaret }) => hasCaret && css`
    margin-right: 10px;
  `}
`;
