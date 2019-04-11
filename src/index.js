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
  return `0 ${object.y}px ${object.blur}px ${object.spread}px rgba(0,0,0,${
    object.opacity
  }), 0 ${object.y2}px ${object.blur2}px ${object.spread2}px rgba(0,0,0,${
    object.opacity2
  }), 0 ${object.y3}px ${object.blur3}px ${object.spread3}px rgba(0,0,0,${
    object.opacity3
  })`;
}

function ShadowObject(props) {
  return (
    <div
      style={{
        boxShadow: props.shadow,
        width: "12em",
        height: "12em",
        margin: "1em",
        padding: "1em",
        borderRadius: ".33em",
        display: "inline-block",
        lineHeight: 1.2,
      }}
    >
      <div style={{ fontSize: "3em", fontWeight: "bold" }}>{props.number}</div>
      <div
        style={{
          fontSize: ".75em",
          marginTop: ".5em",
          lineHeight: 1.4,
          color: "rgba(0,0,0,.5)",
          fontWeight: "lighter",
        }}
      >
        {props.text}
      </div>
    </div>
  );
}

const rangeStyles = {
  handleStyle: [{ borderColor: themeColor }, { borderColor: themeColor }],
  trackStyle: [{ backgroundColor: themeColor }],
  activeDotStyle: { borderColor: themeColor },
  style: { marginTop: ".5em" },
};

const sliderStyles = {
  handleStyle: { borderColor: themeColor },
  trackStyle: { backgroundColor: themeColor },
  activeDotStyle: { borderColor: themeColor },
  style: { marginTop: ".5em" },
};

const sliderBoxStyle = { width: "32em", margin: "1em" };

const markLabelStyle = { fontSize: ".75em" };

function ShadowControllers(props) {
  const {
    bezierCurveY,
    setBezierCurveY,
    bezierCurveBlur,
    setBezierCurveBlur,
    bezierCurveSpread,
    setBezierCurveSpread,
    yBoundaries,
    setYBoundaries,
    blurBoundaries,
    setBlurBoundaries,
    spreadBoundaries,
    setSpreadBoundaries,
    opacity,
    setOpacity,
  } = props;

  return (
    <>
      <div style={{ padding: "2em", display: "flex", flexWrap: "wrap" }}>
        <div style={sliderBoxStyle}>
          <label>Opacity</label>
          <Slider
            {...sliderStyles}
            defaultValue={opacity}
            min={0}
            max={0.5}
            step={0.005}
            marks={{
              0: {
                style: markLabelStyle,
                label: "0",
              },
              0.05: {
                style: markLabelStyle,
                label: "5",
              },
              0.1: {
                style: markLabelStyle,
                label: "10",
              },
              0.25: {
                style: markLabelStyle,
                label: "25",
              },
              0.5: {
                style: markLabelStyle,
                label: "50%",
              },
            }}
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
            max={48}
            marks={{
              0: {
                style: markLabelStyle,
                label: "0",
              },
              4: {
                style: markLabelStyle,
                label: "4",
              },
              8: {
                style: markLabelStyle,
                label: "8",
              },
              16: {
                style: markLabelStyle,
                label: "16",
              },
              32: {
                style: markLabelStyle,
                label: "32",
              },
              48: {
                style: markLabelStyle,
                label: "48px",
              },
            }}
            onChange={val => {
              setOpacity(val);
            }}
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
            max={96}
            marks={{
              0: {
                style: markLabelStyle,
                label: "0",
              },
              4: {
                style: markLabelStyle,
                label: "4",
              },
              8: {
                style: markLabelStyle,
                label: "8",
              },
              16: {
                style: markLabelStyle,
                label: "16",
              },
              32: {
                style: markLabelStyle,
                label: "32",
              },
              64: {
                style: markLabelStyle,
                label: "64",
              },
              96: {
                style: markLabelStyle,
                label: "96px",
              },
            }}
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
            max={16}
            marks={{
              0: {
                style: markLabelStyle,
                label: "0",
              },
              1: {
                style: markLabelStyle,
                label: "1",
              },
              2: {
                style: markLabelStyle,
                label: "2",
              },
              4: {
                style: markLabelStyle,
                label: "4",
              },
              8: {
                style: markLabelStyle,
                label: "8",
              },
              16: {
                style: markLabelStyle,
                label: "16px",
              },
            }}
            onChange={val => {
              setSpreadBoundaries(val);
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <label>Vertical Distance</label>
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
          <label>Spread</label>
          <BezierEditor
            handleColor={themeColor}
            value={bezierCurveSpread}
            onChange={val => setBezierCurveSpread(val)}
          />
        </div>
      </div>
    </>
  );
}

function App() {
  const [amount, setAmount] = useState(7);

  /* Shadow 1 */
  const [bezierCurveY, setBezierCurveY] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveBlur, setBezierCurveBlur] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveSpread, setBezierCurveSpread] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [yBoundaries, setYBoundaries] = useState([0, 4]);
  const [blurBoundaries, setBlurBoundaries] = useState([0, 8]);
  const [spreadBoundaries, setSpreadBoundaries] = useState([0, 2]);
  const [opacity, setOpacity] = useState(0.07);

  /* Shadow 2 */
  const [bezierCurveY2, setBezierCurveY2] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveBlur2, setBezierCurveBlur2] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [bezierCurveSpread2, setBezierCurveSpread2] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [yBoundaries2, setYBoundaries2] = useState([1, 16]);
  const [blurBoundaries2, setBlurBoundaries2] = useState([2, 16]);
  const [spreadBoundaries2, setSpreadBoundaries2] = useState([1, 2]);
  const [opacity2, setOpacity2] = useState(0.07);

  /* Shadow 3 */
  const [bezierCurveY3, setBezierCurveY3] = useState([0.3, 0.2, 0.6, 0.8]);
  const [bezierCurveBlur3, setBezierCurveBlur3] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [bezierCurveSpread3, setBezierCurveSpread3] = useState([
    0.3,
    0.2,
    0.6,
    0.8,
  ]);
  const [yBoundaries3, setYBoundaries3] = useState([0, 32]);
  const [blurBoundaries3, setBlurBoundaries3] = useState([0, 64]);
  const [spreadBoundaries3, setSpreadBoundaries3] = useState([1, 5]);
  const [opacity3, setOpacity3] = useState(0.07);

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
      opacity: opacity,
      y2: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveY2) *
          (yBoundaries2[1] - yBoundaries2[0]) +
        yBoundaries2[0]
      ).toFixed(1),
      blur2: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur2) *
          (blurBoundaries2[1] - blurBoundaries2[0]) +
        blurBoundaries2[0]
      ).toFixed(1),
      spread2: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread2) *
          (spreadBoundaries2[1] - spreadBoundaries2[0]) +
        spreadBoundaries2[0]
      ).toFixed(1),
      opacity2: opacity2,
      y3: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveY3) *
          (yBoundaries3[1] - yBoundaries3[0]) +
        yBoundaries3[0]
      ).toFixed(1),
      blur3: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur3) *
          (blurBoundaries3[1] - blurBoundaries3[0]) +
        blurBoundaries3[0]
      ).toFixed(1),
      spread3: (
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread3) *
          (spreadBoundaries3[1] - spreadBoundaries3[0]) +
        spreadBoundaries3[0]
      ).toFixed(1),
      opacity3: opacity3,
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
            marks={{
              3: {
                style: markLabelStyle,
                label: "3",
              },
              6: {
                style: markLabelStyle,
                label: "6",
              },
              12: {
                style: markLabelStyle,
                label: "12",
              },
              18: {
                style: markLabelStyle,
                label: "18",
              },
              24: {
                style: markLabelStyle,
                label: "24",
              },
            }}
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
          Shadow 1 (Contour)
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ShadowControllers
            bezierCurveY={bezierCurveY}
            setBezierCurveY={setBezierCurveY}
            bezierCurveBlur={bezierCurveBlur}
            setBezierCurveBlur={setBezierCurveBlur}
            bezierCurveSpread={bezierCurveSpread}
            setBezierCurveSpread={setBezierCurveSpread}
            yBoundaries={yBoundaries}
            setYBoundaries={setYBoundaries}
            blurBoundaries={blurBoundaries}
            setBlurBoundaries={setBlurBoundaries}
            spreadBoundaries={spreadBoundaries}
            setSpreadBoundaries={setSpreadBoundaries}
            opacity={opacity}
            setOpacity={setOpacity}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded2}
        onChange={() => {
          setExpanded2(!expanded2);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Shadow 2 (Key Light)
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ShadowControllers
            bezierCurveY={bezierCurveY2}
            setBezierCurveY={setBezierCurveY2}
            bezierCurveBlur={bezierCurveBlur2}
            setBezierCurveBlur={setBezierCurveBlur2}
            bezierCurveSpread={bezierCurveSpread2}
            setBezierCurveSpread={setBezierCurveSpread2}
            yBoundaries={yBoundaries2}
            setYBoundaries={setYBoundaries2}
            blurBoundaries={blurBoundaries2}
            setBlurBoundaries={setBlurBoundaries2}
            spreadBoundaries={spreadBoundaries2}
            setSpreadBoundaries={setSpreadBoundaries2}
            opacity={opacity2}
            setOpacity={setOpacity2}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded3}
        onChange={() => {
          setExpanded3(!expanded3);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Shadow 3 (Soft Light)
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ShadowControllers
            bezierCurveY={bezierCurveY3}
            setBezierCurveY={setBezierCurveY3}
            bezierCurveBlur={bezierCurveBlur3}
            setBezierCurveBlur={setBezierCurveBlur3}
            bezierCurveSpread={bezierCurveSpread3}
            setBezierCurveSpread={setBezierCurveSpread3}
            yBoundaries={yBoundaries3}
            setYBoundaries={setYBoundaries3}
            blurBoundaries={blurBoundaries3}
            setBlurBoundaries={setBlurBoundaries3}
            spreadBoundaries={spreadBoundaries3}
            setSpreadBoundaries={setSpreadBoundaries3}
            opacity={opacity3}
            setOpacity={setOpacity3}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <div style={{ marginTop: "4em" }}>
        {shadowObjects.map((e, index) => (
          <ShadowObject
            key={index}
            number={index}
            shadow={getShadowString(e)}
            text={`${getShadowString(e)}`}
          />
        ))}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
