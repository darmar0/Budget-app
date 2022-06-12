import axios from "axios";

let user = JSON.parse(localStorage.getItem("user"));
let token = user !== null ? user.token : undefined;
const headers = axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class AuthService {
    static login(payload) {
        return axios.post("https://budgetapp.digitalcube.rs/api/tenants/4db498e8-c92c-4325-89a5-013110d3687f/sessions", payload);
    }
    static register(payload) {
        return axios.post("https://budgetapp.digitalcube.rs/api/tenants/4db498e8-c92c-4325-89a5-013110d3687f/users", payload);
    }
    static logout() {
        return axios
            .delete("https://budgetapp.digitalcube.rs/api/tenants/4db498e8-c92c-4325-89a5-013110d3687f/sessions", headers)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err.response));
    }

    static fetchHistory() {
        return axios.get("https://budgetapp.digitalcube.rs/api/transactions?", headers);
    }

    static fetchOutcome() {
        return axios.get("https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=outcome", headers);
    }

    static fetchIncome() {
        return axios.get("https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=income", headers);
    }

    static fetchNewTransaction(payload) {
        return axios.post("https://budgetapp.digitalcube.rs/api/transactions", payload, headers);
    }

    static fetchStatistics(month) {
        return axios.get("https://budgetapp.digitalcube.rs/api/transactions/statistics?year=2022&month=" + month, headers)
    }
}

export default AuthService;
