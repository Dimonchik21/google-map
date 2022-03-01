import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker } from '@react-google-maps/api'
import s from './Map.module.css'
import { useNavigate } from 'react-router-dom'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  disabledDoubleClickZoom: false,
  scroolwhell: false,
  keyboardShortcuts: false,
}

export const Map = ({ center, setMap, markers, position, setPosition }) => {
  const mapRef = React.useRef(undefined)
  const navigate = useNavigate()
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined
    setMap(undefined)
  }, [])

  const handlerClickMarker = React.useCallback(
    function callback(e) {
      const { latLng } = e
      const lat = latLng.lat()
      const lng = latLng.lng()
      setPosition({ lat, lng })
    },
    [setPosition]
  )

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position ? position : center}
        zoom={position ? 18 : 12}
        onLoad={onLoad}
        options={defaultOptions}
        onUnmount={onUnmount}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              onClick={(e) => {
                handlerClickMarker(e)
                navigate(`/${marker.placeId}`)
              }}
              position={marker}
            />
          ))}
      </GoogleMap>
    </div>
  )
}

Map.propTypes = {
  center: PropTypes.object,
  markers: PropTypes.array,
  position: PropTypes.object,
  setMap: PropTypes.func,
  setPosition: PropTypes.func,
}
