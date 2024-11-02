import React from "react";
import Page500 from "./views/error/Page500";
import Page404 from "./views/error/Page404";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const BmcServerMain = React.lazy(() => import("./views/bmcDevices/bmcServer/BmcServerMain"));
const BoaGroupMain = React.lazy(() => import("./views/bmcDevices/boaGroup/BoaGroupMain"));
const MonitoringMain = React.lazy(() => import("./views/monitoring/bmc_monitoring/MonitoringMain"));
const EventLogMain = React.lazy(() => import("./views/monitoring/eventLog/EventLogMain"));
const InventoryCatalogMain = React.lazy(() => import("./views/maintenance/InventoryCatalogMain"));
const UserManagementMain = React.lazy(() => import("./views/admin/userManagement/UserManagementMain"));
const UserRoleManagementMain = React.lazy(() => import("./views/admin/userRoleManagement/UserRoleManagementMain"));



const routes = [
	{
		path: "/500",
		name: "500 Error",
		element: Page500,
		protected: true,
	},
	{
		path: "/404",
		name: "404 Error",
		element: Page404,
		protected: true,
	},
	{ path: "/", exact: true, name: "Home" },
	{
		path: "/dashboard",
		name: "Dashboard",
		element: Dashboard,
		protected: true,
	},
	{
		path: "/bmc-device/server",
		name: "BMC Server",
		element: BmcServerMain,
		protected: true,
	},
	{
		path: "/bmc-device/boa-group",
		name: "BOA Group",
		element: BoaGroupMain,
		protected: true,
	},
	{
		path: "/monitoring/all",
		name: "Monitoring BMC",
		element: MonitoringMain,
		protected: true,
	},
	{
		path: "/monitoring/event-log",
		name: "Monitoring Event Log",
		element: EventLogMain,
		protected: true,
	},
	{
		path: "/maintenance/inventory-catalog",
		name: "BMC Inventory Catalog",
		element: InventoryCatalogMain,
		protected: true,
	},
	{
		path: "/admin/manage-user",
		name: "User Management",
		element: UserManagementMain,
		protected: true,
	},
	{
		path: "/admin/manage-user-role/:userId",
		name: "User Role Management",
		element: UserRoleManagementMain,
		protected: true,
	},

];

export default routes;
