import qs from 'query-string'

const query = {
    user_query: qs.parse(window.location.search)["q"],
    orientation: qs.parse(window.location.search)["orientation"]
}

export default query