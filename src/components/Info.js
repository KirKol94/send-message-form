import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {messasges} from "../selectors/formSelectors";
import {changeStatusAC} from "../redux/message-form-reducer";
import dayjs from "dayjs";

export default function Info(props) {

	const dispatch = useDispatch()

	const messages = useSelector(messasges)
	const [selectedItemId, setSelectedItemId] = useState(null)

	const changeStatus = (id, theme, date) => {
		let edit = {
			id,
			messageTheme: theme,
			date
		}
		dispatch(changeStatusAC(edit))
	}

	return (
		<div className="info-page">
			<h4>Отправленные сообщения</h4>

			{messages.length < 1
				? <p>Сообщения ещё не отправлены</p>
				: <table className="info-table">
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
					{messages.map(message =>
						<tr key={message.id}>
							<td className="table-left-col">
								{dayjs(message.messageDate).date()}.{dayjs(message.messageDate).month() + 1}
							</td>
							<td className="table-center-col">
								{message.messageTheme}
							</td>
							<td className="table-right-col">
							<span
								style={{cursor: message.messageStatus === 'Ошибка' ? 'pointer' : null}}
								onClick={() => {
									setSelectedItemId(message.messageId)
									if (selectedItemId === message.messageId && message.messageStatus === 'Ошибка') {
										changeStatus(selectedItemId, message.messageTheme, message.messageDate)
									}
								}}>
							{message.messageStatus}
						</span></td>
						</tr>
					)}
					</tbody>

					<tfoot></tfoot>
				</table>}

		</div>
	)
}