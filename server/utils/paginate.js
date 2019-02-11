const paginateQuery = (pageNo, size) => {
    let query = {};

    if (pageNo < 0 || pageNo === 0) {
        throw new Error("Page Should Start With 1");
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    return query;
};

module.exports = paginateQuery;