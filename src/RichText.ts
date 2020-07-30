import Text from "./Text";
import Formatter from "./Formatter";
import {ConstructObj} from "./Interfaces";

export default class RichText extends Text {

	_formatter: Formatter;
	_richText = '';

	constructor(props: ConstructObj = null) {
		super(props);
		if (props.text) {
			this._richText = props.text;
		}
		this._formatter = new Formatter();
	}

	get formatter() {
		return this._formatter;
	}

	get richText() {
		return this._richText;
	}

	set richText(s) {
		if (s === this._richText) {
			return;
		}
		this._richText = s;
		this._formatter.setRichText(this, s);
	}

}
