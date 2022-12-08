import PropTypes from 'prop-types';
import React from 'react';

import * as UI from './styles';

export function Radio(props) {
  const { options, name, value, onChange, direction } = props;

  return (
    <UI.Container $direction={direction}>
      {options.map((option) => (
        <UI.Label key={option.key}>
          <UI.Control
            checked={option.value === value}
            name={name}
            type="radio"
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </UI.Label>
      ))}
    </UI.Container>
  );
}

const stringNumberPT = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: stringNumberPT,
    label: stringNumberPT,
    value: stringNumberPT,
  })).isRequired,
  value: stringNumberPT.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  direction: 'row',
};
