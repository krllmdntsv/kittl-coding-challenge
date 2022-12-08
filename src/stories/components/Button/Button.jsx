import PropTypes from 'prop-types';
import React from 'react';

import * as UI from './styles';

export function Button(props) {
  const {
    children,
    icon,
    disabled,
    variant,
    caret,
    htmlType,
    onClick,
    styles,
  } = props;

  return (
    <UI.Button disabled={disabled} styles={styles} type={htmlType} variant={variant} onClick={onClick}>
      {icon}
      <UI.Content hasCaret={caret} hasIcon={Boolean(icon)}>{children}</UI.Content>
      {caret && <UI.Caret />}
    </UI.Button>
  );
}

Button.propTypes = {
  /**
   * If the button shows a caret to its right, or not.
   */
  caret: PropTypes.bool,
  /**
   * The text displayed on the button
   */
  children: PropTypes.string,
  /**
   * If the button is disabled (default: false)
   */
  disabled: PropTypes.bool,
  /**
   * Html type of the button
   */
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Some buttons have an icon
   */
  icon: PropTypes.node,
  /**
   * Additional styles
   */
  styles: PropTypes.arrayOf(PropTypes.string),
  /**
   * Visual variant
   */
  variant: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Handler for click event
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Button',
  disabled: false,
  htmlType: 'button',
};
