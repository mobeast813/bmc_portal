import React from "react";
import {
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
} from "@coreui/react";

const AlertPopup = ({ visible, setVisible, msg, func }) => {
	return (
		<>
			<CModal
				alignment="center"
				visible={visible}
				onClose={func || (() => setVisible(false))}
				aria-labelledby="VerticallyCenteredExample"
			>
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">⚠️ 알림</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center">{msg}</CModalBody>
				<CModalFooter
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div className="d-grid gap-2 col-6 mx-auto">
						<CButton
							color="secondary"
							onClick={func || (() => setVisible(false))}
						>
							확인
						</CButton>
					</div>
				</CModalFooter>
			</CModal>
		</>
	);
};

export default AlertPopup;
