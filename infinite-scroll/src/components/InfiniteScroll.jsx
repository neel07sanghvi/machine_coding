import React, { useCallback, useEffect, useRef, useState } from 'react'

export const InfiniteScroll = ({
  renderListItem,
  getData,
  listData,
  query
}) => {
  const [loading, setLoading] = useState(false)

  const pageNumberRef = useRef(1);
  const observerRef = useRef(null);

  const fetchData = useCallback(() => {
    setLoading(true)

    getData(query, pageNumberRef.current)
      .finally(() => {
        setLoading(false)
      })

  }, [query])

  const lastElementObserver = useCallback((node) => {
    if (loading) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        pageNumberRef.current += 1;
        fetchData()
      }
    })

    if (node) {
      observerRef.current.observe(node)
    }

  }, [fetchData])

  const render = useCallback(() => {
    return listData.map((item, index) => {

      if (index === listData.length - 1) {
        return renderListItem(item, index, lastElementObserver)
      }

      return renderListItem(item, index, null)
    })
  }, [listData])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  return (
    <div>
      {render()}
      {loading && <p>Loading...</p>}
    </div>
  )
}
