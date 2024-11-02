import { CCol, CFormInput, CFormLabel } from "@coreui/react"

const TitleContentTemplate = (props) => {
	const { title, value, col } = props
	const classString = `col-form-label  me-2 col-${col ? col : "3"}`
	return (
		<CCol sm={6} className="d-flex align-items-center">
			<CFormLabel className={classString}>
				{title}
			</CFormLabel>
			<CFormInput
				type="text"
				id={title}
				value={value}
				readOnly={true}
				disabled={true}
			/>
		</CCol>
	)
}

export default TitleContentTemplate