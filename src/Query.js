import qs from 'query-string'

const user_query = qs.parse(window.location.search)["q"];

export default user_query;