import api, { apiHeader } from "../Instance";


///BMC 서버 리스트 데이터 조회
export const getBmcServerList = async (props) => {
	const { userId, page } = props
	try {
		const response = await api.get(`/api/bmc/registration/list/${userId}/${page}`, {
			headers: apiHeader(),
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///BMC 서버 리스트 데이터 검색 조회
export const getSearchedBmcServerList = async (props) => {
	const { userId, join, vendor, boaName, page } = props
	try {
		if (join === 0 && vendor === 0 && boaName === 0) {
			const response = await api.get(`/api/bmc/registration/list/${userId}/${page}`, {
				headers: apiHeader(),
			});
			return response.data;
		} else {
			const response = await api.get(`/api/bmc/registration/list/${userId}/${join}/${vendor}/${boaName}/${page}`, {
				headers: apiHeader(),
			});
			return response.data;
		}

	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


///BMC 서버 삭제 
export const deleteBmcServer = async (props) => {
	const { bmcUUIDs } = props
	try {
		//todo : bodyParams array로 변경된건지 확인 필요
		const bodyParams = { "bmc_UUID": bmcUUIDs }
		const response = await api.post(`/api/bmc/registration/delete`,
			bodyParams,
			{ headers: apiHeader() }
		);
		return response.status === 200;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


///BMC 서버 등록
export const registerBmcServer = async (props) => {
	const { userId, bmcName, bmcIP, bmcUser, bmcPassword, vendor, boaGroup } = props

	try {
		const bodyParams = {
			"user_id": userId,
			"bmc_name": bmcName,
			"bmc_ip": bmcIP,
			"bmc_user": bmcUser,
			"bmc_password": bmcPassword,
			"vendor": vendor,
			"boa_name": boaGroup
		}
		//todo : 테스트 가능할때 열기
		const response = await api.post(`/api/bmc/registration/new`,
			bodyParams,
			{ headers: apiHeader() }
		);
		return response.status === 200;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};


///BOA 그룹 리스트 조회
export const getBoaGroupList = async (props) => {
	const { userId, page } = props
	console.log(userId, page)
	try {
		const response = await api.get(`/api/integration/boa/${userId}/${page}`, {
			headers: apiHeader(),
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///BOA 그룹 삭제
export const deleteBoaGroup = async (props) => {
	const { boaIds } = props

	//todo : bodyParams array로 변경된건지 확인 필요
	try {
		const bodyParams = { "boa_id": boaIds }
		const response = await api.post(`/api/boa/delete`,
			bodyParams,
			{ headers: apiHeader() }
		);
		return response.status === 200;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

///BOA 그룹 등록
export const registerBoaGroup = async (props) => {
	const { userId, boaName, hostIp, hostPort, hostUser, hostPassword, description } = props
	try {
		const bodyParams = {
			"user_id": userId,
			"boa_name": boaName,
			"host_ip": hostIp,
			"host_port": hostPort,
			"host_user": hostUser,
			"host_pw": hostPassword,
			"description": description,
		}
		const response = await api.post(`/api/boa/new`,
			bodyParams,
			{ headers: apiHeader() }
		);
		return response.status === 200;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};