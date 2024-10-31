import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	CCardTitle,
	CCol,
	CRow,
	CSidebar,
	CSidebarBrand,
	CSidebarFooter,
	CSidebarHeader,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";

// sidebar nav config
import navigation from "../_nav";
import { useCookies } from "react-cookie";

const AppSidebar = () => {
	const dispatch = useDispatch();
	const unfoldable = useSelector((state) => state.sidebarUnfoldable);
	const sidebarShow = useSelector((state) => state.sidebarShow);
	const loggedInUserTabs = useSelector((state) => state.loggedInUserTabs);
	const [filteredNav, setFilteredNav] = useState([]);
	const [cookies, setCookie] = useCookies(["loggedInUserTabs"]);


	useEffect(() => {
		const tabInfo = cookies.loggedInUserTabs;

		if (tabInfo) {
			const parsedTabs = tabInfo;

			// _nav 필터링하기
			const filtered = [...navigation].filter((item) =>
				parsedTabs.includes(item.id)
			);


			// 대시보드 항목을 찾아내기
			const dashboard = navigation.find((item) => item.id === 0);

			// 선택한 아이디만을 갖고 있는 객체로 필터링
			const filteredItems = filtered.map((item) => {
				if (Array.isArray(item.items)) {
					item.items = item.items.filter((subItem) =>
						parsedTabs.includes(subItem.id)
					);
				}
				return item;
			});

			filteredItems.unshift(dashboard); // 대시보드 항목 배열 맨 앞에 추가
			setFilteredNav(filteredItems);
		}
	}, [cookies, navigation]);

	return (
		<CSidebar
			className="border-end"
			// colorScheme="dark"
			position="fixed"
			unfoldable={unfoldable}
			visible={sidebarShow}
			onVisibleChange={(visible) => {
				dispatch({ type: "set", sidebarShow: visible });
			}}
		>
			<CSidebarHeader className="border-bottom">
				<CSidebarBrand to="/">
					<CRow className="align-items-center">
						<CCol className="align-items-center">
							<CRow className="d-flex align-items-center">
								<CCardTitle style={{ fontWeight: "bold" }}>
									BMC Portal
								</CCardTitle>
							</CRow>
						</CCol>
					</CRow>
				</CSidebarBrand>
			</CSidebarHeader>
			<AppSidebarNav items={filteredNav} />
			<CSidebarFooter className="border-top d-none d-lg-flex">
				{/* <CSidebarToggler
          onClick={() =>
            dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
          }
        /> */}
			</CSidebarFooter>
		</CSidebar>
	);
};

export default React.memo(AppSidebar);
