import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { Routes, Route } from 'react-router-dom'
import { Map } from './components/Map'
import { ElementPage } from './pages/ElementPage'
import { ListPage } from './pages/ListPage'
import { useFetch } from './hooks/useFetch'
import { defaultCenter } from './constants';

import style from './App.module.css'

const API_KEY = process.env.REACT_APP_API_KEY
const libraries = ['places']

export default function App() {
  const [, setMap] = useState(undefined)
  const [markers, setMarkers] = useState([])
  const [position, setPosition] = useState(null)
  const [query] = useState('')
  const [isMore, setIsMore] = useState(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  })

  const { isLoading, restaurants, hasMore } = useFetch(query, isMore)

  useEffect(() => {
    restaurants.map((place) => {
      const lat = place.geometry.location.lat
      const lng = place.geometry.location.lng
      const coordinates = { lat, lng, placeId: place.place_id }
      setMarkers((state) => {
        return [...state, coordinates]
      })
    })
  }, [restaurants])

  const observer = useRef()
  const lastRestaurantElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsMore((page) => page + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  return (
    <div className={style.container}>
      <div className={style['d-flext']}>
        <div className={style.restaurantsList}>
          <Routes>
            <Route
              index
              path="/"
              element={
                <ListPage
                  isLoading={isLoading}
                  loader={lastRestaurantElementRef}
                  setPosition={setPosition}
                  restaurants={restaurants}
                />
              }
            />
            <Route
              path="/:placeId"
              element={<ElementPage isLoaded={isLoaded} setPosition={setPosition} />}
            />
          </Routes>
        </div>
        {isLoaded && (
          <Map
            position={position}
            markers={markers}
            center={defaultCenter}
            setMap={setMap}
            setPosition={setPosition}
          />
        )}
      </div>
    </div>
  )
}
