import qs from 'query-string'

/* Gets the user's query from the address bar */
const query = {
    user_query: qs.parse(window.location.search)["q"],
    orientation: qs.parse(window.location.search)["orientation"]
}

export default query