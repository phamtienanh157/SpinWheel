import './App.css';
import { useEffect, useState } from 'react';

const list = Array(52)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100));

list[Math.floor(Math.random() * list.length)] = 101;

function App() {
  const [radius] = useState(130);
  const [rotate, setRotate] = useState(0);
  const [easeOut, setEaseOut] = useState(4);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let numOptions = list.length;
    let arcSize = (2 * Math.PI) / numOptions;

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = list[i];
      renderSector(i + 1, text, angle, arcSize, getColor());
      angle += arcSize;
    }
  }, []);

  const renderSector = (index, text, start, arc, color) => {
    // create canvas arc for each list element
    let canvas = document.getElementById('wheel');
    let ctx = canvas.getContext('2d');
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let wheelRadius = radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 2.3333;
    let textRadius = baseSize - 70;

    ctx.beginPath();
    ctx.arc(x, y, wheelRadius, startAngle, endAngle, false);
    ctx.lineWidth = wheelRadius * 2;
    ctx.strokeStyle = color;

    ctx.font = '17px Arial';
    ctx.fillStyle = 'black';
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const getColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  };

  const getRndInteger = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const spin = () => {
    // start position
    const startPos = 38;

    const key = list.findIndex((item) => item === 101);
    let distance = 0;
    if (key < startPos) {
      distance = startPos - key;
    } else {
      distance = list.length - startPos - key;
    }

    let randomSpin = (180 * distance * 2) / list.length;

    setRotate(randomSpin + 360 * 3 + getRndInteger(0, 360 / list.length));
    setEaseOut(4);

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      getResult(randomSpin);
    }, 4000);
  };

  const getResult = () => {
    setResult(101);
  };

  const reset = () => {
    setRotate(0);
    setEaseOut(0);
  };

  return (
    <div className='App'>
      <div className='wrapper'>
        <span id='selector'>&#9660;</span>
        <canvas
          id='wheel'
          width='600'
          height='600'
          style={{
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
            // transitionTimingFunction: 'cubic-bezier(1, 8, 1, 0.1)',
          }}
        />
      </div>
      <button type='button' id='spin' onClick={spin}>
        spin
      </button>
      <button type='button' onClick={reset}>
        reset
      </button>
      <div className='display'>
        <span id='readout'>
          YOU WON:{'  '}
          <span id='result'>{result}</span>
        </span>
      </div>
    </div>
  );
}

export default App;
