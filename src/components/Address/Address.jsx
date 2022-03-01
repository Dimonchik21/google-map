import React from 'react'
import PropTypes from 'prop-types'

export function Address({ formated_address }) {
  return <div>Address: {formated_address}</div>
}

Address.propTypes = {
  formated_address: PropTypes.string,
}
