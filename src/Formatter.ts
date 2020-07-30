import TextContainer from "./TextContainer";

export default class Formatter {
	
	static globalShortcuts = {};
	shortcuts = {};
	
	getObject(s: string) {
		return this._richTextToTextAndStyle(s);
	}
	
	setRichText(container: TextContainer, s: string, layout = true) {
		const o = this.getObject(s);
		container.text = o.text;
		container.style = o.style;
		if (layout) {
			container.layout();
		}
	}

	_richTextToTextAndStyle(s) {
		let text = '';
		const style = [];

		const concatenatedStyles = {};
		let currentStyleString = '';
		const stylePropsTrail = [];
		let inStyleTag = false;

		for (let i = 0; i < s.length; i++) {
			const c = s[i];
			if (inStyleTag && c == '{' && s[i + 1] == '/' && s[i + 2] == '}') {
				inStyleTag = false;
				i += 2;
				continue;
			}
			if (inStyleTag && c == '}') {
				inStyleTag = false;

				// Closing tag
				if (currentStyleString == '/') {
					if (stylePropsTrail.length == 0) {
						console.warn('Extra closing tag found');
						continue;
					}
					const currentStyleProps = stylePropsTrail.pop();
					for (const styleName of currentStyleProps) {
						concatenatedStyles[styleName].pop();
					}
					continue;
				}

				let currentStylesObject = {};
				const currentStyleProps = [];

				const shortcuts = Object.assign({}, this.shortcuts, Formatter.globalShortcuts);
				const styleParts = currentStyleString.split(',');
				const mapped = styleParts.map((part) => {
					part = part.trim();
					if (shortcuts.hasOwnProperty(part)) {
						part = JSON.stringify(shortcuts[part]);
						part = part.substring(1, part.length - 1);
					}
					return part;
				});
				currentStyleString = mapped.join(',');
				
				try {
					currentStylesObject = (new Function(`return {${currentStyleString}}`))();
				} catch (e) {
					console.warn(`Could not parse "${currentStyleString}"`);
				}

				for (const k in currentStylesObject) {
					if (!concatenatedStyles.hasOwnProperty(k)) {
						concatenatedStyles[k] = [];
					}
					concatenatedStyles[k].push(currentStylesObject[k]);
					currentStyleProps.push(k);
				}

				stylePropsTrail.push(currentStyleProps);
				continue;
			}
			if (inStyleTag) {
				currentStyleString += c;
			}
			if (!inStyleTag && c == '{') {
				inStyleTag = true;
				currentStyleString = '';
				continue;
			}
			if (!inStyleTag) {
				text += c;

				const computedStyles: any = {};
				for (const k in concatenatedStyles) {
					const styleValues = concatenatedStyles[k];
					const computedValue = styleValues[styleValues.length - 1];
					if (computedValue !== undefined) {
						computedStyles[k] = computedValue;
					}
				}

				style.push(computedStyles);
			}
		}
		return {text, style};
	}

}