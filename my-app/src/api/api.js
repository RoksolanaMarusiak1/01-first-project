import * as axios from 'axios';

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "645b5b24-e10d-40c4-94e9-eabbcdbf8add"
    }
})

export const UsersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow: (userId = 0) => {
        return instanse.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    unfollow: (userId = 0) => {
        return instanse.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    }
}

export const ProfileAPI = {
    getProfile: (userId = 0) => {
        return instanse.get(`profile/${userId}`);
    },
    getStatus: (userId = 0) => {
        return instanse.get(`profile/status/${userId}`);
    },
    updateStatus: (status) => {
        return instanse.put(`profile/status`, { status: status });
    },
    updatePhoto: (photoFile) => {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instanse.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile: (profile) => {
        return instanse.put(`profile`, profile);
    }
}

export const AuthAPI = {
    getAuthData: () => {
        return instanse.get(`auth/me`);
    },
    login: (email, password, rememberMe, captcha = null) => {
        return instanse.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout: () => {
        return instanse.delete(`auth/login`);
    }
}

export const SecurityAPI = {
    getCaptchaUrl: () => {
        return instanse.get(`security/get-captcha-url`);
    }
}