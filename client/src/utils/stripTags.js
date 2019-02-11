const stripTags = (htmlText) => {
    return htmlText.replace(/<(?:.|\n)*?>/gm, '');
};

export default stripTags;