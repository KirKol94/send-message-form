import React from "react";

export const InputEmailBlock = props => {
	const validate = (email) => {
		props.setShowError(true)
		let re = /\S+@\S+\.\S+/;
		if (re.test(email)) {
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
					onChange={e => props.setName(e.target.value)}
					type="text"
					placeholder="Имя"/>
			</div>

			<div className="col-sm-6 col-xl-6">
				<input
					onChange={e => {
						validate(e.target.value)
						props.setEmail(e.target.value)
					}}
					type="text"
					placeholder="Email*"
				/>

				{props.showError && <span
					className="error">
						Некорректный email
					</span>}

			</div>
		</div>
	)
}