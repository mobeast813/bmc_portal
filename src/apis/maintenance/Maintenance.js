// import { Cookies } from "react-cookie";
import api, { apiHeader } from "../Instance";


///BMC Inventory Catalog 리스트 조회
export const getBmcInventoryCatalogList = async (props) => {
	const { userId, page } = props
	try {
		const response = await api.get(`/bmc/inventory/${userId}/${page}`, {
			headers: apiHeader(),
		});
		// {
		// 	"inventory": [
		// 		{
		// 			"bmc_UUID": "UUID_1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"cpu_vendor": "intel",
		// 			"fan_status": "critical",
		// 			"firmware_version": "v1.0",
		// 			"memory_status": "normal",
		// 			"psu_status": "warning",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor1"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"cpu_vendor": "amd",
		// 			"fan_status": "warning",
		// 			"firmware_version": "v1.1",
		// 			"memory_status": "critical",
		// 			"psu_status": "normal",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor2"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_3",
		// 			"bmc_name": "BMC3",
		// 			"boa_name": "BOA3",
		// 			"cpu_vendor": "arm",
		// 			"fan_status": "normal",
		// 			"firmware_version": "v1.2",
		// 			"memory_status": "warning",
		// 			"psu_status": "critical",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor3"
		// 		},]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///BMC Inventory Catalog 리스트 조회
export const getSearchedBmcInventoryCatalogList = async (props) => {
	const { userId, vendor, boa, page } = props
	try {
		const response = await api.get(`/bmc/inventory/${userId}/${vendor}/${boa}/${page}`, {
			headers: apiHeader(),
		});
		// {
		// 	"inventory": [
		// 		{
		// 			"bmc_UUID": "UUID_1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"cpu_vendor": "intel",
		// 			"fan_status": "critical",
		// 			"firmware_version": "v1.0",
		// 			"memory_status": "normal",
		// 			"psu_status": "warning",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor1"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"cpu_vendor": "amd",
		// 			"fan_status": "warning",
		// 			"firmware_version": "v1.1",
		// 			"memory_status": "critical",
		// 			"psu_status": "normal",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor2"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_3",
		// 			"bmc_name": "BMC3",
		// 			"boa_name": "BOA3",
		// 			"cpu_vendor": "arm",
		// 			"fan_status": "normal",
		// 			"firmware_version": "v1.2",
		// 			"memory_status": "warning",
		// 			"psu_status": "critical",
		// 			"user_id": "user_1",
		// 			"vendor": "Vendor3"
		// 		},]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///BMC Inventory Catalog 상세 정보 조회
export const getBmcInventoryCatalogDetail = async (props) => {
	const { bmcUUID } = props
	try {
		const response = await api.get(`/bmc/inventory/detail/${bmcUUID}`, {
			headers: apiHeader(),
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///Power Control set 적용
export const updatePowerControlSet = async (props) => {
	const { powerOption, bmcUUID, bmcIp } = props
	try {
		// 0 : Reset Server
		// 1 : Power Off Server – Immediate
		// 2 : Power Off Server – Orderly Shutdown
		// 3 : Power On Server
		// 4 : Power Cycle Server
		const bodyParams = {
			"power_option": powerOption,
			"bmc_UUID": bmcUUID,
			"bmc_ip": bmcIp
		}
		// const response = await api.post(`/bmc/power/set`, {
		// 	bodyParams,
		// 	headers: apiHeader(),
		// });
		// return response.status === 200;
		console.log(bodyParams);
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///Power Control set 적용
export const updateFanControlSet = async (props) => {
	const { fanOption, bmcUUID, bmcIp } = props
	try {
		// 0 : Set Fan to Standard Speed
		// 1 : Set Fan to Full Speed
		// 2 : Set Fan to Optimal Speed
		// 3 : Set Fan to HeavyIO Speed
		const bodyParams = {
			"fan_option": fanOption,
			"bmc_UUID": bmcUUID,
			"bmc_ip": bmcIp
		}
		// const response = await api.post(`/bmc/fan/set`, {
		// 	bodyParams,
		// 	headers: apiHeader(),
		// });
		// return response.status === 200;
		console.log(bodyParams);
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

