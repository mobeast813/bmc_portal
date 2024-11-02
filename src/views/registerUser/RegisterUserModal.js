import { CCol, CContainer, CForm, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SelectBox from "../../components/selectBox/SelectBox";
import { SetSelectBoxOptions } from "../../utils/Utilities";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";
import { checkUserIdDuplication, getBoaList, registerUser } from "../../apis/user/UserApi";
import { MultiSelect } from "react-multi-select-component";
import InputTitleTemplate from "../../components/text/InputTitleTemplate";


const RegisterUserModal
	= (props) => {
		const { visible, setVisible } = props;
		const dispatch = useDispatch();

		const [isUniqueId, setIsUniqueId] = useState(false);
		const [duplicationCheclButtonDisabled, setDuplicationCheckButtonDisabled] = useState(false);
		const [isDataValidate, setIsDataValidate] = useState(false);

		const [userId, setUserId] = useState();
		const [userName, setUserName] = useState();
		const [email, setEmail] = useState();
		const [password, setPassword] = useState();
		const [passwordConfirm, setPasswordConfirm] = useState();
		const [isSamePassword, setIsSamePassword] = useState(false);
		const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState([]);
		const [selectedBoaItems, setSelectedBoaItems] = useState([]);

		const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

		useEffect(() => {
			setIsDataValidate(regPass.test(password) && [userName, email, isSamePassword, isUniqueId, selectedBoaItems].every((element => element)))
		}, [userName, email, isSamePassword, isUniqueId, selectedBoaItems])

		useEffect(() => {
			getBoaList()
				.then(async (response) => {
					if (response.boa.length > 0) {
						setBoaGroupSelectBoxOption(response.boa)
					} else {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "BOA그룹정보가 없습니다." } });
					}
				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "BOA그룹정보를 가져올 수 없습니다." } });
				})
		}, [])

		useEffect(() => {
			setIsUniqueId(false)
			setDuplicationCheckButtonDisabled(userId ? false : true)
		}, [userId])

		useEffect(() => {
			setIsSamePassword(password === passwordConfirm)
		}, [password, passwordConfirm])

		const registerRequest = () => {
			const isVaild = [userName, email, password, passwordConfirm, selectedBoaItems].every(item => item)
			if (isVaild) {

				const boaItems = [];
				selectedBoaItems.map((item) => {
					boaItems.push(item.value);
				})

				registerUser({
					userId: userId,
					userName: userName,
					email: email,
					password: password,
					boaList: boaItems
				})
					.then(async (response) => {
						if (response) {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "사용자 등록 완료", msg: "사용자 등록을 완료하였습니다." } });
						} else {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "사용자 등록에 실패하였습니다." } });
						}
						setVisible(false)
					})
					.catch((error) => {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "사용자 등록에 문제가 있습니다. 확인해주세요" } });
					});
			} else {
				dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "항목을 모두 작성해 주세요" } });
			}
			// todo : 생성 테스트 해봐야함
		}

		const idDuplicationCheck = () => {
			if (userId) {

				checkUserIdDuplication({ userId: userId })
					.then((isUsable) => {
						if (isUsable) {
							setIsUniqueId(true)
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "사용할 수 있는 아이디입니다." } });
						} else {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "중복된 아이디 입니다.\n다른 아이디를 사용해주세요" } });
						}
					})
					.catch((error) => {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "중복체크에 문제가 있습니다. 다시 시도해주세요" } });
					})
			} else {
				dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "아이디를 입력해주세요" } });
			}
		}

		const clearAndClose = () => {
			setUserId("");
			setUserName("");
			setEmail("");
			setPassword("");
			setSelectedBoaItems([]);
			setIsSamePassword();
			setVisible(false);
		}


		const [selected, setSelected] = useState([]);
		const options = [
			{ label: "Grapes 🍇", value: "grapes" },
			{ label: "Mango 🥭", value: "mango" },
			{ label: "Strawberry 🍓", value: "strawberry", disabled: true },
		];

		return (

			< CModal
				size="lg"
				alignment="center"
				visible={visible}
				backdrop={'static'}
				onClose={() => { clearAndClose() }}
				labelledby="VerticallyCenteredExample">
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">회원가입</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center m-3">
					<CForm>
						<CRow className="mb-3">
							<CCol className="col-9">
								<InputTitleTemplate title="아이디" setOnChange={setUserId} col={4} />
							</CCol>
							<CCol className="col-3">
								<ButtonPrimary text="중복체크" onClick={() => idDuplicationCheck()} disabledState={duplicationCheclButtonDisabled} />
							</CCol>
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="비밀번호" setOnChange={setPassword} type='password' />
							{password && !regPass.test(password) && (
								<CCol className="col-12 d-flex">
									<p className="me-3  text-start col-3"> </p>
									<p className="mt-1  text-start col-9" style={{ color: "#ff5757" }}> 비밀번호는 최소 8자리 이상 영문자 + 숫자 + 특수문자 20자리 이내로 등록하셔야 합니다.
									</p>
								</CCol>
							)}
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="비밀번호 확인" setOnChange={setPasswordConfirm} type='password' />
							{passwordConfirm && !isSamePassword && (
								<CCol className="col-12 d-flex">
									<p className="me-3  text-start col-3"> </p>
									<p className="mt-1  text-start col-9" style={{ color: "#ff5757" }}> 비밀번호가 다릅니다.</p>
								</CCol>
							)}
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="이름" setOnChange={setUserName} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="이메일 주소" setOnChange={setEmail} />
						</CRow>

						<CRow className="mb-3">
							<CCol sm={12} className="d-flex align-items-center">
								<CFormLabel className="col-form-label col-3 me-2">
									BOA
								</CFormLabel>

								{/* <SelectBox
									options={SetSelectBoxOptions(boaGroupSelectBoxOption, "선택")}
									callBack={(value) => setSelectedBoaItems(value)} /> */}
								<MultiSelect
									className="col-9"
									options={SetSelectBoxOptions(boaGroupSelectBoxOption)}
									value={selectedBoaItems}
									onChange={setSelectedBoaItems}
									labelledBy="ㅁㄴㅇㄹㅁㄴㅇ"
									disableSearch={true}
								/>
							</CCol>
						</CRow>
					</CForm>
				</CModalBody>
				<CModalFooter>
					<div className="d-flex col-6 mx-auto">
						<CCol className="me-2 col-6">
							<ButtonSecondary text="취소" onClick={() => { clearAndClose() }} />
						</CCol>
						<CCol className="me-2 col-6">
							<ButtonPrimary text="등록 요청" onClick={() => { registerRequest() }} disabledState={!isDataValidate} />
						</CCol>
					</div>
				</CModalFooter>
			</CModal >
		)
	}


export default RegisterUserModal
	;