const generateRandom = () => Math.random().toString(36).substr(2, 9);

const axiosApi = require('./api_types/axios');

module.exports = class ApiCoreService {
    constructor(config = {}) {
        this.apiType = '';
        this.authorizationTokenName = '';

        this.setDefaultApiType();
        this.setDefaultAuthorizationTokenName();

        this.id = null;
        this.name = null;
        this.payload = {};
        this.params = {};
        this.url = '';
        this.defaultBaseUrl = '';
        this.isLoading = false;
        this.api = null;
    }

    setDefaultApiType() {
        this.setApiType('API_URL');
    }

    setApiType(type) {
        this.apiType = type;
    }

    setDefaultAuthorizationTokenName() {
        this.setAuthorizationTokenName('APP_TOKEN_NAME');
    }

    setAuthorizationTokenName(name) {
        this.authorizationTokenName = name;
    }

    initConnection() {
        this.isLoading = true;
        this.id = generateRandom();
        this.name = this.name || this.id;
    }

    terminateConnection() {
        this.isLoading = false;
        this.name = this.name === this.id ? null : this.name;
        this.id = null;
    }

    async request(methodBody) {
        try {
            this.initConnection();
            const body = this.generateBody(methodBody);
            this.api = axiosApi(this.apiType, this.defaultBaseUrl);

            const result = await this.api(body);
            this.terminateConnection();
            return this.handleSuccessfullyResponse(result);
        } catch (e) {
            this.terminateConnection();
            this.handleErrors(e);
        }
    }

    generateBody(methodBody) {
        return {
            url: this.url,
            ...methodBody,
            headers: {
                ...methodBody.headers,
                Accept: 'application/json',
                Authorization: this.getAuthorizationToken(),
            }
        }
    }

    getAuthorizationToken() {
        return localStorage.getItem(process.env[this.authorizationTokenName]);
    }

    handleSuccessfullyResponse(response) {
        return response.data;
    }


    handleErrors(e) {
        throw e;
    }

    async get() {
        return this.request({
            method: 'GET',
            params: this.params,
        });
    }

    async put() {
        return this.request({
            method: 'PUT',
            data: this.payload,
        });
    }

    async post() {
        return this.request({
            method: 'POST',
            data: this.payload,
            params: this.params,
        });
    }

    async delete() {
        return this.request({
            method: 'DELETE',
            data: this.payload,
        });
    }

    async patch() {
        return this.request({
            method: 'PATCH',
            data: this.payload,
            params: this.params,
        });
    }

    async postFile() {
        return this.request({
            method: 'POST',
            data: this.payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}
