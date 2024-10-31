import React from "react";
import {
	CDropdown,
	CDropdownHeader,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
} from "@coreui/react";
import {
	cilSettings,
	cilAccountLogout,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

const AppHeaderDropdown = () => {
	const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

	return (
		<CDropdown variant="nav-item">
			<CDropdownToggle
				placement="bottom-end"
				caret={false}
			>
				<CIcon icon={cilSettings} size="lg" />
			</CDropdownToggle>
			<CDropdownMenu className="pt-0" placement="bottom-end">
				<CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
					Account
				</CDropdownHeader>
				<CDropdownItem
					href="#"
					onClick={(e) => {
						// 쿠키 삭제
						const headersCookies = new Cookies();
						removeCookie("accessToken", { path: '/', domain: 'keti.pro' });
						removeCookie("roleName");
						removeCookie("loggedInUserTabs");
						removeCookie("userId");

						headersCookies.remove("accessToken")
						headersCookies.remove("roleName")
						headersCookies.remove("loggedInUserTabs")
						headersCookies.remove("userId")

						console.log(cookies)
						console.log(headersCookies)

						// document.cookie =
						//   "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
						// document.cookie =
						//   "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
						navigate("/login");
					}}
				>
					<CIcon icon={cilAccountLogout} className="me-2" />
					로그아웃
				</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	);
};

export default AppHeaderDropdown;
