import { CButton } from "@coreui/react";
import { useEffect, useState } from "react";

const ButtonPrimary = (props) => {
	const { text, onClick, disabledState } = props
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		setDisabled(disabledState)
	}, [disabledState])


	return <CButton
		disabled={disabledState ? disabled : false}
		color="primary"
		className="w-100 me-2"
		onClick={onClick}
	>
		{text}
	</CButton>
}

export default ButtonPrimary