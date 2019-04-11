import "rc-slider/assets/index.css";

import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BezierEditor from "bezier-easing-editor";
import BezierEasing from "bezier-easing";
import Slider, { Range } from "rc-slider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        width: "10em",
        height: "10em",
        margin: "1em",
        padding: "1em",
        borderRadius: ".33em",
        display: "inline-block",
        lineHeight: 1.2,
      }}
    >
      <div style={{ fontSize: "3em", fontWeight: "bold" }}>{props.number}</div>
      <div style={{ fontSize: ".75em", marginTop: ".5em", lineHeight: 1.4 }}>
        {props.text}
      </div>
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
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

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
      </div>
      <ExpansionPanel
        expanded={expanded1}
        onChange={() => {
          setExpanded1(!expanded1);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Shadow 1
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ padding: "2em", display: "flex", flexWrap: "wrap" }}>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded2}
        onChange={() => {
          setExpanded2(!expanded2);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Shadow 2
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>To Do</ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded3}
        onChange={() => {
          setExpanded3(!expanded3);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Shadow 3
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>To Do</ExpansionPanelDetails>
      </ExpansionPanel>

      <div style={{ marginTop: "4em" }}>
        {shadowObjects.map((e, index) => (
          <ShadowObject
            key={index}
            number={index}
            shadow={getShadowString(e, opacity)}
            text={`${getShadowString(e, opacity)}`}
          />
        ))}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
