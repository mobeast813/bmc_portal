import { CButton } from "@coreui/react";

const ButtonOutLine = (props) => {
	const { text, onClick } = props
	return <CButton
		color="outline-secondary"
		className="w-auto me-2"
		onClick={onClick}
	>
		{text}
	</CButton>
}

export default ButtonOutLine