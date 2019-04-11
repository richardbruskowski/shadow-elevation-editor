import "rc-slider/assets/index.css";

import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BezierEditor from "bezier-easing-editor";
import BezierEasing from "bezier-easing";
import { Range } from "rc-slider";

import "./styles.css";

const opacity = 0.08;

function getBezierY(x, bezier) {
  console.log(bezier);
  const easing = BezierEasing(...bezier);
  console.log(x + ": " + easing(x));
  return easing(x);
}

function getShadowString(object) {
  return `0 ${object.y}px ${object.blur}px ${(object.spread / 10).toFixed(
    2
  )}px rgba(0,0,0,${opacity})`;
}

function ShadowObject(props) {
  return (
    <div
      style={{
        boxShadow: props.shadow,
        width: 200,
        height: 100,
        margin: 16,
        padding: 8,
        borderRadius: 6,
        display: "inline-block",
        fontSize: "9px"
      }}
    >
      {props.text}
    </div>
  );
}

const rangeStyle = { margin: 20 };

function App() {
  const [bezierCurveY, setBezierCurveY] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveBlur, setBezierCurveBlur] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveSpread, setBezierCurveSpread] = useState([
    0.3,
    0.2,
    0.6,
    0.8
  ]);
  const [yBoundaries, setYBoundaries] = useState([0, 32]);
  const [blurBoundaries, setBlurBoundaries] = useState([0, 64]);
  const [spreadBoundaries, setSpreadBoundaries] = useState([0, 1]);

  let shadowObjects = [];
  let amount = 7;
  for (let i = 0; i < amount; i++) {
    shadowObjects.push({
      y: (
        getBezierY((1 / amount) * i, bezierCurveY) *
          (yBoundaries[1] - yBoundaries[0]) +
        yBoundaries[0]
      ).toFixed(1),
      blur: (
        getBezierY((1 / amount) * i, bezierCurveBlur) *
          (blurBoundaries[1] - blurBoundaries[0]) +
        blurBoundaries[0]
      ).toFixed(1),
      spread: (
        getBezierY((1 / amount) * i, bezierCurveSpread) *
          (spreadBoundaries[1] - spreadBoundaries[0]) +
        spreadBoundaries[0]
      ).toFixed(1)
    });
  }

  return (
    <>
      <div>
        <Range
          style={rangeStyle}
          defaultValue={yBoundaries}
          min={0}
          max={64}
          onChange={val => {
            setYBoundaries(val);
          }}
        />
        <Range
          style={rangeStyle}
          defaultValue={blurBoundaries}
          min={0}
          max={128}
          onChange={val => {
            setBlurBoundaries(val);
          }}
        />
        <Range
          style={rangeStyle}
          defaultValue={spreadBoundaries}
          min={-50}
          max={50}
          onChange={val => {
            setSpreadBoundaries(val);
          }}
        />
      </div>
      <div className="App">
        <BezierEditor
          value={bezierCurveY}
          onChange={val => setBezierCurveY(val)}
        />
        <BezierEditor
          value={bezierCurveBlur}
          onChange={val => setBezierCurveBlur(val)}
        />
        <BezierEditor
          value={bezierCurveSpread}
          onChange={val => setBezierCurveSpread(val)}
        />

        <div>
          {shadowObjects.map((e, index) => (
            <ShadowObject
              shadow={getShadowString(e)}
              text={`${index}: ${JSON.stringify(e)} /// ${getShadowString(e)}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
