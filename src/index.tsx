import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle, ServerStyleSheet } from "styled-components";
import Home from "./pages/home";
import reportWebVitals from "./reportWebVitals";
import { primaryColor, secondaryColor } from "./ui/colors";

const Global = createGlobalStyle`
    body {
        background-color: 	${secondaryColor};
        font-family: Roboto;
        color: ${primaryColor};
    };
`;

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Global />
		<Home />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
