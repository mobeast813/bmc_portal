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

const ConfirmModal = (callBack) => {
	const showConfirmModal = useSelector((state) => state.showConfirmModal);
	const dispatch = useDispatch();
	return (
		<>
			<CModal
				alignment="center"
				visible={showConfirmModal.isShow}
				onClose={() => dispatch({ type: "modal", showConfirmModal: { isShow: false, title: "", msg: "" } })}
				aria-labelledby="VerticallyCenteredExample"
			>
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">{showConfirmModal.title}</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center pt-5 pb-5" style={{ whiteSpace: "pre-line" }}>
					{showConfirmModal.msg}
				</CModalBody>
				<CModalFooter
					style={{ display: "flex", justifyContent: "center" }}
				>
					<div className="d-grid col-6 mx-auto">
						<CButton
							className="me-1"
							color="secondary"
							onClick={() => {
								dispatch({
									type: "modal",
									showConfirmModal: { isShow: false, title: "", msg: "" }
								})
							}}
						>
							취소
						</CButton>
					</div>

					<div className="d-grid col-6 mx-auto">
						<CButton
							className="ms-2"
							color="primary"
							onClick={() => {
								showConfirmModal.onConfirm()
								dispatch({
									type: "modal",
									showConfirmModal: { isShow: false, title: "", msg: "" }
								})
							}}
						>
							확인
						</CButton>
					</div>
				</CModalFooter>
			</CModal >
		</>
	);
};

export default ConfirmModal;
