import React, {useState} from "react";
import {sendMessageAC} from "../redux/message-form-reducer";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import dayjs from "dayjs";

export const InputEmailBlock = props => {

	const validator = e => {
		let value = e.target.value
		if (!value || !value.includes('@' && '.') || value[0] === '.' || value[0] === '@' || value[value.length - 1] === '.' || value[value.length - 1] === '@') {
			props.setShowError(true)
		} else {
			props.setShowError(false)
		}
	}

	return (
		<div className="inputs row">
				<span className="description">
					{props.name}
				</span>

			<div className="col-sm-6 col-xl-6">
				<input
					onChange={e => props.setFromName(e.target.value)}
					type="text"
					placeholder="Имя"/>
			</div>

			<div className="col-sm-6 col-xl-6">
				<input
					onChange={e => {
						validator(e)
						props.setFromEmail(e.target.value)
					}}
					type="text"
					placeholder="Email"/>
				{props.showError &&
				<span className="error">
						Email не может быть пустым
					</span>}
			</div>
		</div>
	)
}