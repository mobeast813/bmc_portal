import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import { Cookies } from "react-cookie";

// routes config
import routes from "../routes";
import UserRoleManagementMain from "../views/admin/userRoleManagement/UserRoleManagementMain";

const AppContent = () => {
	// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
	const getCookie = (name) => {
		const cookieArr = document.cookie.split(";");

		for (let i = 0; i < cookieArr.length; i++) {
			const cookiePair = cookieArr[i].split("=");

			// 쿠키 이름과 일치하는 쿠키 값을 반환
			if (name === cookiePair[0].trim()) {
				return decodeURIComponent(cookiePair[1]);
			}
		}

		// 쿠키를 찾지 못한 경우 null 반환
		return null;
	};

	return (
		<CContainer className="px-4" lg style={{ maxWidth: "100%" }}>
			<Suspense fallback={<CSpinner color="primary" />}>
				<Routes>
					{/* <Route path="/admin/manage-user-role/:id" element={<UserRoleManagementMain />} /> */}
					{routes.map((route, idx) => {
						return (
							route.element && (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									// element={<route.element />}
									element={
										route.protected && getCookie("accessToken") != null ? ( // 로컬에 저장한 accessToken이 만료가 안됐을 때로 바꿔야함
											<route.element />
										) : (
											<Navigate to="/login" replace />
										)
									}
								/>
							)
						);
					})}
					<Route path="/" element={<Navigate to="login" replace />} />
				</Routes>
			</Suspense>
		</CContainer>
	);
};

export default React.memo(AppContent);
