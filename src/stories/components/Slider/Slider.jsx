import PropTypes from 'prop-types';
import React from 'react';

import * as UI from './styles';

export function Slider(props) {
  const { min, max, name, value, onChange } = props;

  return (
    <UI.Slider
      max={max}
      min={min}
      name={name}
      type="range"
      value={value}
      onChange={onChange}
    />
  );
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
