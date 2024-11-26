import axios from "axios";

const HTTP_STATUS_CODE_OK = 200;
const API_URL = "http://localhost:3001";
const API_URL_SUPABASE = "https://wbgctstptayrxskwaqld.supabase.co";
// const API_KEY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZ2N0c3RwdGF5cnhza3dhcWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTM5NzgsImV4cCI6MjA0NDUyOTk3OH0.6qOP2ANbwnxHosWnupL8Wbdhl7AtpZNAOrcBZ91Hzzk";
const API_KEY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZ2N0c3RwdGF5cnhza3dhcWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTM5NzgsImV4cCI6MjA0NDUyOTk3OH0.6qOP2ANbwnxHosWnupL8Wbdhl7AtpZNAOrcBZ91Hzzk";

export const api = {
    // Systems
    async getSystems() {
        const response = await axios.get(`${API_URL}/systems`);
        return response.data;
    },
    async createSystem(system) {
        const response = await axios.post(`${API_URL}/systems`, system);
        return response.data;
    },
    async deleteSystem(id) {
        await axios.delete(`${API_URL}/systems/${id}`);
    },

    // Users
    async getUsers() {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    },
    async createUser(user) {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    },
    async deleteUser(id) {
        await axios.delete(`${API_URL}/users/${id}`);
    },
    async login(username, password) {
        // const response = await axios.get(`${API_URL}/users?usulogin=${username}&ususenha=${password}&usuativo=true`);
        // return response.data[0] || null;

        return this.loginSupabase(username, password);
    },
    async loginSupabase(username, password) {
        const data = {
            "email":username,
            "password":password
        };

        // const access_token = localStorage.getItem("access_token");
        const route = 'auth/v1/token?grant_type=password';
        const response = await axios.post(`${API_URL_SUPABASE}/${route}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": API_KEY_TOKEN,
                // "Authorization":"Bearer " + access_token
            }
        });

        console.log("Response: " + JSON.stringify(response.data));

        if(response.status == HTTP_STATUS_CODE_OK){
            return true;
        }

        alert("Usuário ou senha invalido!");

        return false;
    },

    // Profiles
    async getProfiles() {
        const response = await axios.get(`${API_URL}/profiles`);
        return response.data;
    },
    async createProfile(profile) {
        const response = await axios.post(`${API_URL}/profiles`, profile);
        return response.data;
    },
    async deleteProfile(id) {
        await axios.delete(`${API_URL}/profiles/${id}`);
    }
};
