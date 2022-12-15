/* eslint-disable max-len */
import React, { useRef, useState } from 'react';

import parse from 'parse-svg-path';

import { Radio } from 'components/Radio';
import { Slider } from 'components/Slider';

import * as UI from './styles';

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const amplitudeOptions = [2, 3, 4, 5].map((item) => ({ key: item, label: item, value: item }));

export function Arch() {
  const initialPath = useRef();
  const pathRef = useRef();
  const [amplitude, setAmplitude] = useState(2);
  const [direction, setDirection] = useState(0);

  const getPath = (path) => {
    if (!initialPath.current) {
      initialPath.current = path;
    }

    const pathNode = pathRef.current;

    if (pathNode) {
      const parsedPathArr = parse(initialPath.current); // parsing path to split it to simple commands like line, curve etc.
      const { width: pathNodeWidth } = pathNode.getBBox();
      const ratio = 180 / pathNodeWidth; // get width of the path and map it to sin values - we need to have max direction at the center of the path (sin90° = 1) and min direction at the start/end of it (sin°0 = sin180° = 0)

      return parsedPathArr
        .map((item) => {
          const [command, ...coords] = item; // every command starts with its name and other elements are coords

          return [
            command, // copying command as is
            ...coords.map((num, index, arr) => {
              if (index % 2 === 1) { // every even element is y coords, we need to change only them
                const x = arr[index - 1]; // previous element of y coords is x coords
                const degrees = x * ratio; // map x coords to have values between 0 and 180 to use it in sin function
                const radians = degreesToRadians(degrees); // convert degrees to radians (argument of math trigonometry functions)
                const amplitudeValue = amplitude * direction; // value which set bending of the path - large value = more bending and so on
                const delta = amplitudeValue * Math.sin(radians);// calc value to change y coords

                return round(num - delta); // increase/decrease (depends on direction's sign) y coords on the delta value
              }

              // return x coords as is
              return num;
            }),
          ];
        })
        .reduce((acc, item) => acc + item.join(' '), ''); // convert to string (path type)
    }

    return initialPath.current;
  };

  const handleSliderChange = (event) => setDirection(event.target.valueAsNumber);

  return (
    <UI.Container>
      <svg height="200" viewBox="0 -25 400 200" width="400" xmlns="http://www.w3.org/2000/svg">
        {/* eslint-disable-next-line max-len */}
        <path d={getPath('M18.86 42.69C18.86 39.74 21.17 37.43 24.26 37.43C27.07 37.43 29.45 39.23 30.02 42.83C28.73 47.15 29.74 51.62 33.05 53.63C37.01 56.15 43.70 54.14 44.93 49.46L44.57 49.10C42.62 50.10 40.61 50.18 39.02 49.24C36.14 47.44 36.00 42.54 38.66 38.30C39.82 36.50 41.33 35.06 42.91 34.26L42.91 33.69C40.54 33.11 37.80 33.76 35.42 35.42C33.12 32.68 29.30 29.44 23.69 29.44C15.77 29.44 9.72 35.56 9.72 43.55C9.72 64.50 40.10 69.40 40.10 93.81C40.10 103.53 32.54 109.43 24.26 109.43C16.63 109.43 9.72 104.25 9.72 95.54C9.72 87.62 15.12 83.44 19.22 83.44C23.04 83.44 25.56 85.67 25.56 88.91C25.56 92.15 23.83 93.74 20.59 94.46L20.59 94.96C20.66 95.61 21.67 98.06 24.34 98.06C28.01 98.06 32.69 94.96 32.69 88.05C32.69 81.14 26.14 75.38 19.22 75.38C11.74 75.38 1.44 80.85 1.44 94.74C1.44 108.64 10.15 118 23.98 118C39.17 118 49.75 105.83 49.75 92.94C49.75 66.81 18.86 54.71 18.86 42.69ZM63.86 49.10L63.86 49.60C64.58 50.10 65.23 51.54 64.94 52.84L53.86 97.05C53.57 98.13 53.06 98.85 52.49 99.64L52.49 100L63.00 100L63.00 99.50C62.42 98.42 62.06 97.55 62.42 96.26L64.44 88.77L71.50 88.77L73.30 95.90C73.66 97.19 73.30 98.42 72.58 99.50L72.58 100L83.81 100L83.81 99.57C83.09 98.70 82.51 97.55 82.15 96.04L71.50 49.10ZM68.11 71.13L70.27 81.93L65.81 81.93ZM126.36 50.10L126.36 49.60L115.49 49.60L107.50 67.60L98.86 49.60L88.49 49.60L88.49 50.10C89.42 51.54 89.86 52.48 89.86 53.49L89.86 95.61C89.86 96.98 89.28 98.20 88.34 99.50L88.34 100L99.22 100L99.22 99.50C98.42 98.42 97.85 97.34 97.85 95.97L97.85 66.09L107.06 84.30L107.86 84.30L117.00 66.09L117.00 95.61C117.00 96.98 116.57 98.13 115.85 99.50L115.85 100L126.22 100L126.22 99.50C125.42 98.20 125.06 96.83 125.06 95.61L125.06 53.99C125.06 52.62 125.14 51.98 126.36 50.10ZM132.84 49.60L132.84 50.10C133.56 51.47 134.06 52.62 134.06 53.99L134.06 95.61C134.06 96.98 133.56 98.20 132.84 99.50L132.84 100L144.07 100L144.07 99.50C143.14 98.20 142.56 96.98 142.56 95.61L142.56 80.63L145.73 80.63C154.37 80.63 160.13 74.37 160.13 64.86C160.13 55.72 154.87 49.60 146.95 49.60ZM145.66 73.50L142.56 73.50L142.56 56.44L144.22 56.44C148.32 56.44 150.98 59.90 150.98 65.15C150.98 70.19 148.90 73.50 145.66 73.50ZM165.53 49.60L165.53 50.10C166.25 51.40 166.75 52.70 166.75 53.99L166.75 95.61C166.75 96.90 166.25 98.20 165.53 99.50L165.53 100L188.21 100L188.21 89.63L187.92 89.63C185.11 91.65 184.25 92.22 182.88 92.22L175.25 92.22L175.25 53.99C175.25 52.62 175.75 51.47 176.54 50.10L176.54 49.60ZM215.35 58.53L215.64 58.53L215.64 49.60L193.61 49.60L193.61 50.10C194.33 51.40 194.83 52.70 194.83 53.99L194.83 95.61C194.83 96.90 194.33 98.20 193.61 99.50L193.61 100L216.79 100L216.79 90.86L216.50 90.86C214.27 92.08 212.90 92.80 211.46 92.80L203.33 92.80L203.33 75.95L206.64 75.95C207.86 75.95 209.38 76.46 210.89 77.18L211.46 77.18L211.46 67.96L210.89 67.96C209.38 68.68 207.94 69.18 206.64 69.18L203.33 69.18L203.33 56.80L210.24 56.80C211.39 56.80 212.76 57.23 215.35 58.53ZM307.80 29.44L307.30 29.44C306.65 30.66 303.98 33.83 297.58 33.83C285.70 33.83 277.56 30.45 264.02 30.45C249.70 30.45 240.55 40.02 240.55 48.88C240.55 54.50 243.43 57.30 247.03 57.30C250.85 57.30 252.58 55.72 253.73 53.42L253.73 52.62C252.14 52.62 250.49 50.90 250.49 48.88C250.49 45.71 254.59 39.81 263.38 39.81C265.46 39.81 267.55 39.95 269.57 40.10L269.57 108.57C269.57 109.94 268.85 111.45 267.98 112.46L267.98 112.96L280.37 112.96L280.37 112.46C279.50 111.38 278.86 110.08 278.86 108.78L278.86 41.46C284.83 42.47 290.88 43.55 297.58 43.55C306.43 43.55 312.05 36.86 307.80 29.44ZM310.18 58.53L310.46 58.53L310.46 49.60L288.43 49.60L288.43 50.10C289.15 51.40 289.66 52.70 289.66 53.99L289.66 95.61C289.66 96.90 289.15 98.20 288.43 99.50L288.43 100L311.62 100L311.62 90.86L311.33 90.86C309.10 92.08 307.73 92.80 306.29 92.80L298.15 92.80L298.15 75.95L301.46 75.95C302.69 75.95 304.20 76.46 305.71 77.18L306.29 77.18L306.29 67.96L305.71 67.96C304.20 68.68 302.76 69.18 301.46 69.18L298.15 69.18L298.15 56.80L305.06 56.80C306.22 56.80 307.58 57.23 310.18 58.53ZM351.36 50.03L351.36 49.60L339.62 49.60L339.62 50.10C339.91 51.33 340.06 52.41 339.62 53.63L334.51 65.51L329.18 53.42C328.82 52.34 328.90 51.33 329.26 50.10L329.26 49.60L317.59 49.60L317.59 50.10C318.67 51.47 319.25 52.48 319.82 53.78L328.75 73.65L318.31 96.11C317.74 97.26 316.94 98.49 315.94 99.50L315.94 100L328.18 100L328.18 99.50C327.67 98.20 327.60 96.98 328.25 95.61L333.65 82.65L339.48 95.61C340.06 96.90 340.06 98.13 339.70 99.50L339.70 100L351.94 100L351.94 99.57C351 98.56 350.28 97.41 349.70 96.18L339.19 73.65L349.20 53.20C349.70 52.34 350.28 51.33 351.36 50.03ZM375.05 100L375.05 99.50C374.11 98.13 373.46 96.98 373.46 95.61L373.46 57.38L377.28 57.38C378.43 57.38 379.80 57.88 381.74 59.03L382.61 59.61L382.90 59.61L382.90 49.60L355.54 49.60L355.54 59.61L355.82 59.61L356.69 59.03C358.63 57.88 360 57.38 361.15 57.38L364.97 57.38L364.97 95.61C364.97 96.98 364.32 98.13 363.38 99.50L363.38 100Z')} ref={pathRef} />
      </svg>
      <UI.Label>Choose the direction:</UI.Label>
      <Slider max={10} min={-10} value={direction} onChange={handleSliderChange} />
      <UI.Label>Choose an amplitude value:</UI.Label>
      <Radio options={amplitudeOptions} value={amplitude} onChange={setAmplitude} />
    </UI.Container>
  );
}
