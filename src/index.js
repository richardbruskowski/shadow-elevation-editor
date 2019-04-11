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
import Switch from "@material-ui/core/Switch";

import "./styles.css";

const themeColor = "rgba(0,128,255,1)";

function getBezierY(x, bezier) {
  const easing = BezierEasing(...bezier);
  return easing(x);
}

function getShadowString(object) {
  return `0 ${object.y}px ${object.blur}px ${object.negativeSpread ? "-" : ""}${
    object.spread
  }px rgba(0,0,0,${object.opacity}), 0 ${object.y2}px ${object.blur2}px ${
    object.negativeSpread2 ? "-" : ""
  }${object.spread2}px rgba(0,0,0,${object.opacity2}), 0 ${object.y3}px ${
    object.blur3
  }px ${object.negativeSpread3 ? "-" : ""}${object.spread3}px rgba(0,0,0,${
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

const sliderBoxStyle = { width: "30em", marginBottom: "2em" };

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
    negativeSpread,
    setNegativeSpread,
  } = props;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          padding: ".5em",
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "36em",
        }}
      >
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
          <div
            style={{ ...sliderBoxStyle, marginTop: "1em", marginLeft: "-1em" }}
          >
            <Switch
              checked={negativeSpread}
              onChange={() => {
                setNegativeSpread(!negativeSpread);
              }}
              value="checkedA"
            />
            <label>is negative</label>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ padding: ".5em" }}>
          <label style={{ display: "block" }}>Vertical Distance</label>
          <BezierEditor
            width={160}
            height={160}
            handleColor={themeColor}
            value={bezierCurveY}
            onChange={val => setBezierCurveY(val)}
          />
        </div>
        <div style={{ padding: ".5em" }}>
          <label style={{ display: "block" }}>Softness</label>
          <BezierEditor
            width={160}
            height={160}
            handleColor={themeColor}
            value={bezierCurveBlur}
            onChange={val => setBezierCurveBlur(val)}
          />
        </div>
        <div style={{ padding: ".5em" }}>
          <label style={{ display: "block" }}>Spread</label>
          <BezierEditor
            width={160}
            height={160}
            handleColor={themeColor}
            value={bezierCurveSpread}
            onChange={val => setBezierCurveSpread(val)}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [amount, setAmount] = useState(7);

  /* Shadow 1 */
  const [bezierCurveY, setBezierCurveY] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveBlur, setBezierCurveBlur] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveSpread, setBezierCurveSpread] = useState([0.6, 0, 1, 0.6]);
  const [yBoundaries, setYBoundaries] = useState([0, 4]);
  const [blurBoundaries, setBlurBoundaries] = useState([0, 8]);
  const [spreadBoundaries, setSpreadBoundaries] = useState([0, 2]);
  const [opacity, setOpacity] = useState(0.07);
  const [negativeSpread, setNegativeSpread] = useState(false);

  /* Shadow 2 */
  const [bezierCurveY2, setBezierCurveY2] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveBlur2, setBezierCurveBlur2] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveSpread2, setBezierCurveSpread2] = useState([
    0.6,
    0,
    1,
    0.6,
  ]);
  const [yBoundaries2, setYBoundaries2] = useState([1, 16]);
  const [blurBoundaries2, setBlurBoundaries2] = useState([2, 16]);
  const [spreadBoundaries2, setSpreadBoundaries2] = useState([1, 2]);
  const [opacity2, setOpacity2] = useState(0.07);
  const [negativeSpread2, setNegativeSpread2] = useState(true);

  /* Shadow 3 */
  const [bezierCurveY3, setBezierCurveY3] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveBlur3, setBezierCurveBlur3] = useState([0.6, 0, 1, 0.6]);
  const [bezierCurveSpread3, setBezierCurveSpread3] = useState([
    0.6,
    0,
    1,
    0.6,
  ]);
  const [yBoundaries3, setYBoundaries3] = useState([0, 32]);
  const [blurBoundaries3, setBlurBoundaries3] = useState([0, 64]);
  const [spreadBoundaries3, setSpreadBoundaries3] = useState([1, 5]);
  const [opacity3, setOpacity3] = useState(0.07);
  const [negativeSpread3, setNegativeSpread3] = useState(false);

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  let shadowObjects = [];
  for (let i = 0; i < amount; i++) {
    shadowObjects.push({
      y: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveY) *
          (yBoundaries[1] - yBoundaries[0]) +
          yBoundaries[0]
      ),
      blur: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur) *
          (blurBoundaries[1] - blurBoundaries[0]) +
          blurBoundaries[0]
      ),
      spread: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread) *
          (spreadBoundaries[1] - spreadBoundaries[0]) +
          spreadBoundaries[0]
      ),
      opacity: opacity,
      negativeSpread: negativeSpread,
      y2: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveY2) *
          (yBoundaries2[1] - yBoundaries2[0]) +
          yBoundaries2[0]
      ),
      blur2: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur2) *
          (blurBoundaries2[1] - blurBoundaries2[0]) +
          blurBoundaries2[0]
      ),
      spread2: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread2) *
          (spreadBoundaries2[1] - spreadBoundaries2[0]) +
          spreadBoundaries2[0]
      ),
      opacity2: opacity2,
      negativeSpread2: negativeSpread2,
      y3: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveY3) *
          (yBoundaries3[1] - yBoundaries3[0]) +
          yBoundaries3[0]
      ),
      blur3: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveBlur3) *
          (blurBoundaries3[1] - blurBoundaries3[0]) +
          blurBoundaries3[0]
      ),
      spread3: Math.round(
        getBezierY((1 / (amount - 1)) * i, bezierCurveSpread3) *
          (spreadBoundaries3[1] - spreadBoundaries3[0]) +
          spreadBoundaries3[0]
      ),
      opacity3: opacity3,
      negativeSpread3: negativeSpread3,
    });
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ flexBasis: "40%", flexGrow: 1 }}>
        <div style={{ padding: "2em", display: "flex", flexWrap: "wrap" }}>
          <div style={sliderBoxStyle}>
            <label>Amount of elevation levels</label>
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
              negativeSpread={negativeSpread}
              setNegativeSpread={setNegativeSpread}
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
              negativeSpread={negativeSpread2}
              setNegativeSpread={setNegativeSpread2}
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
              negativeSpread={negativeSpread3}
              setNegativeSpread={setNegativeSpread3}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div
        style={{
          margin: "1em",
          marginTop: "4em",
          marginBottom: "8em",
          flexBasis: "50%",
          flexGrow: 2,
        }}
      >
        {shadowObjects.map((e, index) => (
          <ShadowObject
            key={index}
            number={index}
            shadow={getShadowString(e)}
            text={`${getShadowString(e)}`}
          />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
