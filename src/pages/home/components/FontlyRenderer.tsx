import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import styled from "styled-components";
import {
	generateImages,
	GenerateOptions,
	RenderOptions,
} from "../../../helpers/renderer";
import { tertiaryColor } from "../../../ui/colors";
import { Button } from "../../../ui/inputs";
import {
	componentBorderRadius,
	containerGap,
	inputPadding,
} from "../../../ui/sizes";

type FontlyRendererProps = GenerateOptions & RenderOptions;

type CopyState = "waiting" | "copying" | "copied";

export function FontlyRenderer(props: FontlyRendererProps) {
	const generatedText = useMemo(() => {
		const [image, _] = generateImages(
			props,
			props.trimTrailingLines ? ["backward", "forward"] : []
		);

		return image;
	}, [props]);

	const [copyState, setCopyState] = useState<CopyState>("waiting");
	let curTimeout: number | undefined = undefined;

	return (
		<CodeContainer>
			<Button
				onClick={(ev) => {
					if (!["waiting", "copied"].includes(copyState)) {
						return;
					}

					if (curTimeout !== undefined) {
						window.clearTimeout(curTimeout);
						curTimeout = undefined;
					}

					setCopyState("copying");
					navigator.clipboard.writeText(generatedText).then(() => {
						setCopyState("copied");
						curTimeout = window.setTimeout(() => {
							setCopyState("waiting");
						}, 2000);
					});
					ev.preventDefault();
				}}
			>
				{copyState === "waiting" && "Copy to Clipboard"}
				{copyState === "copying" && "Copying..."}
				{copyState === "copied" && "Copied!"}{" "}
				<FontAwesomeIcon icon={faClipboard} />
			</Button>
			<Code scaleFactor={props.renderScale}>{generatedText}</Code>
		</CodeContainer>
	);
}

const CodeContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${containerGap};
	min-width: 0;
	width: 100%;
	height: 100%;
`;

// use attrs because yay re-render
const Code = styled.pre.attrs(({ scaleFactor }: any) => ({
	style: {
		fontSize: `calc(${scaleFactor} * 1rem)`,
	},
}))<{ scaleFactor: number }>`
	overflow: scroll;
	color: ${tertiaryColor};
	background: rgba(0, 0, 0, 0.4);
	border-radius: ${componentBorderRadius};
	padding: ${inputPadding};
	margin: 0;
	height: 100%;
`;
