import axios from 'axios'
import { useState, useEffect } from 'react'

export function useFetch(query, pageToken) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [nextPageToken, setNextPageToken] = useState('')

  useEffect(() => {
    setRestaurants([])
  }, [query])

  useEffect(() => {
    const CancelToken = axios.CancelToken
    let cancel

    setIsLoading(true)
    setError(false)

    axios
      .get(`http://localhost:3333?pagetoken=${nextPageToken}`, {
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setNextPageToken(res.data.next_page_token)
        setRestaurants((prev) => {
          return [...new Set([...prev, ...res.data.results])]
        })
        setHasMore(res.data.results.length > 0)
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel(err)) return
        setError(err)
      })

    return () => cancel()
  }, [query, pageToken])

  return { isLoading, error, restaurants, hasMore }
}
