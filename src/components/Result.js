import React from "react";

export const Result = props => <div className="outlined-block result-page text-center">

	<h3 className="tittle">Сообщение поставлено в очередь на отправку</h3>

	<p>Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «abc@my.com» со
		скоростью электронов.</p>

	<button onClick={() => {
		props.setShowForm(true)
		props.setShowResult(false)
	}}>Отправить новое сообщение
	</button>

</div>

export default Result