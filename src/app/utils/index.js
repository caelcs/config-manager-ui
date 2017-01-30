export const mapObject = (object, callback) => {
	return Object.keys(object).map(function (key) {
		return callback(key, object[key]);
	})
};

export const prepareArticleHtmlContentForReactComponent = (htmlContent) => {

	const reactifiedHtmlContent = htmlContent ? htmlContent.replace(/class="/g, 'className="') : '';

	return reactifiedHtmlContent;
};
