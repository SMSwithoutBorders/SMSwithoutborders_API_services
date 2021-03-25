## SMSwithoutBorders OAuth-2.0-authentications/ Token/ User management-API

### Installation

* Install all node packages
```
npm install
```

### Setup
* Create configuration file
    * To set up database and API, use the template in "example.config.json" file and rename to "config.json"
    * To set up platform credentials, use the template in "example.credentials.json" file and rename to "credentials.json"
### Start Server
* With NPM
```
npm start
```
* With Node
```
node server.js
```

### API SandBox
```
http://localhost:3000/api-docs
```

### Usage
* Create an account

    ```
    > POST: http://localhost:3000/register/ 
    {
        username: STRING    
    }
    ```
* Login to account

    ```
    > POST: http://localhost:3000/register/ 
    {
        username: STRING,
        password: STRING
    }
    ```
* After all authentications return User object
    ```
    user = {
        data = {},
        token = {}
    }
    ```