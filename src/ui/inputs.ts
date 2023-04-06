import styled from "styled-components";
import { primaryColor } from "./colors";
import { componentBorderRadius, inputPadding } from "./sizes";

export const StyledTextInput = styled.textarea<{ fontFamily: string }>`
	border: none;
	background: rgba(0, 0, 0, 0.4);
	color: ${primaryColor};
	padding: ${inputPadding};
	border-radius: ${componentBorderRadius};
	font-family: "${(props) => props.fontFamily}";

	resize: none;
	width: 100%;
	box-sizing: border-box;

	font-size: 1rem;
`;

export const StyledInput = styled.input`
	border: none;
	background: rgba(0, 0, 0, 0.4);
	color: ${primaryColor};
	padding: ${inputPadding};
	border-radius: ${componentBorderRadius};

	width: 100%;
	box-sizing: border-box;

	font-size: 1rem;
`;

export const StyledSelect = styled.select`
	border: none;
	background: rgba(0, 0, 0, 0.4);
	color: ${primaryColor};
	padding: ${inputPadding};
	border-radius: ${componentBorderRadius};

	width: 100%;
	box-sizing: border-box;

	font-size: 1rem;
`;

export const Button = styled.button`
	all: unset;
	align-self: flex-start;
	padding: ${inputPadding};
	border-radius: ${componentBorderRadius};
	background: rgba(0, 0, 0, 0.4);
	text-align: center;

	&:active {
		background: rgba(0, 0, 0, 0.5);
	}
`;
