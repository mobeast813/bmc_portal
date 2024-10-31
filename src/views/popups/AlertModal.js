import React, { useState } from "react";
import {
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

const AlertModal = () => {
	const showAlertModal = useSelector((state) => state.showAlertModal);
	const dispatch = useDispatch();
	return (
		<>
			<CModal
				alignment="center"
				visible={showAlertModal.isShow}
				onClose={() => dispatch({ type: "modal", showAlertModal: { isShow: false, title: "", msg: "" } })}
				aria-labelledby="VerticallyCenteredExample"
			>
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">{showAlertModal.title}</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center">{showAlertModal.msg}</CModalBody>
				<CModalFooter
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div className="d-grid gap-2 col-6 mx-auto">
						<CButton
							color="secondary"
							onClick={() => {
								dispatch({ type: "modal", showAlertModal: { isShow: false, title: "", msg: "" } })
							}
							}
						>
							확인
						</CButton>
					</div>
				</CModalFooter>
			</CModal >
		</>
	);
};

export default AlertModal;
