import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessageAC} from "../redux/message-form-reducer";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import dayjs from "dayjs";
import {InputEmailBlock} from "./InputEmailBlock";

export const Form = props => {

	const dispatch = useDispatch()

	const [fromName, setFromName] = useState('')
	const [toName, setToName] = useState('')
	const [fromEmail, setFromEmail] = useState(null)
	const [toEmail, setToEmail] = useState(null)
	const [messageTheme, setMessageTheme] = useState('')
	const [messageText, setMessageText] = useState('')

	const [showError, setShowError] = useState(false)

	const randomInteger = (min, max) => {
		let rand = min - 0.5 + Math.random() * (max - min + 1)
		return Math.round(rand)
	}
	const sendMessage = () => {
		let newStatus = () => {
			if (randomInteger(1, 3) === 1) {
				return 'Отправлено'
			}
			if (randomInteger(1, 3) === 2) {
				return 'В очереди'
			} else {
				return 'Ошибка'
			}
		}
		let message = {
			id: generateUniqueID(),
			fromName,
			fromEmail,
			toName,
			toEmail,
			messageTheme,
			messageText,
			messageDate: dayjs().unix(),
			status: newStatus()
		}
		dispatch(sendMessageAC(message))
	}
	const onSubmit = (e) => {
		e.preventDefault()
		sendMessage()
		props.setShowResult(true)
		props.setShowForm(false)
	}

	return (
		<form className="form outlined-block"
					onSubmit={onSubmit}>

			<h3 className="tittle">Отправлялка сообщений</h3>

			<InputEmailBlock name="От кого"
											 showError={showError}
											 setShowError={setShowError}
											 setFromName={setFromName}
											 setFromEmail={setFromEmail}
											 setToName={setToName}
											 setToEmail={setToEmail}/>

			<InputEmailBlock name="Кому"
											 showError={showError}
											 setShowError={setShowError}
											 setFromName={setFromName}
											 setFromEmail={setFromEmail}
											 setToName={setToName}
											 setToEmail={setToEmail}/>

			<div className="inputs row">
				<span className="description">
					Тема письма
				</span>
				<div className="col-12">
					<input
						onChange={e => setMessageTheme(e.target.value)}
						type="text"
						placeholder="Тема"/>
				</div>
			</div>

			<div className="inputs row">
				<span className="description">Сообщение</span>
				<div className="col-12">
						<textarea
							onChange={e => setMessageText(e.target.value)}
							rows={5} placeholder="Сообщение"/>
				</div>
			</div>

			<button
				disabled={showError || (!fromEmail || !toEmail)}>
				Отправить
			</button>

		</form>
	)
}