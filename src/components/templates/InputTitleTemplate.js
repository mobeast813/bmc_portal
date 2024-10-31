import { CCol, CFormInput, CFormLabel } from "@coreui/react"

const InputTitleTemplate = (props) => {
	const { title, value, setOnChange, type, col } = props

	const classString = `col-form-label  me-2 col-${col ? col : "3"}`
	return (
		<CCol sm={12} className="d-flex align-items-center">
			<CFormLabel className={classString}>
				{title}
			</CFormLabel>
			<CFormInput
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

export default InputTitleTemplate