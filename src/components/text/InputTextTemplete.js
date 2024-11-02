import { CCol, CFormInput } from "@coreui/react"

const InputTextTempate = (props) => {
	const { title, value, setOnChange, type, placeholder } = props

	return (
		<CCol className="d-flex align-items-center">
			<CFormInput
				placeholder={placeholder}
				type={type ? type : 'text'}
				id={title}
				value={value}
				onChange={(e) => {
					setOnChange(e.target.value);
				}}
			/>
		</CCol >
	)
}

export default InputTextTempate