import "rc-slider/assets/index.css";

import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BezierEditor from "bezier-easing-editor";
import BezierEasing from "bezier-easing";
import Slider, { Range } from "rc-slider";

import "./styles.css";

const themeColor = "rgba(0,128,255,1)";

function getBezierY(x, bezier) {
  const easing = BezierEasing(...bezier);
  return easing(x);
}

function getShadowString(object, opacity) {
  return `0 ${object.y}px ${object.blur}px ${
    object.spread
  }px rgba(0,0,0,${opacity})`;
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
        fontSize: "9px",
      }}
    >
      {props.text}
    </div>
  );
}

const rangeStyles = {
  handleStyle: [{ borderColor: themeColor }, { borderColor: themeColor }],
  trackStyle: [{ backgroundColor: themeColor }],
  style: { marginTop: ".5em" },
};

const sliderStyles = {
  handleStyle: { borderColor: themeColor },
  trackStyle: { backgroundColor: themeColor },
  style: { marginTop: ".5em" },
};

const sliderBoxStyle = { width: "16em", margin: "1em" };

function App() {
  const [bezierCurveY, setBezierCurveY] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveBlur, setBezierCurveBlur] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveSpread, setBezierCurveSpread] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [yBoundaries, setYBoundaries] = useState([0, 32]);
  const [blurBoundaries, setBlurBoundaries] = useState([0, 64]);
  const [spreadBoundaries, setSpreadBoundaries] = useState([1, 5]);
  const [amount, setAmount] = useState(7);
  const [opacity, setOpacity] = useState(0.1);

  let shadowObjects = [];
  for (let i = 0; i < amount; i++) {
    shadowObjects.push({
      y: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveY) *
          (yBoundaries[1] - yBoundaries[0]) +
        yBoundaries[0]
      ).toFixed(1),
      blur: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur) *
          (blurBoundaries[1] - blurBoundaries[0]) +
        blurBoundaries[0]
      ).toFixed(1),
      spread: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread) *
          (spreadBoundaries[1] - spreadBoundaries[0]) +
        spreadBoundaries[0]
      ).toFixed(1),
    });
  }

  return (
    <>
      <div style={{ padding: "2em", display: "flex", flexWrap: "wrap" }}>
        <div style={sliderBoxStyle}>
          <label>Amount of steps</label>
          <Slider
            {...sliderStyles}
            defaultValue={amount}
            min={3}
            max={24}
            onChange={val => {
              setAmount(val);
            }}
          />
        </div>
        <div style={sliderBoxStyle}>
          <label>Opacity</label>
          <Slider
            {...sliderStyles}
            defaultValue={opacity}
            min={0}
            max={1}
            step={0.01}
            onChange={val => {
              setOpacity(val);
            }}
          />
        </div>
        <div style={sliderBoxStyle}>
          <label>Vertical distance</label>
          <Range
            {...rangeStyles}
            defaultValue={yBoundaries}
            min={0}
            max={64}
            onChange={val => {
              setYBoundaries(val);
            }}
          />
        </div>{" "}
        <div style={sliderBoxStyle}>
          <label>Softness</label>
          <Range
            {...rangeStyles}
            defaultValue={blurBoundaries}
            min={0}
            max={128}
            onChange={val => {
              setBlurBoundaries(val);
            }}
          />
        </div>{" "}
        <div style={sliderBoxStyle}>
          <label>Spread</label>
          <Range
            {...rangeStyles}
            defaultValue={spreadBoundaries}
            min={0}
            max={15}
            onChange={val => {
              setSpreadBoundaries(val);
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <label>Softness</label>
          <BezierEditor
            handleColor={themeColor}
            value={bezierCurveY}
            onChange={val => setBezierCurveY(val)}
          />
        </div>
        <div>
          <label>Softness</label>
          <BezierEditor
            handleColor={themeColor}
            value={bezierCurveBlur}
            onChange={val => setBezierCurveBlur(val)}
          />
        </div>
        <div>
          <label>Softness</label>
          <BezierEditor
            handleColor={themeColor}
            value={bezierCurveSpread}
            onChange={val => setBezierCurveSpread(val)}
          />
        </div>
      </div>

      <div>
        {shadowObjects.map((e, index) => (
          <ShadowObject
            shadow={getShadowString(e, opacity)}
            text={`${index}: ${JSON.stringify(e)} /// ${getShadowString(
              e,
              opacity
            )}`}
          />
        ))}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
