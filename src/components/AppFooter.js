import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
	return (
		<CFooter className="px-4">
			<h4>BMC Portal</h4>
			<div style={{ fontSize: "12px" }}>
				&copy; 서울특별시 금천구 가산디지털1로1 더루벤스밸리 505호 대표전화 : 070-7733-0247
				<br />COPYRIGHT ⓒ 2023 주식회사꾸미다. ALL RIGHT RESERVED.
			</div>
		</CFooter >
	);
};

export default React.memo(AppFooter);