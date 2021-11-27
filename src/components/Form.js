import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { sendMessageAC } from '../redux/message-form-reducer'
import InputEmailBlock from './InputEmailBlock'

export default function Form({
  setShowForm = () => {
  },
  setShowResult = () => {
  },
}) {
  const dispatch = useDispatch()

  const [formFields, setFormFields] = useState({
    fromName: '',
    fromEmail: '',
    toName: '',
    toEmail: '',
    messageTheme: '',
    messageText: '',
  })

  const [formFieldsError, setFormFieldsError] = useState({
    isFromEmailError: false,
    isToEmailError: false,
  })

  const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
  }

  const sendMessage = () => {
    const newStatus = () => {
      if (randomInteger(1, 3) === 1) {
        return 'Отправлено'
      }
      if (randomInteger(1, 3) === 2) {
        return 'В очереди'
      }
      return 'Ошибка'
    }

    const message = {
      id: generateUniqueID(),
      fromName: formFields.fromName,
      fromEmail: formFields.fromEmail,
      toName: formFields.toName,
      toEmail: formFields.textarea,
      messageTheme: formFields.messageTheme,
      messageText: formFields.messageText,
      messageDate: dayjs().unix(),
      status: newStatus(),
    }
    dispatch(sendMessageAC(message))
  }

  const onSubmit = () => {
    sendMessage()
    setShowResult(true)
    setShowForm(false)
  }

  const disableButton = () => (formFieldsError.isFromEmailError || formFieldsError.isToEmailError) || (!formFields.fromEmail || !formFields.toEmail)

  return (
    <form
      className="form outlined-block"
    >

      <h3 className="tittle">Отправлялка сообщений</h3>

      <InputEmailBlock
        name="От кого"
        isError={formFieldsError.isFromEmailError}
        setIsError={(fromEmailIsError) => {
          setFormFieldsError({
            ...formFieldsError,
            isFromEmailError: fromEmailIsError,
          })
        }}
        setName={(name) => {
          setFormFields({
            ...formFields,
            fromName: name,
          })
        }}
        setEmail={(email) => {
          setFormFields({
            ...formFields,
            fromEmail: email,
          })
        }}
      />

      <InputEmailBlock
        name="Кому"
        isError={formFieldsError.isToEmailError}
        setIsError={(toEmailIsError) => {
          setFormFieldsError({
            ...formFieldsError,
            isToEmailError: toEmailIsError,
          })
        }}
        setName={(name) => {
          setFormFields({
            ...formFields,
            toName: name,
          })
        }}
        setEmail={(email) => {
          setFormFields({
            ...formFields,
            toEmail: email,
          })
        }}
      />

      <div className="inputs w-100">

        <span className="description">
          Тема письма
        </span>

        <input
          onChange={(e) => {
            setFormFields({
              ...formFields,
              messageTheme: e.target.value,
            })
          }}
          type="text"
          placeholder="Без темы"
        />
      </div>

      <div className="inputs w-100">

        <span className="description">Сообщение</span>
        <textarea
          onChange={(e) => {
            setFormFields({
              ...formFields,
              messageText: e.target.value,
            })
          }}
          rows={5}
          placeholder="Сообщение"
        />
      </div>

      <button
        onClick={onSubmit}
        type="button"
        disabled={disableButton()}
      >
        Отправить
      </button>

    </form>
  )
}

Form.propTypes = {
  setShowForm: PropTypes.func,
  setShowResult: PropTypes.func,
}

Form.defaultProps = {
  setShowForm: () => {},
  setShowResult: () => {},
}
