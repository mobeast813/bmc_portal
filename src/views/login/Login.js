import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import AlertPopup from "../popups/AlertPopup";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/user/UserApi";
import RegisterUserModal from "../registerUser/RegisterUserModal";


const Login = () => {
	const navigate = useNavigate();
	const [idValue, setId] = useState("");
	const [pwValue, setPw] = useState("");
	const [visible, setVisible] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [accessCookies, setAccessCookie] = useCookies(["accessToken"]);
	const [tabCookies, setTabCookie] = useCookies(["loggedInUserTabs"]);

	// 관리자 정보
	const [userId, setUserIdCookie] = useCookies(["userId"]);
	const [roleName, setRoleNameCookie] = useCookies(["roleName"]);

	const dispatch = useDispatch();
	const showAlertModal = useSelector((state) => state.showAlertModal);

	//회원가입 팝업
	const [registerUserPopupVisible, setRegisterUserPopupVisible] = useState(false);

	const checkLogin = async () => {
		// 아이디 미 입력 시
		if (idValue === "") {
			setAlertMsg("아이디를 입력해주세요.");
			setVisible(true);
		}
		// 비밀번호 미 입력 시
		else if (pwValue === "") {
			setAlertMsg("비밀번호를 입력해주세요.");
			setVisible(true);
		}
		// 계정 검사
		else {
			// const response = await checkUserIdDuplication({ userId: idValue });

			login({ userId: idValue, password: pwValue })
				.then(async (response) => {
					const accessToken = response.token;
					console.log(accessToken)
					// 토큰 저장
					setAccessCookie("accessToken", accessToken);
					setUserIdCookie("userId", idValue);
					setRoleNameCookie("roleName", response.user_auth);


					console.log(accessCookies)
					//todo : 관리자 여부에 따른 메뉴 할당
					// const isAdmin = roleName === "Admin"
					const isAdmin = true

					if (isAdmin) {
						setTabCookie("loggedInUserTabs", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
					} else {
						setTabCookie("loggedInUserTabs", [1, 2, 3, 5, 6, 7, 8, 9]);
					}
					navigate("/dashboard");

				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "로그인 오류", msg: "아이디/비밀번호를 다시 확인해주세요" } });
				});
		}
	}

	const saveUserId = (event) => {
		setId(event.target.value);
	};

	const saveUserPw = (event) => {
		setPw(event.target.value);
	};

	return (
		<div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={8}>
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody className="text-center">
									<CForm className="d-flex flex-column align-items-center">
										<h3 className="mb-3">로그인</h3>
										{/* <p className="text-body-secondary">
                      관리자 계정으로 로그인하세요.
                    </p> */}
										<CInputGroup className="mb-3 w-50">
											<CInputGroupText>
												<CIcon icon={cilUser} />
											</CInputGroupText>
											<CFormInput
												placeholder="아이디"
												autoComplete="username"
												value={idValue}
												onChange={saveUserId}
											/>
										</CInputGroup>
										<CInputGroup className="mb-4 w-50">
											<CInputGroupText>
												<CIcon icon={cilLockLocked} />
											</CInputGroupText>
											<CFormInput
												type="password"
												placeholder="비밀번호"
												autoComplete="current-password"
												value={pwValue}
												onChange={saveUserPw}
											/>
										</CInputGroup>
										<CCol className="d-flex justify-content-center mb-2" sm={12}>
											<CButton
												color="primary"
												className="col-sm-6"
												onClick={checkLogin}
											>
												로그인
											</CButton>
										</CCol>
										<CCol className="d-flex justify-content-center " sm={12}>
											<CButton
												color="secondary"
												className="col-sm-6"
												// onClick={() => { navigate("/register") }}
												onClick={() => { setRegisterUserPopupVisible(true) }}
											>
												회원가입
											</CButton>
										</CCol>
									</CForm>
								</CCardBody>
							</CCard>
						</CCardGroup>
						<br />
						<p className="text-center">
							※ 로그인 관련 문의는 담당자에게 문의하세요.
						</p>
						{/* <CCol className="text-right">
							<Link to="/register">
								<CButton color="link">회원가입</CButton>
							</Link>
						</CCol> */}
					</CCol>
				</CRow>
			</CContainer>
			<AlertPopup visible={visible} setVisible={setVisible} msg={alertMsg} />
			<RegisterUserModal
				visible={registerUserPopupVisible}
				setVisible={setRegisterUserPopupVisible}
			/>
		</div>
	);
};

export default Login;
