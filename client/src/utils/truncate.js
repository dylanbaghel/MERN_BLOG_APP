const truncate = (para, limit = 100, ending='....') => {
    if (para.length < limit) {
        return para;
    }

    return para.substring(0, limit) + ending;
};

export default truncate;