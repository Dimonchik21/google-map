import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import s from './ListPage.module.css'
import { defaultCenter } from '../../constants'

export const ListPage = ({ loader, isLoading, restaurants, setPosition }) => {
  useEffect(() => {
    setPosition(null)
  })
  if (restaurants) {
    const lastElement = restaurants.length

    return (
      <>
        <ul className={s.list}>
          {restaurants.map((item, index) => {
            if (lastElement === index + 1) {
              return (
                <Link key={item.place_id} ref={loader} to={`/${item.place_id}`}>
                  <li>
                    <div>{item.name}</div>
                    <div>{item.formatted_address}</div>
                  </li>
                </Link>
              )
            } else {
              return (
                <Link key={item.place_id} to={`/${item.place_id}`}>
                  <li>
                    <div>{item.name}</div>
                    <div>{item.formatted_address}</div>
                  </li>
                </Link>
              )
            }
          })}
          {isLoading && <li ref={loader}>loading...</li>}
        </ul>
      </>
    )
  }
}

ListPage.propTypes = {
  loader: PropTypes.func,
  setPosition: PropTypes.func,
  isLoading: PropTypes.bool,
  restaurants: PropTypes.array,
}
