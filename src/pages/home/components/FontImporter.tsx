import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import * as WebFont from "webfontloader";
import { Heading } from "../../../ui/display";
import { Button, StyledInput } from "../../../ui/inputs";
import {
	componentBorderRadius,
	containerGap,
	containerPadding,
	inputPadding,
} from "../../../ui/sizes";

type Response = "failed" | "success" | "waiting" | "fetching";

type FontImporterProps = {
	onUpdateFonts: (family: string) => void;
};

export function FontImporter(props: FontImporterProps) {
	const [currentFont, setCurrentFont] = useState("");
	const [currentResponse, setCurrentResponse] = useState<Response>("waiting");

	return (
		<>
			<Heading>Import Google Fonts</Heading>
			<span></span>
			<CentreLabel htmlFor="font">Google Font</CentreLabel>
			<StyledInput
				name="font"
				value={currentFont}
				onChange={(ev) => setCurrentFont(ev.target.value)}
			/>
			<span></span>
			<Button
				onClick={(ev) => {
					if (currentResponse === "fetching") {
						return;
					}

					WebFont.load({
						google: {
							families: [currentFont],
						},
						loading: () => {
							setCurrentResponse("fetching");
						},
						active: () => {
							setCurrentResponse("success");
							props.onUpdateFonts(currentFont);
							window.setTimeout(() => {
								setCurrentResponse("waiting");
							}, 2000);
						},
						inactive: () => {
							setCurrentResponse("failed");
							window.setTimeout(() => {
								setCurrentResponse("waiting");
							}, 2000);
						},
					});

					ev.preventDefault();
				}}
			>
				Import <FontAwesomeIcon icon={faFileImport} />
			</Button>
			{currentResponse === "success" && (
				<StatusLabel>Imported font.</StatusLabel>
			)}
			{currentResponse === "failed" && (
				<StatusLabel>Failed to add font.</StatusLabel>
			)}
			{currentResponse === "fetching" && (
				<StatusLabel>Loading font...</StatusLabel>
			)}
		</>
	);
}

const CentreLabel = styled.label`
	display: flex;
	align-items: center;
`;

const StatusLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	grid-column: 1 / 3;
	background: rgba(0, 0, 0, 0.4);
	padding: ${inputPadding};
	border-radius: ${componentBorderRadius};
`;
