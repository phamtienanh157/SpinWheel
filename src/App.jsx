import './App.css';
import { useEffect, useState } from 'react';

const list = Array(21)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100));

console.log('🚀 ~ file: App.jsx ~ line 6 ~ list', list);

list[Math.floor(Math.random() * list.length)] = 101;

function App() {
  const [radius] = useState(75);
  const [rotate, setRotate] = useState(0);
  const [easeOut] = useState(2);
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
    let baseSize = wheelRadius * 3.33;
    let textRadius = baseSize - 150;

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

  const spin = () => {
    const key = list.findIndex((item) => item === 101);
    let distance = 0;
    if (key < 15) {
      distance = 15 - key;
    } else {
      distance = list.length - Math.abs(15 - key);
    }

    let randomSpin = (180 * distance * 2) / list.length;

    setRotate(randomSpin + 360 * 3);

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin) => {
    setResult(101);
  };

  return (
    <div className='App'>
      <h1>Spinning Prize Wheel React</h1>
      <span id='selector'>&#9660;</span>
      <canvas
        id='wheel'
        width='500'
        height='500'
        style={{
          WebkitTransform: `rotate(${rotate}deg)`,
          WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
        }}
      />
      <button type='button' id='spin' onClick={spin}>
        spin
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
