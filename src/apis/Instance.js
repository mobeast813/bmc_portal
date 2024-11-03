import axios from "axios";
import { Cookies } from "react-cookie";

const api = axios.create({
	// baseURL: process.env.REACT_APP_BASE_URL,
	baseURL: "", //proxy에 설정됨 (package.json)
	// withCredentials: true,
	// params: {
	// 	// api_key: process.env.REACT_APP_ACCESS_TOKEN,
	// 	language: "ko-KR",
	// },
	headers: {
		"Content-Type": "application/json",
		// 'Access-Control-Allow-Credentials': "true",
		// "Access-Control-Allow-Origin": "*",
		// 'Access-Control-Allow-Headers': 'Content-Type',
		// 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
		// Accept: "application/json",
		// access_token: cookies.get("access_token"),
	},
});

api.interceptors.response.use(
	(response) => {
		// 여기에 응답을 받은 후 실행할 로직을 작성합니다.
		return response;
	},
	(error) => {
		// 응답이 실패한 경우 실행되는 로직
		if (error.response) {
			switch (error.response.status) {
				case 400:
					return;
				case 401:
					console.log("to login!!");
					// window.location.href = "/"; // 로그인 페이지로 이동
					return;
				case 404:
					// window.location.href = "/404"
					break;
				case 500:
					// window.location.href = "/500"
					break;
				default:
					// todo : alert창을 이용해서 서버에서 내려주는 메시지 뿌리기
					break;
			}
			console.error(`${error.response.status} : ${error}`);
			return Promise.reject(error);
		}
	}
);

export default api;

export const apiHeader = () => {
	const cookies = new Cookies();
	return {
		"Authorization": `Bearer ${cookies.get("accessToken")}`,
		"Content-Type": `application/json;charset=UTF-8`,
	}
};
