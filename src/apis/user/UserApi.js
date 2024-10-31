import api from "../Instance";
// import { Cookies } from "react-cookie";

///로그인
export const login = async (props) => {
	const { userId, password } = props
	const bodyParams = { "user_id": userId, "user_pw": password }
	try {
		const response = await api.post(`/login`, bodyParams);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};


/// 아이디 중복 확인
export const checkUserIdDuplication = async (props) => {
	const { userId } = props
	const bodyParams = { "user_id": userId }
	console.log(bodyParams)
	try {
		const response = await api.post(`/id_check`, bodyParams);
		return response.status === 200;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// 회원가입
export const registerUser = async (props) => {
	const { userId, userName, email, password, boaList } = props
	const bodyParams = {
		"user_id": userId,
		"user_name": userName,
		"user_email": email,
		"user_pw": password,
		"boa": boaList
	}
	try {
		// const response = await api.post(`/user_registration`, bodyParams);
		// return response.status === 200;
		console.log(bodyParams)
		return true;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

/// BOA 리스트 조회
export const getBoaList = async () => {
	try {
		const response = await api.get(`/boa_list`);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};