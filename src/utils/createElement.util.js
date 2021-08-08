export default (options) => {
	const children = options.children || [];
	const attributes = options.attributes || {};
	const events = options.events || {};

	const el = document.createElement(options.selector);

	for (const [key, value] of Object.entries(attributes)) {
		const attr = document.createAttribute(key);
		attr.value = value;
		el.setAttributeNode(attr);
	}

	for (const [name, callback] of Object.entries(events)) {
		el.addEventListener(name, callback);
	}

	children.forEach((child) => {
		el.appendChild(child);
	});

	return el;
};
