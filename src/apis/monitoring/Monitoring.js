// import { Cookies } from "react-cookie";
import api, { apiHeader } from "../Instance";


///통합모니터링 BMC서버 데이터 리스트 조회
export const getMonitorBmcServerList = async (props) => {
	const { userId, page } = props
	try {
		const response = await api.get(`/bmc/monitoring/${userId}/${page}`, {
			headers: apiHeader(),
		});
		console.log(response.data);
		// {
		//  "pages": 10,
		//  "vendor": ["KTNF", …],
		//  "boa": ["BOA1", …],
		//  "power": ["UP", "DOWN"],
		//  "fan": ["Normal", "Warning", "Critical"],
		// 	"monitoring": [
		// 		{
		// 			"bmc_UUID": "uuid_1",
		// 			"bmc_ip": "192.168.1.1",
		// 			"bmc_name": "bmc_1",
		// 			"boa_name": "BOA1",
		// 			"cpu_temp": "warning",
		// 			"fan": "normal",
		// 			"mem_temp": "critical",
		// 			"power": "normal",
		// 			"psu": "normal",
		// 			"user_id": "user_1",
		// 			"vendor": "hpe",
		// 			"version": "v1.0",
		// 			"volt": "warning"
		// 		}, {
		// 			"bmc_UUID": "uuid_2",
		// 			"bmc_ip": "192.168.1.2",
		// 			"bmc_name": "bmc_2",
		// 			"boa_name": "BOA2",
		// 			"cpu_temp": "normal",
		// 			"fan": "warning",
		// 			"mem_temp": "warning",
		// 			"power": "critical",
		// 			"psu": "critical",
		// 			"user_id": "user_1",
		// 			"vendor": "dell",
		// 			"version": "v1.1",
		// 			"volt": "normal"
		// 		},
		// 		{
		// 			"bmc_UUID": "uuid_3",
		// 			"bmc_ip": "192.168.1.3",
		// 			"bmc_name": "bmc_3",
		// 			"boa_name": "BOA3",
		// 			"cpu_temp": "critical",
		// 			"fan": "normal",
		// 			"mem_temp": "normal",
		// 			"power": "warning",
		// 			"psu": "warning",
		// 			"user_id": "user_1",
		// 			"vendor": "sm",
		// 			"version": "v1.2",
		// 			"volt": "critical"
		// 		},]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///통합모니터링 BMC서버 데이터 리스트 검색 조회
export const getSearchedMonitorBmcServerList = async (props) => {
	const { userId, vendor, boaName, power, fan, page } = props
	try {
		const response = await api.get(`/bmc/monitoring/${userId}/${vendor}/${boaName}/${power}/${fan}/${page}`, {
			headers: apiHeader(),
		});
		// {
		//  "pages": 10,
		// 	"monitoring": [
		// 		{
		// 			"bmc_UUID": "uuid_1",
		// 			"bmc_ip": "192.168.1.1",
		// 			"bmc_name": "bmc_1",
		// 			"boa_name": "BOA1",
		// 			"cpu_temp": "warning",
		// 			"fan": "normal",
		// 			"mem_temp": "critical",
		// 			"power": "normal",
		// 			"psu": "normal",
		// 			"user_id": "user_1",
		// 			"vendor": "hpe",
		// 			"version": "v1.0",
		// 			"volt": "warning"
		// 		}, {
		// 			"bmc_UUID": "uuid_2",
		// 			"bmc_ip": "192.168.1.2",
		// 			"bmc_name": "bmc_2",
		// 			"boa_name": "BOA2",
		// 			"cpu_temp": "normal",
		// 			"fan": "warning",
		// 			"mem_temp": "warning",
		// 			"power": "critical",
		// 			"psu": "critical",
		// 			"user_id": "user_1",
		// 			"vendor": "dell",
		// 			"version": "v1.1",
		// 			"volt": "normal"
		// 		},
		// 		{
		// 			"bmc_UUID": "uuid_3",
		// 			"bmc_ip": "192.168.1.3",
		// 			"bmc_name": "bmc_3",
		// 			"boa_name": "BOA3",
		// 			"cpu_temp": "critical",
		// 			"fan": "normal",
		// 			"mem_temp": "normal",
		// 			"power": "warning",
		// 			"psu": "warning",
		// 			"user_id": "user_1",
		// 			"vendor": "sm",
		// 			"version": "v1.2",
		// 			"volt": "critical"
		// 		},]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///센서 이벤트 로그 리스트 조회
export const getMonitorSensorEventLog = async (props) => {
	const { userId, page } = props
	try {
		const response = await api.get(`/bmc/sel/${userId}/${page}`, {
			headers: apiHeader(),
		});
		// {
		// 	"sel": [
		// 		{
		// 			"bmc_UUID": "UUID_1",
		// 			"bmc_ip": "192.168.1.1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"description": "Lower Critical going low",
		// 			"log_date": "2024-08-01 12:00:00",
		// 			"log_id": "01",
		// 			"sensor_num": "0x01",
		// 			"sensor_type": "Temperature",
		// 			"user_id": "user_1",
		// 			"vendor": "sm"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_2",
		// 			"bmc_ip": "192.168.1.2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"description": "Upper Non-Recoverable going high",
		// 			"log_date": "2024-08-02 13:00:00",
		// 			"log_id": "02",
		// 			"sensor_num": "0x02",
		// 			"sensor_type": "Voltage",
		// 			"user_id": "user_1",
		// 			"vendor": "hpe"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_3",
		// 			"bmc_ip": "192.168.1.3",
		// 			"bmc_name": "BMC3",
		// 			"boa_name": "BOA3",
		// 			"description": "Lower Non-Critical going low",
		// 			"log_date": "2024-08-03 14:00:00",
		// 			"log_id": "03",
		// 			"sensor_num": "0x03",
		// 			"sensor_type": "Fan",
		// 			"user_id": "user_1",
		// 			"vendor": "dell"
		// 		},]
		// }
		console.log(response.data)
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///센서 이벤트 로그 리스트 조회
export const getSearchedMonitorSensorEventLog = async (props) => {
	const { userId, vendor, boaName, sensorType, startDate, endDate, page } = props
	try {

		console.log(`/bmc/sel/${userId}/${vendor}/${boaName}/${sensorType}/${startDate}/${endDate}/${page}`)
		const response = await api.get(`/bmc/sel/${userId}/${vendor}/${boaName}/${sensorType}/${startDate}/${endDate}/${page}`, {
			headers: apiHeader(),
		});
		// {
		// 	"sel": [
		// 		{
		// 			"bmc_UUID": "UUID_1",
		// 			"bmc_ip": "192.168.1.1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"description": "Lower Critical going low",
		// 			"log_date": "2024-08-01 12:00:00",
		// 			"log_id": "01",
		// 			"sensor_num": "0x01",
		// 			"sensor_type": "Temperature",
		// 			"user_id": "user_1",
		// 			"vendor": "sm"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_2",
		// 			"bmc_ip": "192.168.1.2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"description": "Upper Non-Recoverable going high",
		// 			"log_date": "2024-08-02 13:00:00",
		// 			"log_id": "02",
		// 			"sensor_num": "0x02",
		// 			"sensor_type": "Voltage",
		// 			"user_id": "user_1",
		// 			"vendor": "hpe"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID_3",
		// 			"bmc_ip": "192.168.1.3",
		// 			"bmc_name": "BMC3",
		// 			"boa_name": "BOA3",
		// 			"description": "Lower Non-Critical going low",
		// 			"log_date": "2024-08-03 14:00:00",
		// 			"log_id": "03",
		// 			"sensor_num": "0x03",
		// 			"sensor_type": "Fan",
		// 			"user_id": "user_1",
		// 			"vendor": "dell"
		// 		},]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};