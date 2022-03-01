import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { detailPlace } from '../../api/google-place'
import { Element } from '../../components/Element'

export const ElementPage = ({ setPosition }) => {
  const { placeId } = useParams()
  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    detailPlace(placeId).then((restaurantItem) => {
      setRestaurant(restaurantItem.result)
    })
  }, [placeId])

  useEffect(() => {
    if (restaurant) {
      const lat = restaurant.geometry.location.lat
      const lng = restaurant.geometry.location.lng
      const position = { lat, lng }
      setPosition(position)
    }
  }, [restaurant, setPosition])

  if (!restaurant) {
    return <div>Loading...</div>
  }

  if (restaurant) {
    return (
      <div>
        <div>
          <Link to={`/`}>Back</Link>
          <Element restaurant={restaurant} />
        </div>
      </div>
    )
  }
}

ElementPage.propTypes = {
  setPosition: PropTypes.func,
}
