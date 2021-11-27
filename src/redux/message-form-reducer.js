const SEND_MESSAGE = 'SEND_MESSAGE'
const CHANGE_STATUS = 'CHANGE_STATUS'

let initialState = {
	messages: []
}

export default function formReducer(state = initialState, action) {
	switch (action.type) {
		case SEND_MESSAGE:
			let newMessage = {
				id: action.message.id,
				fromName: action.message.fromName,
				fromEmail: action.message.fromEmail,
				toName: action.message.toName,
				toEmail: action.message.toEmail,
				messageTheme: action.message.messageTheme,
				messageText: action.message.messageText,
				messageDate: action.messageDate,
				messageStatus: action.message.status,
			}
			return {
				...state,
				messages: [newMessage, ...state.messages]
			}
		case CHANGE_STATUS:
			let selectedItem = state.messages.filter(m => m.id === action.id)
			selectedItem = {
				id: action.edit.id,
				messageTheme: action.edit.messageTheme,
				messageDate: action.edit.date,
				messageStatus: 'Отправлено'
			}
			return {
				...state,
				messages: [selectedItem, ...state.messages]
			}
		default:
			return state
	}
}

export const sendMessageAC = message => ({type: SEND_MESSAGE, message})
export const changeStatusAC = edit => ({type: CHANGE_STATUS, edit})