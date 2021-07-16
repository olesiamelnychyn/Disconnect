const queryString = params =>
    Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join("&")

module.exports.createUrl = (url, queryOptions) => {
    return url + "?" + queryString(queryOptions)
}