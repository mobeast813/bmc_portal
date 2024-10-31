import { CCol, CFormInput, CFormLabel } from "@coreui/react"

const TitleContentTemplate = (props) => {
	const { title, value } = props
	return (
		<CCol sm={6} className="d-flex align-items-center">
			<CFormLabel className="col-form-label col-3 me-2">
				{title}
			</CFormLabel>
			<CFormInput
				type="text"
				id={title}
				value={value}
				readOnly={true}
			/>
		</CCol>
	)
}

export default TitleContentTemplate