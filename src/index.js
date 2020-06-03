import 'rc-slider/assets/index.css'

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import ReactDOM from 'react-dom'
import BezierEditor from 'bezier-easing-editor'
import BezierEasing from 'bezier-easing'
import Slider, { Range } from 'rc-slider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Switch from '@material-ui/core/Switch'
import { useUrlState } from 'with-url-state'

import './styles.css'

const themeColor = 'rgba(0,128,255,1)'

function getBezierY(x, bezier) {
	const easing = BezierEasing(...bezier)
	return easing(x)
}

function getShadowString(object) {
	return `0 ${object.y}px ${object.blur}px ${object.negativeSpread ? '-' : ''}${object.spread}px rgba(0,0,0,${
		object.opacity
	}), 0 ${object.y2}px ${object.blur2}px ${object.negativeSpread2 ? '-' : ''}${object.spread2}px rgba(0,0,0,${
		object.opacity2
	}), 0 ${object.y3}px ${object.blur3}px ${object.negativeSpread3 ? '-' : ''}${object.spread3}px rgba(0,0,0,${
		object.opacity3
	})`
}

function ShadowObject(props) {
	const animationProps = useSpring({
		opacity: `1`,
		from: { opacity: '0' },
		config: { mass: 1, tension: 280, friction: 100 },
	})
	return (
		<animated.div
			style={{
				boxShadow: props.shadow,
				width: '12em',
				height: '10em',
				margin: '1em',
				padding: '1em',
				borderRadius: '.33em',
				display: 'inline-block',
				lineHeight: 1.2,
				...animationProps,
			}}
		>
			<div style={{ fontSize: '3em', fontWeight: 'bold' }}>{props.number}</div>
			<div
				style={{
					fontSize: '.75em',
					marginTop: '.5em',
					lineHeight: 1.4,
					color: 'rgba(0,0,0,.5)',
					fontWeight: 'lighter',
				}}
			>
				{props.text}
			</div>
		</animated.div>
	)
}

const rangeStyles = {
	handleStyle: [{ borderColor: themeColor }, { borderColor: themeColor }],
	trackStyle: [{ backgroundColor: themeColor }],
	activeDotStyle: { borderColor: themeColor },
	style: { marginTop: '.5em' },
}

const sliderStyles = {
	handleStyle: { borderColor: themeColor },
	trackStyle: { backgroundColor: themeColor },
	activeDotStyle: { borderColor: themeColor },
	style: { marginTop: '.5em' },
}

const sliderBoxStyle = { width: '30em', marginBottom: '2em' }

const markLabelStyle = { fontSize: '.75em' }

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
	} = props

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<div
				style={{
					padding: '.5em',
					display: 'flex',
					flexWrap: 'wrap',
					maxWidth: '36em',
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
								label: '0',
							},
							0.05: {
								style: markLabelStyle,
								label: '5',
							},
							0.1: {
								style: markLabelStyle,
								label: '10',
							},
							0.25: {
								style: markLabelStyle,
								label: '25',
							},
							0.5: {
								style: markLabelStyle,
								label: '50%',
							},
						}}
						onChange={val => {
							setOpacity(val)
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
								label: '0',
							},
							4: {
								style: markLabelStyle,
								label: '4',
							},
							8: {
								style: markLabelStyle,
								label: '8',
							},
							16: {
								style: markLabelStyle,
								label: '16',
							},
							32: {
								style: markLabelStyle,
								label: '32',
							},
							48: {
								style: markLabelStyle,
								label: '48px',
							},
						}}
						onChange={val => {
							setYBoundaries(val)
						}}
					/>
				</div>{' '}
				<div style={sliderBoxStyle}>
					<label>Blur/Softness</label>
					<Range
						{...rangeStyles}
						defaultValue={blurBoundaries}
						min={0}
						max={96}
						marks={{
							0: {
								style: markLabelStyle,
								label: '0',
							},
							4: {
								style: markLabelStyle,
								label: '4',
							},
							8: {
								style: markLabelStyle,
								label: '8',
							},
							16: {
								style: markLabelStyle,
								label: '16',
							},
							32: {
								style: markLabelStyle,
								label: '32',
							},
							64: {
								style: markLabelStyle,
								label: '64',
							},
							96: {
								style: markLabelStyle,
								label: '96px',
							},
						}}
						onChange={val => {
							setBlurBoundaries(val)
						}}
					/>
				</div>{' '}
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
								label: '0',
							},
							1: {
								style: markLabelStyle,
								label: '1',
							},
							2: {
								style: markLabelStyle,
								label: '2',
							},
							4: {
								style: markLabelStyle,
								label: '4',
							},
							8: {
								style: markLabelStyle,
								label: '8',
							},
							16: {
								style: markLabelStyle,
								label: '16px',
							},
						}}
						onChange={val => {
							setSpreadBoundaries(val)
						}}
					/>
					<div style={{ ...sliderBoxStyle, marginTop: '1em', marginLeft: '-1em' }}>
						<Switch
							checked={negativeSpread}
							onChange={() => {
								setNegativeSpread(!negativeSpread)
							}}
							value="checkedA"
						/>
						<label>is negative</label>
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<div style={{ padding: '.5em' }}>
					<label style={{ display: 'block' }}>Vertical Distance</label>
					<BezierEditor
						width={160}
						height={160}
						handleColor={themeColor}
						value={bezierCurveY}
						onChange={val => setBezierCurveY(val)}
					/>
				</div>
				<div style={{ padding: '.5em' }}>
					<label style={{ display: 'block' }}>Blur/Softness</label>
					<BezierEditor
						width={160}
						height={160}
						handleColor={themeColor}
						value={bezierCurveBlur}
						onChange={val => setBezierCurveBlur(val)}
					/>
				</div>
				<div style={{ padding: '.5em' }}>
					<label style={{ display: 'block' }}>Spread</label>
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
	)
}

function App() {
	const defaults = {
		amount: 7,
		shadow1: {
			bezierCurveY: [0.4, 0, 1, 0.8],
			bezierCurveBlur: [0.4, 0, 1, 0.8],
			bezierCurveSpread: [0.4, 0, 1, 0.8],
			yBoundaries: [0, 4],
			blurBoundaries: [0, 8],
			spreadBoundaries: [1, 4],
			opacity: 0.07,
			negativeSpread: false,
		},
		shadow2: {
			bezierCurveY: [0.4, 0, 1, 0.8],
			bezierCurveBlur: [0.4, 0, 1, 0.8],
			bezierCurveSpread: [0.4, 0, 1, 0.8],
			yBoundaries: [1, 16],
			blurBoundaries: [2, 16],
			spreadBoundaries: [1, 2],
			opacity: 0.07,
			negativeSpread: true,
		},
		shadow3: {
			bezierCurveY: [0.4, 0, 1, 0.8],
			bezierCurveBlur: [0.4, 0, 1, 0.8],
			bezierCurveSpread: [0.4, 0, 1, 0.8],
			yBoundaries: [0, 32],
			blurBoundaries: [0, 64],
			spreadBoundaries: [1, 5],
			opacity: 0.07,
			negativeSpread: false,
		},
	}

	const [urlState, setUrlState] = useUrlState({
		params: encodeURIComponent(JSON.stringify(defaults)),
	})

	const url = JSON.parse(decodeURIComponent(urlState.params))
	//console.log(url.amount);

	const initial = {
		amount: typeof url.amount !== 'undefined' ? url.amount : defaults.amount,
		shadow1: {
			bezierCurveY:
				typeof url.shadow1.bezierCurveY !== 'undefined'
					? url.shadow1.bezierCurveY
					: defaults.shadow1.bezierCurveY,
			bezierCurveBlur:
				typeof url.shadow1.bezierCurveBlur !== 'undefined'
					? url.shadow1.bezierCurveBlur
					: defaults.shadow1.bezierCurveBlur,
			bezierCurveSpread:
				typeof url.shadow1.bezierCurveSpread !== 'undefined'
					? url.shadow1.bezierCurveSpread
					: defaults.shadow1.bezierCurveSpread,
			yBoundaries:
				typeof url.shadow1.yBoundaries !== 'undefined' ? url.shadow1.yBoundaries : defaults.shadow1.yBoundaries,
			blurBoundaries:
				typeof url.shadow1.blurBoundaries !== 'undefined'
					? url.shadow1.blurBoundaries
					: defaults.shadow1.blurBoundaries,
			spreadBoundaries:
				typeof url.shadow1.spreadBoundaries !== 'undefined'
					? url.shadow1.spreadBoundaries
					: defaults.shadow1.spreadBoundaries,
			opacity: typeof url.shadow1.opacity !== 'undefined' ? url.shadow1.opacity : defaults.shadow1.opacity,
			negativeSpread:
				typeof url.shadow1.negativeSpread !== 'undefined'
					? url.shadow1.negativeSpread
					: defaults.shadow1.negativeSpread,
		},
		shadow2: {
			bezierCurveY:
				typeof url.shadow2.bezierCurveY !== 'undefined'
					? url.shadow2.bezierCurveY
					: defaults.shadow2.bezierCurveY,
			bezierCurveBlur:
				typeof url.shadow2.bezierCurveBlur !== 'undefined'
					? url.shadow2.bezierCurveBlur
					: defaults.shadow2.bezierCurveBlur,
			bezierCurveSpread:
				typeof url.shadow2.bezierCurveSpread !== 'undefined'
					? url.shadow2.bezierCurveSpread
					: defaults.shadow2.bezierCurveSpread,
			yBoundaries:
				typeof url.shadow2.yBoundaries !== 'undefined' ? url.shadow2.yBoundaries : defaults.shadow2.yBoundaries,
			blurBoundaries:
				typeof url.shadow2.blurBoundaries !== 'undefined'
					? url.shadow2.blurBoundaries
					: defaults.shadow2.blurBoundaries,
			spreadBoundaries:
				typeof url.shadow2.spreadBoundaries !== 'undefined'
					? url.shadow2.spreadBoundaries
					: defaults.shadow2.spreadBoundaries,
			opacity: typeof url.shadow2.opacity !== 'undefined' ? url.shadow2.opacity : defaults.shadow2.opacity,
			negativeSpread:
				typeof url.shadow2.negativeSpread !== 'undefined'
					? url.shadow2.negativeSpread
					: defaults.shadow2.negativeSpread,
		},
		shadow3: {
			bezierCurveY:
				typeof url.shadow3.bezierCurveY !== 'undefined'
					? url.shadow3.bezierCurveY
					: defaults.shadow3.bezierCurveY,
			bezierCurveBlur:
				typeof url.shadow3.bezierCurveBlur !== 'undefined'
					? url.shadow3.bezierCurveBlur
					: defaults.shadow3.bezierCurveBlur,
			bezierCurveSpread:
				typeof url.shadow3.bezierCurveSpread !== 'undefined'
					? url.shadow3.bezierCurveSpread
					: defaults.shadow3.bezierCurveSpread,
			yBoundaries:
				typeof url.shadow3.yBoundaries !== 'undefined' ? url.shadow3.yBoundaries : defaults.shadow3.yBoundaries,
			blurBoundaries:
				typeof url.shadow3.blurBoundaries !== 'undefined'
					? url.shadow3.blurBoundaries
					: defaults.shadow3.blurBoundaries,
			spreadBoundaries:
				typeof url.shadow3.spreadBoundaries !== 'undefined'
					? url.shadow3.spreadBoundaries
					: defaults.shadow3.spreadBoundaries,
			opacity: typeof url.shadow3.opacity !== 'undefined' ? url.shadow3.opacity : defaults.shadow3.opacity,
			negativeSpread:
				typeof url.shadow3.negativeSpread !== 'undefined'
					? url.shadow3.negativeSpread
					: defaults.shadow3.negativeSpread,
		},
	}

	const [amount, setAmount] = useState(initial.amount)

	/* Shadow 1: Contour */
	const [bezierCurveY, setBezierCurveY] = useState(initial.shadow1.bezierCurveY)
	const [bezierCurveBlur, setBezierCurveBlur] = useState(initial.shadow1.bezierCurveBlur)
	const [bezierCurveSpread, setBezierCurveSpread] = useState(initial.shadow1.bezierCurveSpread)
	const [yBoundaries, setYBoundaries] = useState(initial.shadow1.yBoundaries)
	const [blurBoundaries, setBlurBoundaries] = useState(initial.shadow1.blurBoundaries)
	const [spreadBoundaries, setSpreadBoundaries] = useState(initial.shadow1.spreadBoundaries)
	const [opacity, setOpacity] = useState(initial.shadow1.opacity)
	const [negativeSpread, setNegativeSpread] = useState(initial.shadow1.negativeSpread)

	/* Shadow 2: Key Light */
	const [bezierCurveY2, setBezierCurveY2] = useState(initial.shadow2.bezierCurveY)
	const [bezierCurveBlur2, setBezierCurveBlur2] = useState(initial.shadow2.bezierCurveBlur)
	const [bezierCurveSpread2, setBezierCurveSpread2] = useState(initial.shadow2.bezierCurveSpread)
	const [yBoundaries2, setYBoundaries2] = useState(initial.shadow2.yBoundaries)
	const [blurBoundaries2, setBlurBoundaries2] = useState(initial.shadow2.blurBoundaries)
	const [spreadBoundaries2, setSpreadBoundaries2] = useState(initial.shadow2.spreadBoundaries)
	const [opacity2, setOpacity2] = useState(initial.shadow2.opacity)
	const [negativeSpread2, setNegativeSpread2] = useState(initial.shadow2.negativeSpread)

	/* Shadow 3: Soft Shadow */
	const [bezierCurveY3, setBezierCurveY3] = useState(initial.shadow3.bezierCurveY)
	const [bezierCurveBlur3, setBezierCurveBlur3] = useState(initial.shadow3.bezierCurveBlur)
	const [bezierCurveSpread3, setBezierCurveSpread3] = useState(initial.shadow3.bezierCurveSpread)
	const [yBoundaries3, setYBoundaries3] = useState(initial.shadow3.yBoundaries)
	const [blurBoundaries3, setBlurBoundaries3] = useState(initial.shadow3.blurBoundaries)
	const [spreadBoundaries3, setSpreadBoundaries3] = useState(initial.shadow3.spreadBoundaries)
	const [opacity3, setOpacity3] = useState(initial.shadow3.opacity)
	const [negativeSpread3, setNegativeSpread3] = useState(initial.shadow3.negativeSpread)

	const [expanded1, setExpanded1] = useState(false)
	const [expanded2, setExpanded2] = useState(false)
	const [expanded3, setExpanded3] = useState(false)

	useEffect(() => {
		//console.log(JSON.parse(decodeURIComponent(urlState.params)));
		setUrlState({
			params: encodeURIComponent(
				JSON.stringify({
					amount: amount,
					shadow1: {
						bezierCurveY: bezierCurveY,
						bezierCurveBlur: bezierCurveBlur,
						bezierCurveSpread: bezierCurveSpread,
						yBoundaries: yBoundaries,
						blurBoundaries: blurBoundaries,
						spreadBoundaries: spreadBoundaries,
						opacity: opacity,
						negativeSpread: negativeSpread,
					},
					shadow2: {
						bezierCurveY: bezierCurveY2,
						bezierCurveBlur: bezierCurveBlur2,
						bezierCurveSpread: bezierCurveSpread2,
						yBoundaries: yBoundaries2,
						blurBoundaries: blurBoundaries2,
						spreadBoundaries: spreadBoundaries2,
						opacity: opacity2,
						negativeSpread: negativeSpread2,
					},
					shadow3: {
						bezierCurveY: bezierCurveY3,
						bezierCurveBlur: bezierCurveBlur3,
						bezierCurveSpread: bezierCurveSpread3,
						yBoundaries: yBoundaries3,
						blurBoundaries: blurBoundaries3,
						spreadBoundaries: spreadBoundaries3,
						opacity: opacity3,
						negativeSpread: negativeSpread3,
					},
				})
			),
		})
	}, [
		amount,
		bezierCurveY,
		bezierCurveBlur,
		bezierCurveSpread,
		yBoundaries,
		blurBoundaries,
		spreadBoundaries,
		opacity,
		negativeSpread,
		bezierCurveY2,
		bezierCurveBlur2,
		bezierCurveSpread2,
		yBoundaries2,
		blurBoundaries2,
		spreadBoundaries2,
		opacity2,
		negativeSpread2,
		bezierCurveY3,
		bezierCurveBlur3,
		bezierCurveSpread3,
		yBoundaries3,
		blurBoundaries3,
		spreadBoundaries3,
		opacity3,
		negativeSpread3,
	])

	let shadowObjects = []
	for (let i = 0; i < amount; i++) {
		shadowObjects.push({
			y: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveY) * (yBoundaries[1] - yBoundaries[0]) + yBoundaries[0]
			),
			blur: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveBlur) * (blurBoundaries[1] - blurBoundaries[0]) +
					blurBoundaries[0]
			),
			spread: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveSpread) * (spreadBoundaries[1] - spreadBoundaries[0]) +
					spreadBoundaries[0]
			),
			opacity: opacity,
			negativeSpread: negativeSpread,
			y2: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveY2) * (yBoundaries2[1] - yBoundaries2[0]) +
					yBoundaries2[0]
			),
			blur2: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveBlur2) * (blurBoundaries2[1] - blurBoundaries2[0]) +
					blurBoundaries2[0]
			),
			spread2: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveSpread2) * (spreadBoundaries2[1] - spreadBoundaries2[0]) +
					spreadBoundaries2[0]
			),
			opacity2: opacity2,
			negativeSpread2: negativeSpread2,
			y3: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveY3) * (yBoundaries3[1] - yBoundaries3[0]) +
					yBoundaries3[0]
			),
			blur3: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveBlur3) * (blurBoundaries3[1] - blurBoundaries3[0]) +
					blurBoundaries3[0]
			),
			spread3: Math.round(
				getBezierY((1 / (amount - 1)) * i, bezierCurveSpread3) * (spreadBoundaries3[1] - spreadBoundaries3[0]) +
					spreadBoundaries3[0]
			),
			opacity3: opacity3,
			negativeSpread3: negativeSpread3,
		})
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<div style={{ flexBasis: '40%', flexGrow: 1 }}>
				<div style={{ padding: '2em', display: 'flex', flexWrap: 'wrap' }}>
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
									label: '3',
								},
								6: {
									style: markLabelStyle,
									label: '6',
								},
								12: {
									style: markLabelStyle,
									label: '12',
								},
								18: {
									style: markLabelStyle,
									label: '18',
								},
								24: {
									style: markLabelStyle,
									label: '24',
								},
							}}
							onChange={val => {
								setAmount(val)
							}}
						/>
					</div>
				</div>

				<ExpansionPanel
					expanded={expanded1}
					onChange={() => {
						setExpanded1(!expanded1)
					}}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						Shadow 1 (e.g. Contour)
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
						setExpanded2(!expanded2)
					}}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						Shadow 2 (e.g. Key Light)
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
						setExpanded3(!expanded3)
					}}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						Shadow 3 (e.g. Soft Light)
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
				<div className="small-print source">
					Made by{' '}
					<a href="https://bruskowski.design">
						<img
							src="https:/bruskowski.design/icons/icon-48x48.png"
							width={24}
							height={24}
							alt=""
							style={{ verticalAlign: 'middle' }}
						/>{' '}
						bruskowski.design
					</a>
				</div>
			</div>
			<div
				style={{
					margin: '1em',
					marginTop: '4em',
					marginBottom: '8em',
					flexBasis: '50%',
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
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
