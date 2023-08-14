import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setisPending] = useState(true)
    const [error, setError] = useState(null)

    // Fetching the data from the db
    useEffect(() => {
        // Abort We use if a user navigate to another page quick we can stop the fetch by this abort function to avoid errors
        const abortConst = new AbortController();
        fetch(url, { signal: abortConst.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch data from that resource')
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setisPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Abort Fetch')
                } else {
                    setisPending(false)
                    setError(err.message)
                }
            })
        return () => abortConst.abort()
    }, [url])

    return { data, isPending, error }
}

export default useFetch;