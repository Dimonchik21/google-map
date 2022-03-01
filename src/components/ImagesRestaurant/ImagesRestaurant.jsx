import PropTypes from 'prop-types'
import { REACT_APP_API_KEY } from '../../constants'
import s from './ImagesRestaurant.module.css'

const urlImgPath = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&maxheight=300&key=${REACT_APP_API_KEY}&photo_reference=`;

export const ImagesRestaurant = ({ photos }) => {
  return (
    <div className={s.gallery}>
      <div className={s.gallery__flex}>
        {photos.map((photoReference, index) => {
          return (
            <div key={index} className={s.gallery__item}>
              <img src={`${urlImgPath}${photoReference}`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

ImagesRestaurant.propTypes = {
  photos: PropTypes.array,
}
