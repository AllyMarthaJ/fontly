import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { StyledSelect } from "../../../ui/inputs";
import { componentBorderRadius, inputPadding } from "../../../ui/sizes";

type FontFieldProps = {
	selectedFont: string;
	onChangeSelectedFont: (font: string) => void;
};

const windowsFonts = [
	"Arial",
	"Arial Black",
	"Bahnschrift",
	"Calibri",
	"Cambria",
	"Cambria Math",
	"Candara",
	"Comic Sans MS",
	"Consolas",
	"Constantia",
	"Corbel",
	"Courier New",
	"Ebrima",
	"Franklin Gothic Medium",
	"Gabriola",
	"Gadugi",
	"Georgia",
	"HoloLens MDL2 Assets",
	"Impact",
	"Ink Free",
	"Javanese Text",
	"Leelawadee UI",
	"Lucida Console",
	"Lucida Sans Unicode",
	"Malgun Gothic",
	"Marlett",
	"Microsoft Himalaya",
	"Microsoft JhengHei",
	"Microsoft New Tai Lue",
	"Microsoft PhagsPa",
	"Microsoft Sans Serif",
	"Microsoft Tai Le",
	"Microsoft YaHei",
	"Microsoft Yi Baiti",
	"MingLiU-ExtB",
	"Mongolian Baiti",
	"MS Gothic",
	"MV Boli",
	"Myanmar Text",
	"Nirmala UI",
	"Palatino Linotype",
	"Segoe MDL2 Assets",
	"Segoe Print",
	"Segoe Script",
	"Segoe UI",
	"Segoe UI Historic",
	"Segoe UI Emoji",
	"Segoe UI Symbol",
	"SimSun",
	"Sitka",
	"Sylfaen",
	"Symbol",
	"Tahoma",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana",
	"Webdings",
	"Wingdings",
	"Yu Gothic",
];

const macFonts = [
	"American Typewriter",
	"Andale Mono",
	"Arial",
	"Arial Black",
	"Arial Narrow",
	"Arial Rounded MT Bold",
	"Arial Unicode MS",
	"Avenir",
	"Avenir Next",
	"Avenir Next Condensed",
	"Baskerville",
	"Big Caslon",
	"Bodoni 72",
	"Bodoni 72 Oldstyle",
	"Bodoni 72 Smallcaps",
	"Bradley Hand",
	"Brush Script MT",
	"Chalkboard",
	"Chalkboard SE",
	"Chalkduster",
	"Charter",
	"Cochin",
	"Comic Sans MS",
	"Copperplate",
	"Courier",
	"Courier New",
	"Didot",
	"DIN Alternate",
	"DIN Condensed",
	"Futura",
	"Geneva",
	"Georgia",
	"Gill Sans",
	"Helvetica",
	"Helvetica Neue",
	"Herculanum",
	"Hoefler Text",
	"Impact",
	"Lucida Grande",
	"Luminari",
	"Marker Felt",
	"Menlo",
	"Microsoft Sans Serif",
	"Monaco",
	"Noteworthy",
	"Optima",
	"Palatino",
	"Papyrus",
	"Phosphate",
	"Rockwell",
	"Savoye LET",
	"SignPainter",
	"Skia",
	"Snell Roundhand",
	"Tahoma",
	"Times",
	"Times New Roman",
	"Trattatello",
	"Trebuchet MS",
	"Verdana",
	"Zapfino",
];

function checkFonts(): string[] {
	const fonts = windowsFonts
		.concat(macFonts)
		.filter((value, index, arr) => arr.indexOf(value) === index);

	return (
		fonts
			.map((family) => {
				return document.fonts.check(`12px "${family}"`) && family;
			})
			.filter((family) => family) as string[]
	).sort();
}

export function FontField(props: FontFieldProps) {
	const installedFonts = useMemo(checkFonts, []);

	const [availableFonts, setAvailableFonts] = useState<string[]>([]);

	const selectRef = useRef<HTMLSelectElement>(null);

	const { onChangeSelectedFont, selectedFont } = props;

	useEffect(() => {
		document.fonts.ready.then(() => {
			let fonts: string[] = [];

			document.fonts.forEach((font) => {
				fonts.push(font.family.replaceAll('"', ""));
			});
			setAvailableFonts(
				fonts
					.filter((value, index, arr) => arr.indexOf(value) === index)
					.sort()
			);

			// ensure everything is in sync with the default font
			if (selectRef.current && selectRef.current.value !== selectedFont) {
				onChangeSelectedFont(selectRef.current.value);
			}
		});
	}, [document.fonts, onChangeSelectedFont, selectedFont]);

	return (
		<>
			<CentreLabel htmlFor="font">Font</CentreLabel>
			<StyledSelect
				name="font"
				onChange={(ev) => onChangeSelectedFont(ev.target.value)}
				ref={selectRef}
			>
				{availableFonts.map((family) => {
					return (
						<option value={family} key={"loaded-" + family}>
							{family}
						</option>
					);
				})}
				<option key="hr" disabled>
					——————————————
				</option>
				{installedFonts.map((family) => {
					return (
						<option value={family} key={"installed-" + family}>
							{family}
						</option>
					);
				})}
			</StyledSelect>
		</>
	);
}

const CentreLabel = styled.label`
	display: flex;
	align-items: center;
`;
