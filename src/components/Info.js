/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID'
import { changeStatusAC } from '../redux/message-form-reducer'
import { messagesSelector } from '../selectors/formSelectors'

export default function Info() {
  const dispatch = useDispatch()

  const messages = useSelector(messagesSelector)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const changeStatus = (theme, date) => {
    const edit = {
      selectedItemId,
      id: generateUniqueID(),
      messageTheme: theme,
      date,
    }
    dispatch(changeStatusAC(edit))
  }

  return (
    <div className="info-page">
      <h4>Отправленные сообщения</h4>

      {messages.length < 1
        ? <p>Сообщения ещё не отправлены</p>
        : (
          <table className="info-table">
            <thead>
              <tr>
                <td className="table-left-col">
                  Дата
                </td>
                <td className="table-center-col">
                  Тема
                </td>
                <td className="table-right-col">
                  Статус
                </td>
              </tr>
            </thead>

            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="table-left-col">
                    {dayjs(message.messageDate).date()}
                    .
                    {dayjs(message.messageDate).month() + 1}
                  </td>
                  <td className="table-center-col">
                    {message.messageTheme || 'Без темы'}
                  </td>
                  <td className="table-right-col">
                    <span
                      style={{ cursor: message.messageStatus === 'Ошибка' ? 'pointer' : null }}
                      onClick={() => {
                        setSelectedItemId(message.messageId)
                        if (selectedItemId === message.messageId && message.messageStatus === 'Ошибка') {
                          changeStatus(message.messageTheme, message.messageDate)
                        }
                      }}
                    >
                      {message.messageStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot />
          </table>
        )}

    </div>
  )
}
