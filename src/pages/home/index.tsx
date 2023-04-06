import { useState } from "react";
import styled from "styled-components";
import { FontImporter } from "./components/FontImporter";
import { FontlyRenderer } from "./components/FontlyRenderer";
import { GenerateOptions, RenderOptions } from "../../helpers/renderer";
import { OptionsPanel } from "./components/OptionsPanel";
import { containerGap, containerPadding } from "../../ui/sizes";

export default function Home() {
	const [options, setOptions] = useState<GenerateOptions & RenderOptions>({
		text: "",
		renderScale: 1,
		threshold: 200,
		fontSize: 24,
		fontFamily: "serif",
		trimTrailingLines: true,
		fill: true,
		foreground: "#",
		background: " ",
	});

	return (
		<Wrapper>
			<TogglePanel>
				<OptionsPanel options={options} onChangeOptions={setOptions} />
			</TogglePanel>
			<FontlyRenderer {...options} />
		</Wrapper>
	);
}

const TogglePanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${containerGap};
`;

const Wrapper = styled.div`
	display: flex;
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: ${containerPadding};
	gap: ${containerGap};
`;
