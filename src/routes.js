import React from "react";
import Page500 from "./views/error/Page500";
import Page404 from "./views/error/Page404";



const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const BmcServerMain = React.lazy(() => import("./views/bmcDevices/bmcServer/BmcServerMain"));
const BoaGroupMain = React.lazy(() => import("./views/bmcDevices/boaGroup/BoaGroupMain"));
const MonitoringMain = React.lazy(() => import("./views/monitoring/bmc_monitoring/MonitoringMain"));
const EventLogMain = React.lazy(() => import("./views/monitoring/eventLog/EventLogMain"));
const InventoryCatalogMain = React.lazy(() => import("./views/maintenance/InventoryCatalogMain"));



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

	// path: "/bmc-device/boa-group",
	// name: "BOA Group",
	// element: BmcServer,
	// protected: true,
	// },

	// {
	// 	path: "/service",
	// 	name: "Service",
	// 	element: PrivacyPolicy,
	// 	exact: true,
	// 	protected: true,
	// },
	// { path: "/service/notice", name: "Notice", element: Notice, protected: true },
	// {
	// 	path: "/service/notice/register",
	// 	name: "NoticeRegister",
	// 	element: NoticeRegister,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/notice/modify/:id",
	// 	name: "NoticeModify",
	// 	element: NoticeModify,
	// 	protected: true,
	// },
	// { path: "/service/terms", name: "Terms", element: Terms, protected: true },
	// {
	// 	path: "/service/terms/register/:version",
	// 	name: "Terms Register",
	// 	element: TermsRegister,
	// 	protected: true,
	// },

	// {
	// 	path: "/service/terms/modify/:id",
	// 	name: "Terms Modify",
	// 	element: TermsModify,
	// 	protected: true,
	// },

	// {
	// 	path: "/service/privacy-policy",
	// 	name: "Privacy Policy",
	// 	element: PrivacyPolicy,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/privacy-policy/register/:version",
	// 	name: "Privacy Policy Register",
	// 	element: PrivacyPolicyRegister,
	// 	protected: true,
	// },

	// {
	// 	path: "/service/privacy-policy/modify/:id",
	// 	name: "Privacy Policy Modify",
	// 	element: PrivacyPolicyModify,
	// 	protected: true,
	// },

	// {
	// 	path: "/service/manage-main",
	// 	name: "Manage Main",
	// 	element: ManageMain,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/push-alarm",
	// 	name: "Push Alarm",
	// 	element: PushAlarm,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/message-alarm",
	// 	name: "Message Alarm",
	// 	element: MessageAlarm,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/manage-manager",
	// 	name: "Manage Manager",
	// 	element: ManageManager,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/manage-authority",
	// 	name: "Manage Authority",
	// 	element: ManageAuthority,
	// 	protected: true,
	// },
	// {
	// 	path: "/service/manage-logs",
	// 	name: "Manage Logs",
	// 	element: ManageLogs,
	// 	protected: true,
	// },

	// {
	// 	path: "/member",
	// 	name: "Member",
	// 	element: ManageMember,
	// 	exact: true,
	// 	protected: true,
	// },
	// {
	// 	path: "/member/manage-member",
	// 	name: "Manage Member",
	// 	element: ManageMember,
	// 	protected: true,
	// },
	// {
	// 	path: "/member/manage-member/detail/:id",
	// 	name: "Member Detail",
	// 	element: MemberDetail,
	// 	protected: true,
	// },
	// {
	// 	path: "/member/manage-member/detail/participate/:id",
	// 	name: "Member Detail Participate",
	// 	element: MemberDetailParticipate,
	// 	protected: true,
	// },
	// {
	// 	path: "/member/manage-member/detail/participateNumber/:id",
	// 	name: "Member Detail ParticipateNumber",
	// 	element: MemberDetailParticipateNumber,
	// 	protected: true,
	// },
	// {
	// 	path: "/member/manage-ticket",
	// 	name: "Manage Ticket",
	// 	element: ManageTicket,
	// 	protected: true,
	// },

	// {
	// 	path: "/apply",
	// 	name: "Apply",
	// 	element: Apply,
	// 	exact: true,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-apply",
	// 	name: "Manage Apply",
	// 	element: Apply,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-apply/register",
	// 	name: "Register Apply",
	// 	element: RegisterApply,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-apply/modify/:id",
	// 	name: "Modify Apply",
	// 	element: ModifyApply,
	// 	protected: true,
	// },

	// {
	// 	path: "/apply/manage-applyer",
	// 	name: "Manage Applyer",
	// 	element: ManageApplyer,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-applyer/detail/:id",
	// 	name: "Applyer Detail",
	// 	element: ApplyerDetail,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-delivery",
	// 	name: "Manage Delivery",
	// 	element: ManageDelivery,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-delivery/detail/:id",
	// 	name: "Manage Delivery",
	// 	element: DeliveryDetail,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-comments",
	// 	name: "Manage Comments",
	// 	element: ManageComments,
	// 	protected: true,
	// },
	// {
	// 	path: "/apply/manage-review",
	// 	name: "Manage Review",
	// 	element: ManageReview,
	// 	protected: true,
	// },

	// {
	// 	path: "/event",
	// 	exact: true,
	// 	name: "Event",
	// 	element: Event,
	// 	protected: true,
	// },
	// {
	// 	path: "/event/event-info",
	// 	name: "Event Info",
	// 	element: Event,
	// 	protected: true,
	// },
	// {
	// 	path: "/event/event-info/register",
	// 	name: "Event Register",
	// 	element: EventRegister,
	// 	protected: true,
	// },
	// {
	// 	path: "/event/event-info/modify/:id",
	// 	name: "Event Modify",
	// 	element: EventModify,
	// 	protected: true,
	// },
	// {
	// 	path: "/event/manage-comments",
	// 	name: "Manage Comments",
	// 	element: EventComments,
	// 	protected: true,
	// },
	// {
	// 	path: "/ticket",
	// 	name: "Ticket",
	// 	element: Ticket,
	// 	exact: true,
	// 	protected: true,
	// },
	// {
	// 	path: "/ticket/manage-ticket-event",
	// 	name: "Manage Ticket Event",
	// 	element: Ticket,
	// 	protected: true,
	// },
	// {
	// 	path: "/ticket/register",
	// 	name: "Ticket Register",
	// 	element: TicketEventRegister,
	// 	protected: true,
	// },
	// {
	// 	path: "/ticket/modify/:id",
	// 	name: "Ticket Modify",
	// 	element: TicketModify,
	// 	protected: true,
	// },

	// {
	// 	path: "/ticket/detail/:id",
	// 	name: "Ticket Detail",
	// 	element: TicketDetail,
	// 	protected: true,
	// },

	// {
	// 	path: "/ticket/sns-detail/:id",
	// 	name: "Ticket SNS Detail",
	// 	element: TicketSNSDetail,
	// 	protected: true,
	// },


	// Product routes
	// { path: "/product/manage", name: "Product", element: ProductInfo, exact: true, protected: true },
	// { path: "/product/modify/:id", name: "Product Info", element: ProductModify, protected: true },
	// { path: "/product/register", name: "Product Register", element: ProductRegister, protected: true },
	// { path: "/product/category", name: "Product Category", element: Category, protected: true },

];

export default routes;
