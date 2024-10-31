// import { Cookies } from "react-cookie";
import { Cookies } from "react-cookie";
import api, { apiHeader } from "../Instance";


/// BMC by Vendor 데이터 조회
export const getDashboardVender = async (props) => {
	const { userId } = props

	console.log(apiHeader())
	try {
		const response = await api.get(`/bmc/dashboard/vendor/${userId}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_vendor": [
		// 		{
		// 			"dell": "7",
		// 			"hp": "5",
		// 			"intel": "6",
		// 			"ktnf": "7",
		// 			"user_id": "user_1"
		// 		}
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// Join/Unjoin 데이터 조회
export const getDashboardJoin = async (props) => {
	const { userId } = props
	try {
		const response = await api.get(`/bmc/dashboard/join/${userId}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_join": [
		// 		{
		// 			"join_num": "18",
		// 			"unjoin_num": "7",
		// 			"user_id": "user_1"
		// 		}
		// 	]
		// }

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// BOA GROUP 데이터 조회
export const getDashboardBoa = async (props) => {
	const { userId } = props
	try {
		const response = await api.get(`/bmc/dashboard/boa/${userId}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_boa": [
		// 		{
		// 			"bmc_num": "3",
		// 			"boa_name": "BOA1",
		// 			"user_id": "user_1"
		// 		},
		// 		{
		// 			"bmc_num": "7",
		// 			"boa_name": "BOA2",
		// 			"user_id": "user_1"
		// 		}
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// BMC POWER 데이터 조회
export const getDashboardPower = async (props) => {
	const { userId } = props
	try {
		const response = await api.get(`/bmc/dashboard/power/${userId}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_power": [
		// 		{
		// 			"power_down": "3",
		// 			"power_up": "19",
		// 			"user_id": "user_1"
		// 		}
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// Temperature 데이터 조회
export const getDashboardTemperature = async (props) => {
	const { userId, boaName } = props
	try {
		const response = await api.get(`/bmc/dashboard/temp/${userId}/${boaName}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_temp": [
		// 		{
		// 			"cpu_critical": "1",
		// 			"cpu_normal": "19",
		// 			"cpu_warning": "3",
		// 			"mem_critical": "6",
		// 			"mem_normal": "10",
		// 			"mem_warning": "5",
		// 			"user_id": "user_1"
		// 		}]
		// }

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// PowerSupply 데이터 조회
export const getDashboardPowerSupply = async (props) => {
	const { userId, boaName } = props
	try {
		const response = await api.get(`/bmc/dashboard/psu/${userId}/${boaName}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_psu": [
		// 		{
		// 			"psu_critical": 1,
		// 			"psu_normal": 2,
		// 			"psu_warning": 2
		// 		}
		// 	]
		// }

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// Voltage 데이터 조회
export const getDashboardVoltage = async (props) => {
	const { userId, boaName } = props
	try {
		const response = await api.get(`/bmc/dashboard/volt/${userId}/${boaName}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_volt": [
		// 		{
		// 			"volt_critical": 1,
		// 			"volt_normal": 2,
		// 			"volt_warning": 1
		// 		}
		// 	]
		// }

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// Fan 데이터 조회
export const getDashboardFan = async (props) => {
	const { userId, boaName } = props
	try {
		const response = await api.get(`/bmc/dashboard/fan/${userId}/${boaName}`, {
			headers: apiHeader(),
		});
		// {
		// 	"dash_fan": [
		// 		{
		// 			"fan_critical": 3,
		// 			"fan_normal": 1,
		// 			"fan_warning": 2
		// 		}
		// 	]
		// }


		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};