import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ImagesRestaurant } from '../ImagesRestaurant'
import { Address } from '../Address'
import './Element.module.css'

export const Element = ({ restaurant }) => {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    setPhotos([])
    const photosReference = Object.values(restaurant.photos).slice(0, 5)
    photosReference.map(({ photo_reference }) => {
      setPhotos((state) => [...state, photo_reference])
    });
  }, [restaurant])

  return (
    <div className='container'>
      <div>Name: {restaurant.name}</div>
      {restaurant.international_phone_number && (<div>International phone: {restaurant.international_phone_number}</div>)}
      {restaurant?.opening_hours?.weekday_text?.length > 0 && (
        <div className='pt10px'>
          <span>Weekday: </span>
          <div className='container pt10px'>
            {restaurant.opening_hours.weekday_text.map((item, key) => (<div key={key}>{item}</div>))}
          </div>
        </div>
      )}
      {restaurant.rating && (<div>Rating: {restaurant.rating}</div>)}
      {restaurant.formatted_address && <Address formated_address={restaurant.formatted_address} />}
      {photos.length > 0 && <ImagesRestaurant photos={photos} />}
    </div>
  )
}

Element.propTypes = {
  restaurant: PropTypes.object,
}
