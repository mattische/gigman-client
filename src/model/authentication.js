import { baseURL } from "../utils.js";

export class AuthenticationModel {
    constructor() {
        this.user = null;
        this.token = null;
    }

    async login(email, password) {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            this.user = data.user;
            this.token = data.token;
            return data;
        } else {
            throw new Error("Login failed");
        }
    }

    async register(email, password) {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            this.user = data.user;
            this.token = data.token;
            return data;
        } else {
            throw new Error("Registration failed");
        }
    }

    async logout() {
        const response = await fetch(`${baseURL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (response.ok) {
            this.user = null;
            this.token = null;
            return true;
        } else {
            throw new Error("Logout failed");
        }
    }
    async fetchUser() {
        const response = await fetch(`${baseURL}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            this.user = data.user;
            return data.user;
        } else {
            throw new Error("Failed to fetch user");
        }
    }
    async updateUser(userData) {
        const response = await fetch(`${baseURL}/auth/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            this.user = data.user;
            return data.user;
        } else {
            throw new Error("Failed to update user");
        }
    }
    
    async isLoggedIn() {
        const response = await fetch(`${baseURL}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        return response.ok;
    }

    async fetchUserCrews() {
        const response = await fetch(`${baseURL}/auth/user/crews`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.crews;
        } else {
            throw new Error("Failed to fetch user crews");
        }
    }

}