[![install size](https://packagephobia.com/badge?p=api-core-service)](https://packagephobia.com/result?p=api-core-service)
[![npm version](https://badge.fury.io/js/api-core-service.svg)](https://badge.fury.io/js/api-core-service)

API Core Service
=============
Simple, flexible and easy api service that wraps axios

API Core Service is service to send requests to API and manage their hooks with advanced configurable and extensible class. The class can be extended for modular services and main project based service.

This package can be used both in server and client side.

## Installing

Using npm:

```bash
$ npm install api-core-service --save
```

## How to use

### Creating own module service
You need to extend api core service to create your own module service.

```js
import ApiCoreService from 'api-core-service';

class AuthService extends ApiCoreService {
    async login(payload) {
        this.url = 'auth/login';
        this.payload = payload;
        return this.post();
    }

    async me() {
        this.url = 'me';
        return this.get();
    }
}

const result = await new AuthService().login({ username: 'ahmetonurslmz', password: 123456 });

```

#### Setting your request

```js
import ApiCoreService from 'api-core-service';

class AuthService extends ApiCoreService {
    async login(payload) {
        this.url = 'auth/login'; // url is endpoint that comes after your base url
        this.payload = payload; // payload is body data
        this.params = {}; // params object is query params
        return this.post(); // your method of endpoint
    }

    async me() {
        this.url = 'me';
        return this.get();
    }
}

```


#### API URL

Api core service uses 'API_URL' environment variable as a default. 

##### Changing default variable name for all service
If you desire to change it, you can extend Api core service and set different variable name.

```js
import ApiCoreService from 'api-core-service';

class MyApiCoreService extends ApiCoreService {
    constructor() {
        super();
        this.setApiType('VUE_APP_API_URL');
    }
}
```

You should use your new class to create module service like auth that we have mentioned above by extending it.


##### Changing default variable name before request

You can also change api url environment variable in method before request.

```js
import ApiCoreService from 'api-core-service';

class AuthService extends ApiCoreService {
    async login(payload) {
        this.setApiType('VUE_APP_ANOTHER_API_URL');
        this.url = 'auth/login';
        this.payload = payload;
        return this.post();
    }
}
```

#### Authorization Token

Api core service uses token that you stored in session storage that stands in browser. You can specify session's name with APP_TOKEN_NAME environment variable.


##### Changing authorization token name

You can also change environment variable name that keeps name of session in your browser's session storage.

```js
import ApiCoreService from 'api-core-service';

class MyApiCoreService extends ApiCoreService {
    constructor() {
        super();
        this.setAuthorizationTokenName('VUE_APP_TOKEN_NAME');
    }
}
```

##### Changing way of getting authorization token

You can also change way of getting your token in our api core service by overriding our method.

```js
import ApiCoreService from 'api-core-service';

class MyApiCoreService extends ApiCoreService {
    getAuthorizationToken() {
        return 'MY_SPECIAL_TOKEN';
    }
}
```

