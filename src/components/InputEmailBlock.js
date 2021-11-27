import React from 'react'
import PropTypes from 'prop-types'

export default function InputEmailBlock({
  name,
  setName,
  setEmail,
  setIsError,
  isError,
}) {
  const validate = (email) => {
    setIsError(true)
    const re = /\S+@\S+\.\S+/
    if (re.test(email)) {
      setIsError(false)
    } else if (!email) {
      setIsError(false)
    }
  }

  return (
    <div className="inputs">
      <span className="description">
        {name}
      </span>

      <div className="d-flex">
        <div className="w-50">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Имя"
          />
        </div>

        <div className="d-block w-50">
          <input
            onChange={(e) => {
              validate(e.target.value)
              setEmail(e.target.value)
            }}
            type="text"
            placeholder="Email*"
          />

          {isError && (
          <span
            className="error"
          >
            Некорректный email
          </span>
          )}
        </div>
      </div>

    </div>
  )
}

InputEmailBlock.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
  setEmail: PropTypes.func,
  isError: PropTypes.bool,
  setIsError: PropTypes.func,
}

InputEmailBlock.defaultProps = {
  name: '',
  isError: false,
  setName: () => {},
  setEmail: () => {},
  setIsError: () => {},
}
