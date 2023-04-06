export type RenderOptions = {
	trimTrailingLines?: boolean;
	renderScale: number;
};

export type GenerateOptions = {
	text: string;
	fontSize: number;
	fontFamily: string;
	threshold: number;
	foreground: string;
	background: string;
	fill?: boolean;
};

export function generateImages(
	options: GenerateOptions,
	strip: ("forward" | "backward")[]
): [string, (HTMLCanvasElement | undefined)[]] {
	const lines = options.text.split("\n");

	const generations = lines.map((line) => {
		const opts = {
			...options,
			text: line,
		};

		return generateImage(opts);
	});

	const text = generations
		.map(([gen, _]) => {
			if (!strip) {
				return gen;
			}

			let curGenerated = gen;
			strip.forEach((direction) => {
				curGenerated = stripEmptyLines(
					curGenerated,
					options.background,
					direction
				);
			});
			return curGenerated;
		})
		.join("\n");

	const canvases = generations.map(([_, canvas]) => canvas);

	return [text, canvases];
}
export function generateImage({
	text,
	fontSize,
	fontFamily,
	threshold,
	foreground,
	background,
	fill,
}: GenerateOptions): [string, HTMLCanvasElement?] {
	const canvas: HTMLCanvasElement = document.createElement("canvas");
	const context = canvas.getContext("2d")!;

	const [width, height] = measureString(text, `${fontSize}px '${fontFamily}`);
	if (!width || !height) return ["", undefined];

	canvas.width = width;
	canvas.height = height;

	// differentiate text from background by pooping white everywhere
	context.fillStyle = "white";
	context.fillRect(0, 0, width, height);

	// also want the baseline to be bottom so we don't have to care about
	// descender height
	context.textBaseline = "bottom";
	context.font = `${fontSize}px '${fontFamily}`;
	if (fill) {
		context.fillStyle = "black";
		context.fillText(text, 0, height);
	} else {
		context.strokeStyle = "black";
		context.strokeText(text, 0, height);
	}

	const imageData = context.getImageData(0, 0, width, height);

	const data = imageData.data;

	let out = "";

	for (let i = 0; i < data.length; i += 4) {
		// a pixel is a subsequence of 4 entries in data
		const pixelX = i / 4;

		const av = (data[i] + data[i + 1] + data[i + 2]) / 3;

		// concat is faster than join or +=
		out = out.concat(av < threshold ? foreground : background);

		// chompy at end not at start
		if (pixelX % width === width - 1) {
			out = out.concat("\n");
		}
	}

	return [out, canvas];
}

export function measureString(text: string, font: string): [number, number] {
	const canvas: HTMLCanvasElement = document.createElement("canvas");

	const context = canvas.getContext("2d");

	if (!context) {
		return [0, 0];
	}

	context.font = font;

	const textMeasurement = context.measureText(text);

	// Ensure width is an integer so we can modulo it properly.
	const width = Math.ceil(textMeasurement.width);

	// Use the font bounding box to ensure consistency with cutoffs.
	// I hate Firefox.
	// https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics/fontBoundingBoxAscent
	let height =
		textMeasurement.fontBoundingBoxAscent +
			textMeasurement.fontBoundingBoxDescent ||
		textMeasurement.actualBoundingBoxAscent +
			textMeasurement.actualBoundingBoxDescent;

	return [width, height];
}

function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function stripEmptyLines(
	text: string,
	background: string,
	direction: "forward" | "backward"
) {
	const lines =
		direction === "forward" ? text.split("\n") : text.split("\n").reverse();

	let lastEmptyLineIndex = -1;

	const regex = new RegExp(`^${escapeRegExp(background) || "\\s"}*$`);
	lines.every((l, i) => {
		if (lastEmptyLineIndex === i - 1) {
			if (l.length === 0 || regex.test(l)) {
				lastEmptyLineIndex = i;
				return true;
			}
		}
		return false;
	});

	if (lastEmptyLineIndex !== lines.length) {
		if (direction === "forward") {
			return lines.slice(lastEmptyLineIndex + 1).join("\n");
		} else {
			return lines
				.slice(lastEmptyLineIndex + 1)
				.reverse()
				.join("\n");
		}
	} else {
		return "";
	}
}
