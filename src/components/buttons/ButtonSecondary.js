import { CButton } from "@coreui/react";

const ButtonSecondary = (props) => {
	const { text, onClick } = props
	return <CButton
		color="secondary"
		className="w-100 me-2"
		onClick={onClick}
	>
		{text}
	</CButton>
}

export default ButtonSecondary