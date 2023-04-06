import styled from "styled-components";
import { FontField } from "./FontField";
import { GenerateOptions, RenderOptions } from "../../../helpers/renderer";
import { Heading } from "../../../ui/display";
import { StyledInput, StyledTextInput } from "../../../ui/inputs";
import {
	componentBorderRadius,
	containerPadding,
	inputPadding,
} from "../../../ui/sizes";
import { useState } from "react";
import { FontImporter } from "./FontImporter";

type OptionsPanelProps = {
	options: GenerateOptions & RenderOptions;
	onChangeOptions: (options: GenerateOptions & RenderOptions) => void;
};

export function OptionsPanel(props: OptionsPanelProps) {
	const [_, setFonts] = useState(Array.from(document.fonts));

	return (
		<Options>
			<Heading>Settings</Heading>
			<span></span>
			<CentreLabel htmlFor="text">Text</CentreLabel>
			<StyledTextInput
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						text: ev.target.value,
					});
				}}
				name="text"
				fontFamily={props.options.fontFamily}
				value={props.options.text}
			/>
			<CentreLabel htmlFor="scale">Scale</CentreLabel>
			<StyledInput
				name="scale"
				type="range"
				min={0}
				max={1}
				step={0.001}
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						renderScale: parseFloat(ev.target.value),
					});
				}}
				value={props.options.renderScale}
			/>
			<CentreLabel htmlFor="threshold">Threshold</CentreLabel>
			<StyledInput
				name="threshold"
				type="range"
				min={0}
				max={255}
				step={0.5}
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						threshold: parseFloat(ev.target.value),
					});
				}}
				value={props.options.threshold}
			/>
			<CentreLabel htmlFor="fontSize">Font Size</CentreLabel>
			<StyledInput
				name="fontSize"
				type="range"
				min={1}
				max={100}
				step={1}
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						fontSize: parseFloat(ev.target.value),
					});
				}}
				value={props.options.fontSize}
			/>
			<CentreLabel htmlFor="trim">Trim Excess</CentreLabel>
			<StyledInput
				name="trim"
				type="checkbox"
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						trimTrailingLines: ev.target.checked,
					});
				}}
				checked={props.options.trimTrailingLines}
			/>
			<CentreLabel htmlFor="fill">Fill Text</CentreLabel>
			<StyledInput
				name="fill"
				type="checkbox"
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						fill: ev.target.checked,
					});
				}}
				checked={props.options.fill}
			/>
			<CentreLabel htmlFor="foreground">Foreground</CentreLabel>
			<StyledInput
				name="foreground"
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						foreground: ev.target.value,
					});
				}}
				value={props.options.foreground}
			/>
			<CentreLabel htmlFor="background">Background</CentreLabel>
			<StyledInput
				name="background"
				onChange={(ev) => {
					props.onChangeOptions({
						...props.options,
						background: ev.target.value,
					});
				}}
				value={props.options.background}
			/>
			<FontField
				selectedFont={props.options.fontFamily}
				onChangeSelectedFont={(family) => {
					props.onChangeOptions({
						...props.options,
						fontFamily: family,
					});
				}}
			/>
			<FontImporter
				onUpdateFonts={() => {
					setFonts(Array.from(document.fonts));
				}}
			/>
		</Options>
	);
}

const Options = styled.div`
	display: grid;
	grid-template-columns: max-content max-content;
	grid-gap: 1em;
	background-color: rgba(0, 0, 0, 0.4);
	padding: ${containerPadding};
	border-radius: ${componentBorderRadius};
`;

const CentreLabel = styled.label`
	display: flex;
	align-items: center;
`;
