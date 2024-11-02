import api, { apiHeader } from "../Instance";

///사용자 정보 리스트 조회
export const getUserList = async (props) => {
	const { page } = props
	try {
		const response = await api.get(`/user/get_list/${page}`, {
			headers: apiHeader()
		});
		// {
		// 	"users": [
		// 		{
		// 			"created_date": "2024-08-01 19:00:00",
		// 			"user_email": "johndoe1@example.com",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe"
		// 		},
		// 		{
		// 			"created_date": "2024-08-11 04:00:00",
		// 			"user_email": "hannahgold@example.com",
		// 			"user_id": "user10",
		// 			"user_name": "Hannah Gold"
		// 		},
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///사용자 정보 리스트 이름검색 조회
export const getSearchedUserList = async (props) => {
	const { userName, page } = props
	try {
		const response = await api.get(`/user/get_list/${userName}/${page}`, {
			headers: apiHeader(),
		});
		// {
		// 	"users": [
		// 		{
		// 			"created_date": "2024-08-01 19:00:00",
		// 			"user_email": "johndoe1@example.com",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe"
		// 		},
		// 		{
		// 			"created_date": "2024-08-11 04:00:00",
		// 			"user_email": "hannahgold@example.com",
		// 			"user_id": "user10",
		// 			"user_name": "Hannah Gold"
		// 		},
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


/// 사용자 정보 삭제
export const deleteUser = async (props) => {
	const { userId } = props
	try {
		const bodyParams = { "user_id": userId }
		// const response = await api.post(`/user/delete`, {
		// 	params: bodyParams,
		// 	headers: apiHeader()
		// });

		// console.log(response.status)
		// return response.status === 200;
		console.log(bodyParams)
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// 사용자가 관리하는 BMC 리스트 조회
export const getBmcListByUserId = async (props) => {
	const { userId, page } = props
	try {
		const response = await api.get(`/user/auth/${userId}/${page}`, {
			headers: apiHeader()
		});
		// {
		// 	"user_auth": [
		// 		{
		// 			"bmc_UUID": "UUID-001",
		// 			"boa_name": "BOA1",
		// 			"created_date": "2024-07-01 19:15:30",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe",
		// 			"vendor": "Dell"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID-011",
		// 			"boa_name": "BOA1",
		// 			"created_date": "2024-07-11 18:10:15",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe",
		// 			"vendor": "SuperMicro"
		// 		}
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// 사용자가 관리하는 BMC 리스트 조회
export const getSearchedBmcListByUserId = async (props) => {
	const { userId, vendor, boa, page } = props
	try {
		const response = await api.get(`/user/auth/${userId}/${vendor}/${boa}/${page}`, {
			headers: apiHeader()
		});
		// {
		// 	"user_auth": [
		// 		{
		// 			"bmc_UUID": "UUID-001",
		// 			"boa_name": "BOA1",
		// 			"created_date": "2024-07-01 19:15:30",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe",
		// 			"vendor": "Dell"
		// 		},
		// 		{
		// 			"bmc_UUID": "UUID-011",
		// 			"boa_name": "BOA1",
		// 			"created_date": "2024-07-11 18:10:15",
		// 			"user_id": "user1",
		// 			"user_name": "John Doe",
		// 			"vendor": "SuperMicro"
		// 		}
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// 사용자가 관리하는 BMC 서버 권한 삭제
export const deleteBmcAuthByUserId = async (props) => {
	const { userId, bmcUUID } = props
	try {
		const bodyParams = {
			"user_id": userId,
			"bmc_UUID": bmcUUID
		}
		// const response = await api.post(`/user/auth/delete`, {
		// 	params: bodyParams,
		// 	headers: apiHeader()
		// });

		// return response.data;
		console.log(bodyParams)
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// Unjoin 상태의 BMC List 조회
export const getUnjoinedBmcList = async (props) => {
	const { userId } = props
	try {
		const response = await api.get(`/user/bmc_unjoin/${userId}`, {
			headers: apiHeader()
		});
		// {
		// 	"unjoin_bmc": [
		// 		{
		// 			"bmc_UUID": "4b3c3f85-ca37-5659-9263-a53b4be0ce2f",
		// 			"bmc_ip": "10.0.0.1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"vendor": "Dell"
		// 		},
		// 		{
		// 			"bmc_UUID": "4b3c3f85-ca37-5659-9263-a53b4be0ce2f",
		// 			"bmc_ip": "10.0.0.2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"vendor": "HPE"
		// 		},
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// Unjoin 상태의 BMC List 검색 조회
export const getSearchedUnjoinedBmcList = async (props) => {
	const { userId, vendor, boa } = props
	console.log(userId, vendor, boa)
	console.log(`/user/bmc_unjoin/${userId}/${vendor}/${boa}`)
	try {
		const response = await api.get(`/user/bmc_unjoin/${userId}/${vendor}/${boa}`, {
			headers: apiHeader()
		});
		// {
		// 	"unjoin_bmc": [
		// 		{
		// 			"bmc_UUID": "4b3c3f85-ca37-5659-9263-a53b4be0ce2f",
		// 			"bmc_ip": "10.0.0.1",
		// 			"bmc_name": "BMC1",
		// 			"boa_name": "BOA1",
		// 			"vendor": "Dell"
		// 		},
		// 		{
		// 			"bmc_UUID": "4b3c3f85-ca37-5659-9263-a53b4be0ce2f",
		// 			"bmc_ip": "10.0.0.2",
		// 			"bmc_name": "BMC2",
		// 			"boa_name": "BOA2",
		// 			"vendor": "HPE"
		// 		},
		// 	]
		// }
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// 사용자의 BMC 권한 부여 요청
export const updateUserBmcAuth = async (props) => {
	const { bmcUUIDList, authorization, userId } = props
	try {
		const bodyParams = { "bmc_UUID": bmcUUIDList, "user_id": userId, "authorization": authorization }
		// const response = await api.post(`/user/auth/add`, {
		// 	params: bodyParams,
		// 	headers: apiHeader()
		// });

		// return response.data;
		console.log(bodyParams)
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};