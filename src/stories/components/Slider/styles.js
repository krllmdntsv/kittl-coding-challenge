import styled, { css } from 'styled-components';

import { theme as defaultTheme } from 'utils/theme';

const getThumbStyles = css`
  height: 16px;
  width: 16px;
  margin-top: -6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grey500};
  cursor: pointer;
`;

const trackStyles = css`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 2px;
  cursor: pointer;
`;

export const Slider = styled.input`
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
  max-width: 300px;
  
  &::-webkit-slider-thumb {
    ${getThumbStyles};
    -webkit-appearance: none;
  }
  
  &::-webkit-slider-runnable-track {
    ${trackStyles};
  }

  &::-moz-range-thumb {
    ${getThumbStyles};
  }
  
  &::-moz-range-track {
    ${trackStyles};
  }

  &:focus {
    outline: none;
  }
`;

Slider.defaultProps = {
  theme: defaultTheme,
};
