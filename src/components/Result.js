import React from 'react'
import PropTypes from 'prop-types'

const Result = ({
  setShowResult,
  setShowForm,
}) => (
  <div className="outlined-block result-page text-center">

    <h3 className="tittle">Сообщение поставлено в очередь на отправку</h3>

    <p>
      Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «abc@my.com» со
      скоростью электронов.
    </p>

    <button
      type="button"
      onClick={() => {
        setShowForm(true)
        setShowResult(false)
      }}
    >
      Отправить новое сообщение
    </button>

  </div>
)

Result.propTypes = {
  setShowForm: PropTypes.func,
  setShowResult: PropTypes.func,
}
Result.defaultProps = {
  setShowForm: () => {},
  setShowResult: () => {},
}
export default Result
