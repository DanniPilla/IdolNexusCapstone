import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default () => {
  const { width, height } = useWindowSize()
  return (
    <Confetti drawShape={(ctx) => {
    ctx.beginPath();
    for (let t = 0; t < Math.PI * 2; t += 0.01) {
      // Parametric equation for a heart shape
      const x = 16 * Math.sin(t) ** 3;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'red'; // Set the fill color for the hearts
    ctx.fill();
    ctx.closePath();
  }}
      width={width}
      height={height}
    />
  )
}