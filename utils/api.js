import axios from "axios";

const HTTP_STATUS_CODE_OK = 200;
const HTTP_STATUS_CODE_CREATED = 201;

const API_URL_SUPABASE = import.meta.env.VITE_SUPABASE_URL;
const API_KEY_TOKEN = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AUTHORIZATION_AUTH = localStorage.getItem("access_token");

export const api = {
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "apikey": API_KEY_TOKEN,
            "Authorization": "Bearer " + AUTHORIZATION_AUTH
        };
    },
    // Systems
    async getSystems() {
        const route = "rest/v1/sistema?select=*";
        const response = await axios.get(`${API_URL_SUPABASE}/${route}`, {
            headers: this.getHeaders()
        });

        return response.data;
    },
    async createSystem(system) {
        let ativo = 0;
        if (system.sisativo) {
            ativo = 1;
        }

        const data = {
            sisnome: system.sisnome,
            sisativo: ativo,
        };

        const route = "rest/v1/sistema";
        const response = await axios.post(`${API_URL_SUPABASE}/${route}`, data, {
            headers: this.getHeaders()
        });

        console.log("Response: " + JSON.stringify(response.data));

        if (response.status === HTTP_STATUS_CODE_OK) {
            return true;
        }

        alert("Usuário ou senha invalido!");

        return false;
    },
    async deleteSystem(id) {
        const route = `rest/v1/sistema?id=eq.${id}`;
        await axios.delete(`${API_URL_SUPABASE}/${route}`, {headers: this.getHeaders()});
    },
    // Users
    async getUsers() {
        const route = "rest/v1/usuario?select=*";
        const response = await axios.get(`${API_URL_SUPABASE}/${route}`, {
            headers: this.getHeaders()
        });

        console.log("Dados da api:" + JSON.stringify(response.data));

        return response.data;
    },
    async createUser(user) {
        const data = {
            nome: user.usunome,
            email: user.email,
            senha: user.ususenha
        };

        const route = "rest/v1/usuario";
        const response = await axios.post(`${API_URL_SUPABASE}/${route}`, data, {
            headers: this.getHeaders()
        });

        if (response.status === HTTP_STATUS_CODE_CREATED) {
            return true;
        }

        alert("Dados invalidos!");

        return false;
    },
    async deleteUser(id) {
        const route = `rest/v1/usuario?id=eq.${id}`;
        await axios.delete(`${API_URL_SUPABASE}/${route}`, {headers: this.getHeaders()});

    },
    async login(username, password) {
        const data = {
            "email": username,
            "password": password
        };

        const route = "auth/v1/token?grant_type=password";
        const response = await axios.post(`${API_URL_SUPABASE}/${route}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": API_KEY_TOKEN
            }
        });

        if (response.status === HTTP_STATUS_CODE_OK) {
            const access_token = response.data.access_token;
            localStorage.setItem("access_token", access_token);

            return true;
        }

        alert("Usuário ou senha invalido!");

        return false;
    },
    // Profiles
    async getProfiles() {
        const route = "rest/v1/profiles?select=*";
        const response = await axios.get(`${API_URL_SUPABASE}/${route}`, {
            headers: this.getHeaders()
        });

        return response.data;
    },
    async createProfile(profile) {
        const data = profile;

        const route = "rest/v1/profiles";
        const response = await axios.post(`${API_URL_SUPABASE}/${route}`, data, {
            headers: this.getHeaders()
        });

        if (response.status === HTTP_STATUS_CODE_CREATED) {
            return true;
        }

        alert("Dados invalidos!");

        return false;
    },
    async deleteProfile(id) {
        const route = `rest/v1/profiles?id=eq.${id}`;
        await axios.delete(`${API_URL_SUPABASE}/${route}`, {headers: this.getHeaders()});
    }
};
