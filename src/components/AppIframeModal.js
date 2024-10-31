import { CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import ButtonSecondary from "./buttons/ButtonSecondary";

const AppIfameModal = (props) => {
	const { url, visible, setVisible } = props
	return (
		< CModal
			size="xl"
			alignment="center"
			visible={visible}
			onClose={() => { setVisible(false) }}
			labelledby="VerticallyCenteredExample">
			<CModalHeader>
				<CModalTitle id="VerticallyCenteredExample">BMC서버 Console</CModalTitle>
			</CModalHeader>
			<CModalBody className="text-center m-3">
				<CForm>
					<CRow className="mb-3">
						<div className="embed-responsive embed-responsive-1by1">
							{/* <iframe className="embed-responsive-item" src={url} allowFullScreen></iframe> */}
							<iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowFullScreen></iframe>
						</div>
					</CRow>
				</CForm>
			</CModalBody>
			<CModalFooter>
				<div className="d-flex col-12 mx-auto">
					<CCol className="me-2 col-12">
						<ButtonSecondary text="취소" onClick={() => { setVisible(false) }} />
					</CCol>
				</div>
			</CModalFooter>
		</CModal >


	)
}

export default AppIfameModal;