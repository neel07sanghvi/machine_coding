import { useCallback, useState, useEffect, useRef } from "react"
import { InfiniteScroll } from "./components/InfiniteScroll"

function App() {

  const URL = "https://openlibrary.org/search.json?"

  const [query, setQuery] = useState("");
  const [data, setData] = useState([])

  const controllerRef = useRef(null)

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [])

  const getData = useCallback((query, page) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (controllerRef.current) {
          controllerRef.current.abort()
        }

        controllerRef.current = new AbortController

        const response = await fetch(URL + new URLSearchParams({
          q: query,
          page: page
        }), {
          signal: controllerRef.current.signal
        })

        const data = await response.json();

        setData(prev => [...prev, ...data.docs]);

        resolve()
      } catch (error) {
        reject()
      }
    })
  }, [])

  const renderListItem = useCallback((item, index, ref) => {
    return <div ref={ref} key={index}> {item['title']} </div>
  })

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        onChange={handleChange}
      />

      <InfiniteScroll
        renderListItem={renderListItem}
        getData={getData}
        listData={data}
        query={query}
      />
    </div>
  )
}

export default App
