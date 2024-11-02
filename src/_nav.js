import React from "react";
import CIcon from "@coreui/icons-react";
import {
	cilAlbum, cilBasket,
	cilBell,
	cilCalculator,
	cilChartPie,
	cilCursor,
	cilDescription,
	cilDrop,
	cilLayers,
	cilNotes,
	cilPencil,
	cilPuzzle,
	cilScreenDesktop,
	cilSpeedometer,
	cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
const _nav = [
	{
		component: CNavItem,
		name: "DashBoard",
		id: 0,
		to: "/dashboard",
		icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
	},

	{
		component: CNavGroup,
		name: "BMC Device",
		id: 1,
		to: "/bmc-device",
		icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
		items: [
			{
				component: CNavItem,
				name: "BMC 서버 관리",
				id: 5,
				to: "/bmc-device/server",
			},
			{
				component: CNavItem,
				name: "BOA 그룹 관리",
				id: 6,
				to: "/bmc-device/boa-group",
			},
		],
	},
	{
		component: CNavGroup,
		name: "Monitoring",
		id: 2,
		to: "/monitoring",
		icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
		items: [
			{
				component: CNavItem,
				name: "통합모니터링",
				id: 7,
				to: "/monitoring/all",
			},
			{
				component: CNavItem,
				name: "Event Log",
				id: 8,
				to: "/monitoring/event-log",
			},
		],
	},
	{
		component: CNavGroup,
		name: "Maintenance",
		id: 3,
		icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
		items: [
			{
				component: CNavItem,
				name: "Inventory Catalog",
				id: 9,
				to: "/maintenance/inventory-catalog",
			},
		],
	},

	{
		component: CNavGroup,
		name: "Admin",
		id: 4,
		icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
		items: [
			{
				component: CNavItem,
				name: "사용자 관리",
				id: 10,
				to: "/admin/manage-user",
			},
			// {
			// 	component: CNavItem,
			// 	name: "사용자 권한 관리",
			// 	id: 11,
			// 	to: "/admin/manage-user-role",
			// },
		],
	},
];

export default _nav;
