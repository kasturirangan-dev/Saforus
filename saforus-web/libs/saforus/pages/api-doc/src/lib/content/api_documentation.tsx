const apiDocumentation = `
## Authentication

### Login

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to generate the access token with the provided credentials. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/change-password\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`email\` | string | Email registered with MarkAny to receive the credentials.|
|| | \`password\` | string | The password used to login to MarkAny system. Initially, it will be generated randomly by MarkAny & sent to the registered email above. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter & one number.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`token\` | string | The access token used to call other MarkAny APIs.|

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "email": "khoa@markany.com",
  "password": "MarkAny123456789"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login"
payload = {
    "email": "khoa@markany.com",
    "password": "MarkAny123456789"
}
headers = {
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "khoa@markany.com",
    password: "MarkAny123456789"
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"email":"khoa@markany.com","password":"MarkAny123456789"}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
NSData *postData = [[NSData alloc] initWithData:[@"{"email":"khoa@markany.com","password":"MarkAny123456789"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpMethod = "POST"
request.httpBody = "{"email":"khoa@markany.com","password":"MarkAny123456789"}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9"
  }
}
\`\`\`


### Change Password

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to change password. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/change-password\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`oldPassword\` | string | Old password.|
|| | \`newPassword\` | string | New password provided by Partner. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter & one number.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`n/a\` |  | |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--data-raw '{
  "oldPassword": "35sSNgV0yq",
  "newPassword": "aA123456789"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password"
payload = {
    "oldPassword": "35sSNgV0yq",
    "newPassword": "aA123456789"
}
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  },
  body: JSON.stringify({
    oldPassword: "35sSNgV0yq",
    newPassword: "aA123456789"
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"oldPassword":"35sSNgV0yq","newPassword":"aA123456789"}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
NSData *postData = [[NSData alloc] initWithData:[@"{"oldPassword":"35sSNgV0yq","newPassword":"aA123456789"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.httpMethod = "POST"
request.httpBody = "{"oldPassword":"35sSNgV0yq","newPassword":"aA123456789"}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`

### Trigger Password Reset

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to trigger the password reset flow. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`email\` | string | Email registered with MarkAny to receive the credentials.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`n/a\` | | |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "khoa@markany.com"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset"
payload = {"email": "khoa@markany.com"}
headers = {'Content-Type': 'application/json'}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "khoa@markany.com"
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"email":"khoa@markany.com"}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
NSData *postData = [[NSData alloc] initWithData:[@"{"email":"khoa@markany.com"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpMethod = "POST"
request.httpBody = "{"email":"khoa@markany.com"}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`


### Reset Password

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to reset password. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/reset-password\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json  Authorization: Bearer {{PASSWORD_RESET_TOKEN}} \`| | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`newPassword\` | string | New password provided by Partner. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter & one number.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`n/a\` |  | |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--data-raw '{
  "newPassword": "FooBar123456789"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password"
payload = {"newPassword": "FooBar123456789"}
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  },
  body: JSON.stringify({
    newPassword: "FooBar123456789"
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"newPassword":"FooBar123456789"}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
NSData *postData = [[NSData alloc] initWithData:[@"{"newPassword":"FooBar123456789"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.httpMethod = "POST"
request.httpBody = "{"newPassword":"FooBar123456789"}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`


### Create Webhook Endpoint

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to create a webhook endpoint. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`url\` | string | The webhook url so that MarkAny can call to notify about events happened in the system.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`webhookSecret\` | string | The endpoint’s secret, used to generate webhook signatures. See Securing your webhooks (Optional) section.|

#### Sample request

\`\`\`curl
curl --location '{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json' \
--data '{
  "url": "http://foo.com "
}'
\`\`\`

\`\`\`python
import requests

url = "{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints"
payload = {"url": "http://foo.com "}
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
    'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "http://foo.com "
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"url":"http://foo.com"}");
Request request = new Request.Builder()
  .url("{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
NSData *postData = [[NSData alloc] initWithData:[@"{"url":"http://foo.com"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints")!,timeoutInterval: Double.infinity)
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpMethod = "POST"
request.httpBody = "{"url":"http://foo.com"}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "webhookSecret": "ZtI12RzeWuh+iYw=="
  }
}
\`\`\`

### Manage API Keys

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to create an API key. | | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`name\` | string | The name of the API key.|
|| | \`note\` | string | **Optional**. The description about the API key.|
|| | \`expiredAt\` | string | The date time (ISO 8601 at UTC time zone) that the API key will be expired.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`id\` | string | The API Key identifier.|
|| | \`accountId\` | string | The identifier of the account that api key belongs to.|
|| | \`name\` | string | The name of the API key.|
|| | \`status\` | string | The current status of the API key. We have 2 valid values for the time being: <br> \`ACTIVE\`: the API key is usable. <br> \`INACTIVE\`: the API key is not usable. |
|| | \`token\` | string | The random unique string described the API key. The partner should use this value as the bearer token in the \`Authorization\` request header to call the watermark & piracy detection APIs. |
|| | \`note\` | string | The description about the API key. |
|| | \`expiredAt\` | string | The date time (ISO 8601 at UTC time zone) that the API key will be expired. |
|| | \`createdAt\` | string | The date time (ISO 8601 at UTC time zone) the API key was created. |
|| | \`updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the API key was last updated. |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json' \
--data '{
"name": "key for testing",
"note": "some note",
"expiredAt": "2024-07-20T00:00:00Z"
}'
\`\`\`

\`\`\`python
import requests

url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys'
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
    'Content-Type': 'application/json'
}
data = {
    "name": "key for testing",
    "note": "some note",
    "expiredAt": "2024-07-20T00:00:00Z"
}

response = requests.post(url, headers=headers, json=data)
print(response.text)
\`\`\`

\`\`\`javascript
const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys';
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
    'Content-Type': 'application/json'
};
const data = {
    name: "key for testing",
    note: "some note",
    expiredAt: "2024-07-20T00:00:00Z"
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\\"name\\": \\"key for testing\\", \\"note\\": \\"some note\\", \\"expiredAt\\": \\"2024-07-20T00:00:00Z\\"}");
Request request = new Request.Builder()
        .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")
        .post(body)
        .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
        .addHeader("Content-Type", "application/json")
        .build();

try (Response response = client.newCall(request).execute()) {
    if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

    System.out.println(response.body().string());
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"POST"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSDictionary *jsonBody = @{
            @"name": @"key for testing",
            @"note": @"some note",
            @"expiredAt": @"2024-07-20T00:00:00Z"
        };
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonBody options:0 error:nil];
        [request setHTTPBody:jsonData];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSString *responseString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                NSLog(@"Response: %@", responseString);
            }
        }];
        [task resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let json: [String: Any] = [
    "name": "key for testing",
    "note": "some note",
    "expiredAt": "2024-07-20T00:00:00Z"
]
let jsonData = try! JSONSerialization.data(withJSONObject: json, options: [])

request.httpBody = jsonData

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    if let data = data, let responseString = String(data: data, encoding: .utf8) {
        print("Response: \\(responseString)")
    }
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSA0000",
"msg": "OK",
"data": {
"id": "6c8ac83e-efec-4dee-bc71-90e9bd572d14",
"accountId": "cc46c549-26ca-4c3d-8b5a-8a7d210b4059",
"name": "key for testing",
"status": "ACTIVE",
"token": "NmM4YWM4M2UtZWZlYy00ZGVlLWJjNzEtOTBlOWJkNTcyZDE0",
"note": "some note",
"expiredAt": "2024-07-20T00:00:00Z",
"createdAt": "2024-07-21T09:50:29.029497Z",
"updatedAt": "2024-07-21T09:50:29.031134Z"
}
}
\`\`\`

| | | | | |
--- | --- | --- | --- | ---
**Description** | | API to get all API keys.| | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys\`| | |
|| **HTTP Method** | \`GET\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Query Parameters** | **Properties** | **Type** | **Note** |
|| | \`page\` | integer | The page number to query.|
|| | \`pageSize\` | integer | The number of elements per page.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`records[*].id\` | string | The API Key identifier.|
|| | \`records[*].accountId\` | string | The identifier of the account that api key belongs to.|
|| | \`records[*].name\` | string | The name of the API key.|
|| | \`records[*].status\` | string | The current status of the API key. We have 2 valid values for the time being: <br> \`ACTIVE\`: the API key is usable. <br> \`INACTIVE\`: the API key is not usable. |
|| | \`records[*].token\` | string | The random unique string described the API key. The partner should use this value as the bearer token in the \`Authorization\` request header to call the watermark & piracy detection APIs. |
|| | \`records[*].note\` | string | The description about the API key. |
|| | \`records[*].expiredAt\` | string | The date time (ISO 8601 at UTC time zone) that the API key will be expired. |
|| | \`records[*].lastUsedAt\` | string | The date time (ISO 8601 at UTC time zone) that the API key wast last used.|
|| | \`records[*].createdAt\` | string | The date time (ISO 8601 at UTC time zone) the API key was created. |
|| | \`records[*].updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the API key was last updated. |
|| | \`page\` | string | The page number. |
|| | \`pageSize\` | string | The number of elements per page. |
|| | \`total\` | string | The total of elements. |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9'
\`\`\`

\`\`\`python
import requests

url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys'
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.get(url, headers=headers)
print(response.text)
\`\`\`

\`\`\`javascript
const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys';
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
};

fetch(url, {
    method: 'GET',
    headers: headers
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});
\`\`\`

\`\`\`java
import okhttp3.*;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")
                .get()
                .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

            System.out.println(response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"GET"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSString *responseString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                NSLog(@"Response: %@", responseString);
            }
        }];
        [task resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    if let data = data, let responseString = String(data: data, encoding: .utf8) {
        print("Response: \\(responseString)")
    }
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSA0000",
"msg": "OK",
"data": {
"records": [
{
"id": "6c8ac83e-efec-4dee-bc71-90e9bd572d14",
"accountId": "cc46c549-26ca-4c3d-8b5a-8a7d210b4059",
"name": "key for testing",
"status": "ACTIVE",
"token": "NmM4YWM4M2UtZWZlYy00ZGVlLWJjNzEtOTBlOWJkNTcyZDE0",
"note": "some note",
"expiredAt": "2024-07-20T00:00:00Z",
"createdAt": "2024-07-21T09:50:29.029497Z",
"updatedAt": "2024-07-21T09:50:29.031134Z"
},
{
"id": "cd3b2e15-7747-4df1-955a-d1ee35f73243",
"accountId": "cc46c549-26ca-4c3d-8b5a-8a7d210b4059",
"name": "key for testing",
"status": "ACTIVE",
"token": "Y2QzYjJlMTUtNzc0Ny00ZGYxLTk1NWEtZDFlZTM1ZjczMjQz",
"note": "some note",
"expiredAt": "2024-07-20T00:00:00Z",
"createdAt": "2024-07-21T09:46:04.884664Z",
"updatedAt": "2024-07-21T09:46:04.893396Z"
},
{
"id": "941f532b-e6cd-47c9-a89e-08cb0f047691",
"accountId": "cc46c549-26ca-4c3d-8b5a-8a7d210b4059",
"name": "key for testing",
"status": "ACTIVE",
"token": "OTQxZjUzMmItZTZjZC00N2M5LWE4OWUtMDhjYjBmMDQ3Njkx",
"note": "some note",
"expiredAt": "2024-07-20T00:00:00Z",
"lastUsedAt": "2024-07-16T08:38:10.17077Z",
"createdAt": "2024-07-16T06:05:25.114543Z",
"updatedAt": "2024-07-16T08:38:10.190651Z"
}
],
"page": 0,
"pageSize": 10,
"total": 3
}
}
\`\`\`

| | | | | |
--- | --- | --- | --- | ---
**Description** | | API to update an API key.| | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}\`| | |
|| **HTTP Method** | \`PATCH\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`apiKeyId\` | string | The identifier of the API key to update. |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`name\` | string | The new value of the API key name. |
|| | \`status\` | string | The current status of the API key. We have 2 valid values for the time being: <br> \`ACTIVE\`: the API key is usable. <br> \`INACTIVE\`: the API key is not usable. |
|| | \`note\` | string | **Optional**. The new description about the API key. |
|| | \`expiredAt\` | string | |
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`NA\` |  | |

#### Sample request

\`\`\`curl
curl --location --request PATCH 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json' \
--data '{
"name": "key updated for testing",
"status": "INACTIVE",
"note": "some updated note",
"expiredAt": "2024-07-29T00:00:00"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
}
data = {
    "name": "key updated for testing",
    "status": "INACTIVE",
    "note": "some updated note",
    "expiredAt": "2024-07-29T00:00:00"
}

response = requests.patch(url, headers=headers, json=data)
print(response.status_code)
print(response.json())
\`\`\`

\`\`\`javascript
const fetch = require('node-fetch');

const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14';
const options = {
    method: 'PATCH',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "key updated for testing",
        status: "INACTIVE",
        note: "some updated note",
        expiredAt: "2024-07-29T00:00:00"
    })
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

\`\`\`java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("PATCH");
            conn.setRequestProperty("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = "{\\"name\\": \\"key updated for testing\\", \\"status\\": \\"INACTIVE\\", \\"note\\": \\"some updated note\\", \\"expiredAt\\": \\"2024-07-29T00:00:00\\"}";

            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            try(BufferedReader br = new BufferedReader(
              new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"PATCH"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSDictionary *jsonBodyDict = @{
            @"name": @"key updated for testing",
            @"status": @"INACTIVE",
            @"note": @"some updated note",
            @"expiredAt": @"2024-07-29T00:00:00"
        };
        NSData *jsonBodyData = [NSJSONSerialization dataWithJSONObject:jsonBodyDict options:0 error:nil];
        [request setHTTPBody:jsonBodyData];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"Response: %@", jsonResponse);
            }
        }];
        [dataTask resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14")!
var request = URLRequest(url: url)
request.httpMethod = "PATCH"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let jsonBody: [String: Any] = [
    "name": "key updated for testing",
    "status": "INACTIVE",
    "note": "some updated note",
    "expiredAt": "2024-07-29T00:00:00"
]
let jsonData = try! JSONSerialization.data(withJSONObject: jsonBody, options: [])

let task = URLSession.shared.uploadTask(with: request, from: jsonData) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    guard let data = data else {
        print("No data")
        return
    }
    let jsonResponse = try! JSONSerialization.jsonObject(with: data, options: [])
    print("Response: \\(jsonResponse)")
}
task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSA0000",
"msg": "OK"
}
\`\`\`

| | | | | |
--- | --- | --- | --- | ---
**Description** | | API to delete an API key.| | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}\`| | |
|| **HTTP Method** | \`DELETE\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`apiKeyId\` | string | The identifier of the API key to update. |
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`NA\` |  | |

#### Sample request

\`\`\`curl
curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
}

response = requests.delete(url, headers=headers)
print(response.status_code)
print(response.json())
\`\`\`

\`\`\`javascript
const fetch = require('node-fetch');

const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b';
const options = {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

\`\`\`java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            conn.setRequestProperty("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9");

            try(BufferedReader br = new BufferedReader(
              new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"DELETE"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"Response: %@", jsonResponse);
            }
        }];
        [dataTask resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b")!
var request = URLRequest(url: url)
request.httpMethod = "DELETE"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    guard let data = data else {
        print("No data")
        return
    }
    let jsonResponse = try! JSONSerialization.jsonObject(with: data, options: [])
    print("Response: \\(jsonResponse)")
}
task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSA0000",
"msg": "OK"
}
\`\`\`

## Watermarking

### Create Watermarking Order

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to create a watermarking order. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`idempotencyKey\` | string | The key to uniquely identify this request for idempotency purpose.|
|| | \`title\` | string | Order Title|
|| | \`files[*].fileName\` | string | The name of the file to watermark.|
|| | \`files[*].fileType\` | string | The type of the file to watermark. Currently, we support 4 formats: \`IMG\`: jpg, png, tiff \`AUDIO\`: mp3, wav \`VIDEO\`: mp4 \`DOCUMENT\`: pdf|
|| | \`files[*].wtrMsg\` | string | The message to watermark. It must be the string representation of an integer in range 1~65535.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`id\` | string | Identifier of the order resource.|
|| | \`accountId\` | string | Identifier of the partner account resource.|
|| | \`idempotencyKey\` | string | The key to uniquely identify the order request.|
|| | \`status\` | string | The current status of the order. We have 2 valid values for the time being: \`AWAITING_PROCESS\`: this order is waiting until all files in the order are uploaded & processed. \`PROCESSED\`: all the files in this order have been processed (either successfully or unsuccessfully)|
|| | \`title\` | string | The title of this order resource.|
|| | \`orderFiles[*].id\` | string | Identifier of the order file resource.|
|| | \`orderFiles[*].fileName\` | string | The name of the order file resource.|
|| | \`orderFiles[*].uploadUrl\` | string | The URL to upload the file for watermarking purposes. Currently, MarkAny leverages the Amazon S3 cloud storage for scalability & performance to store the partner files. Each partner has their own storage location to ensure security. The link will have a default expiry time of **30 minutes**.|
|| | \`orderFiles[*].fileType\` | string | The type of the file, same as the **fileType** fields in the request.|
|| | \`orderFiles[*].status\` | string | The current status of the order file. We have 3 valid values for the time being: \`AWAITING_PROCESS\`: this order file is waiting for watermark. \`SUCCEEDED\`: this order file has been watermarked successfully with the given \`wtrMsg\`. \`FAILED\`: this order file can not be watermarked.|
|| | \`orderFiles[*].wtrMsg\` | string | The message to watermark.|
|| | \`createdAt\` | string | The date time (ISO 8601 at UTC time zone) the order was created.|
|| | \`updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the order was last updated.|
|| | \`createdBy\` | string | Party that has created this order.|
|| | \`updatedBy\` | string | Party that has last updated this order.|

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json' \
--data '{
  "idempotencyKey": "501",
  "title": "create watermark order",
  "files": [
    {
      "fileName": "image002.jpg",
      "fileType": "IMG",
      "wtrMsg": "6789"
    }
  ]
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders"
payload = {
    "idempotencyKey": "501",
    "title": "create watermark order",
    "files": [
        {
            "fileName": "image002.jpg",
            "fileType": "IMG",
            "wtrMsg": "6789"
        }
    ]
}
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
    'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    idempotencyKey: "501",
    title: "create watermark order",
    files: [
      {
        fileName: "image002.jpg",
        fileType: "IMG",
        wtrMsg: "6789"
      }
    ]
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"idempotencyKey":"501","title":"create watermark order","files":[{"fileName":"image002.jpg","fileType":"IMG","wtrMsg":"6789"}]}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
NSData *postData = [[NSData alloc] initWithData:[@"{"idempotencyKey":"501","title":"create watermark order","files":[{"fileName":"image002.jpg","fileType":"IMG","wtrMsg":"6789"}]}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders")!,timeoutInterval: Double.infinity)
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpMethod = "POST"
request.httpBody = "{"idempotencyKey":"501","title":"create watermark order","files":[{"fileName":"image002.jpg","fileType":"IMG","wtrMsg":"6789"}]}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSW0000",
  "msg": "OK",
  "data": {
    "id": "36509268-91df-4a26-965c-8f1f63dc738d",
    "accountId": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "idempotencyKey": "501",
    "status": "AWAITING_PROCESS",
    "title": "create watermark order",
    "orderFiles": [
      {
        "id": "a8acaae2-7217-43e0-8bf7-318b2e919048",
        "fileName": "image002.jpg",
        "uploadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/36509268-91df-4a26-965c-8f1f63dc738d/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T033653Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e8241624609d8a8a4a81b948fe73160785804ed9de756fae8ba334318d9b577b",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS",
        "wtrMsg": "6789"
      }
    ],
    "createdAt": "2024-06-04T03:36:53.882703037Z",
    "updatedAt": "2024-06-04T03:36:53.884212Z",
    "createdBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "updatedBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d"
  }
}
\`\`\`

### Get Watermarking Order

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to get watermarking order information. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}\`| | |
|| **HTTP Method** | \`GET\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`orderId\` | string | Identifier of the order resource.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`id\` | string | Identifier of the order resource.|
|| | \`accountId\` | string | Identifier of the partner account resource.|
|| | \`idempotencyKey\` | string | The key to uniquely identify the order request.|
|| | \`status\` | string | The current status of the order. We have 2 valid values for the time being: \`AWAITING_PROCESS\`: this order is waiting until all files in the order are uploaded & processed. \`PROCESSED\`: all the files in this order have been processed (either successfully or unsuccessfully)|
|| | \`title\` | string | The title of this order resource.|
|| | \`orderFiles[*].id\` | string | Identifier of the order file resource.|
|| | \`orderFiles[*].fileName\` | string | The name of the order file resource.|
|| | \`orderFiles[*].origDownloadUrl\` | string | The URL to download the original uploaded file. The link works if the file was uploaded successfully only. The link will have a default expiry time of **30 minutes**.|
|| | \`oorderFiles[*].wtrDownloadUrl\` | string | The URL to download the watermarked file. The link works if the file was watermarked successfully only. The link will have a default expiry time of **30 minutes**.|
|| | \`orderFiles[*].fileType\` | string | The type of the file, same as the **fileType** fields in the request.|
|| | \`orderFiles[*].status\` | string | The current status of the order file. We have 3 valid values for the time being: \`AWAITING_PROCESS\`: this order file is waiting for watermark. \`SUCCEEDED\`: this order file has been watermarked successfully with the given \`wtrMsg\`. \`FAILED\`: this order file can not be watermarked.|
|| | \`orderFiles[*].wtrMsg\` | string | The message to watermark.|
|| | \`orderFiles[*].resolution\` | string | **(Optional)** Available in case of \`DOCUMENT\` file type only. Specify the resolution information of the document while watermarking. NOTE: This field should be used as input for the piracy detection process to function correctly for \`DOCUMENT\` types. See section 3.3.3.1. Create Piracy Detection Order.|
|| | \`createdAt\` | string | The date time (ISO 8601 at UTC time zone) the order was created.|
|| | \`updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the order was last updated.|
|| | \`createdBy\` | string | Party that has created this order.|
|| | \`updatedBy\` | string | Party that has last updated this order.|

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d"
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
}

response = requests.get(url, headers=headers)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
  },
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d")
  .method("GET", null)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"GET"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/36509268-91df-4a26-965c-8f1f63dc738d")!,timeoutInterval: Double.infinity)
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSW0000",
  "msg": "OK",
  "data": {
    "id": "36509268-91df-4a26-965c-8f1f63dc738d",
    "accountId": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "idempotencyKey": "501",
    "status": "PROCESSED",
    "title": "create watermark order",
    "orderFiles": [
      {
        "id": "a8acaae2-7217-43e0-8bf7-318b2e919048",
        "fileName": "image002.jpg",
        "origDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/36509268-91df-4a26-965c-8f1f63dc738d/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T033847Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=7a04fd71e764b3d68aead867f87217591363d877fdd3177ca4b38fcdec34a199",
        "wtrDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/36509268-91df-4a26-965c-8f1f63dc738d/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T033847Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=7b7b39ce440760718e09f999d4fccdf04caf2e35e9f44808b2999d689da7c2a0",
        "fileType": "IMG",
        "status": "SUCCEEDED",
        "wtrMsg": "6789"
      }
    ],
    "createdAt": "2024-06-04T03:36:53.882703Z",
    "updatedAt": "2024-06-04T03:38:03.880734Z",
    "createdBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "updatedBy": "system"
  }
}
\`\`\`


## Piracy Detection

### Create Piracy Detection Order

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to create a piracy detection order. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`idempotencyKey\` | string | The key to uniquely identify this request for idempotency purpose.|
|| | \`title\` | string | The title of this order.|
|| | \`files[*].fileName\` | string | The name of the file to detect watermarked code.|
|| | \`files[*].fileType\` | string | The type of the file to detect watermarked code. Currently, we support 4 formats: \`IMG\`: jpg, png, tiff \`AUDIO\`: mp3, wav \`VIDEO\`: mp4 \`DOCUMENT\`: pdf|
|| | \`files[*].resolution\` | string | **(Optional)** The resolution information in case of \`DOCUMENT\` file type. This information could be retrieved from Get Watermarking Order API section.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`id\` | string | Identifier of the order resource.|
|| | \`accountId\` | string | Identifier of the partner account resource.|
|| | \`idempotencyKey\` | string | The key to uniquely identify the order request.|
|| | \`status\` | string | The current status of the order. We have 2 valid values for the time being: \`AWAITING_PROCESS\`: this order is waiting until all files in the order are uploaded & processed. \`PROCESSED\`: all the files in this order have been processed (either successfully or unsuccessfully)|
|| | \`title\` | string | The title of this order resource.|
|| | \`orderFiles[*].id\` | string | Identifier of the order file resource.|
|| | \`orderFiles[*].fileName\` | string | The name of the order file resource.|
|| | \`orderFiles[*].uploadUrl\` | string | The URL to upload the file for watermarking purposes. Currently, MarkAny leverages the Amazon S3 cloud storage for scalability & performance to store the partner files. Each partner has their own storage location to ensure security. The link will have a default expiry time of **30 minutes**.|
|| | \`orderFiles[*].fileType\` | string | The type of the file, same as the \`fileType\` fields in the request.|
|| | \`orderFiles[*].status\` | string | The current status of the order file. We have 4 valid values for the time being: \`AWAITING_PROCESS\`: this order file is waiting for process. \`DETECTED\`: the watermarked code in this order file has been detected successfully. \`UNDETECTED\`: MarkAny can not detect the watermarked code in this order file. \`FAILED\`:  some issue happens preventing the process from completing.|
|| | \`orderFiles[*].resolution\` | string | **(Optional)** The resolution information in case of DOCUMENT file type.|
|| | \`createdAt\` | string | The date time (ISO 8601 at UTC time zone) the order was created.|
|| | \`updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the order was last updated.|
|| | \`createdBy\` | string | Party that has created this order.|
|| | \`updatedBy\` | string | Party that has last updated this order.|

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA' \
--header 'Content-Type: application/json' \
--data '{
  "idempotencyKey": "703",
  "title": "create piracy detection order",
  "files": [
    {
      "fileName": "image002_sf6789.jpg",
      "fileType": "IMG"
    }
  ]
}'
\`\`\`

\`\`\`python
import requests
import json

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders"
payload = json.dumps({
  "idempotencyKey": "703",
  "title": "create piracy detection order",
  "files": [
    {
      "fileName": "image002_sf6789.jpg",
      "fileType": "IMG"
    }
  ]
})
headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "idempotencyKey": "703",
    "title": "create piracy detection order",
    "files": [
      {
        "fileName": "image002_sf6789.jpg",
        "fileType": "IMG"
      }
    ]
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{"idempotencyKey": "703","title": "create piracy detection order","files": [{"fileName": "image002_sf6789.jpg","fileType": "IMG"}]}");
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
[request setURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders"]];
[request setHTTPMethod:@"POST"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA" forHTTPHeaderField:@"Authorization"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
[request setHTTPBody:[@"{"idempotencyKey": "703","title": "create piracy detection order","files": [{"fileName": "image002_sf6789.jpg","fileType": "IMG"}]}" dataUsingEncoding:NSUTF8StringEncoding]];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders")!,timeoutInterval: Double.infinity)
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNDIzYzU1Mi0zODkyLTQ5NjEtOGZlNy04OGMyODNmNTM4Y2QiLCJzdWIiOiJjZjVkOGNlMC0zZDA1LTRjNjUtOWZlOC03ZWQyYTZmN2Y2OGQiLCJ0eXBlIjoiQUNDRVNTIiwiZW1haWwiOiJraG9hQG1hcmthbnkuY29tIiwiZXhwIjoxNzE3NDc3NzgxfQ.VYxgJwe4b0v1YCaMOB8Z9PTPhqwAynP0DHsWGdbWw11_AkGYPoBvuA0hAw5Lm--DNVcFE3ZEMpEM92-SHpZCEA" forHTTPHeaderField: "Authorization")
request.addValue("application/json" forHTTPHeaderField: "Content-Type")
request.httpMethod = "POST"
request.httpBody = "{"idempotencyKey": "703","title": "create piracy detection order","files": [{"fileName": "image002_sf6789.jpg","fileType": "IMG"}]}".data(using: .utf8)

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSP0000",
  "msg": "OK",
  "data": {
    "id": "28f45670-b0d1-47b0-a136-4a703a87b623",
    "accountId": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "idempotencyKey": "703",
    "status": "AWAITING_PROCESS",
    "title": "create piracy detection order",
    "orderFiles": [
      {
        "id": "eff68fb2-797d-4031-b770-c01e10fd7262",
        "fileName": "image002_sf6789.jpg",
        "uploadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/28f45670-b0d1-47b0-a136-4a703a87b623/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T040144Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=87febd6822d8d48d9cf17cea6e040c5c935e1e17251f403df87e2b47000a790e",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS"
      }
    ],
    "createdAt": "2024-06-04T04:01:44.840918064Z",
    "updatedAt": "2024-06-04T04:01:44.842384Z",
    "createdBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "updatedBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d"
  }
}
\`\`\`


### Get Piracy Detection Order

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to get piracy detection order information. | | |
**Request** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}\`| | |
|| **HTTP Method** | \`GET\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`orderId\` | string | Identifier of the order resource.|
**Response** | **Response Data Body** | **Properties** | **Type** | **Note**
|| | \`id\` | string | Identifier of the order resource.|
|| | \`accountId\` | string | Identifier of the partner account resource.|
|| | \`idempotencyKey\` | string | The key to uniquely identify the order request.|
|| | \`status\` | string | The current status of the order file. We have 4 valid values for the time being: \`AWAITING_PROCESS\`: this order file is waiting for process. \`DETECTED\`: the watermarked code in this order file has been detected successfully. \`UNDETECTED\`: MarkAny can not detect the watermarked code in this order file. \`FAILED\`: some issue happens preventing the process from completing. |
|| | \`title\` | string | The title of this order resource.|
|| | \`orderFiles[*].id\` | string | Identifier of the order file resource.|
|| | \`orderFiles[*].fileName\` | string | The name of the order file resource.|
|| | \`orderFiles[*].origDownloadUrl\` | string | The URL to download the original uploaded file. The link works if the file was uploaded successfully only. The link will have a default expiry time of **30 minutes**.|
|| | \`orderFiles[*].fileType\` | string | The type of the file, same as the \`fileType\` fields in the request.|
|| | \`orderFiles[*].status\` | string | The current status of the order file. We have 3 valid values for the time being: \`AWAITING_PROCESS\`: this order file is waiting for watermark. \`SUCCEEDED\`: this order file has been watermarked successfully with the given \`wtrMsg\`. \`FAILED\`: this order file can not be watermarked.|
|| | \`orderFiles[*].detectedCode\` | string | The watermarked code detected. Should be greater than 0 if detected.|
|| | \`orderFiles[*].resolution\` | string | **(Optional)** Available in case of \`DOCUMENT\` file type only.|
|| | \`createdAt\` | string | The date time (ISO 8601 at UTC time zone) the order was created.|
|| | \`updatedAt\` | string | The date time (ISO 8601 at UTC time zone) the order was last updated.|
|| | \`createdBy\` | string | Party that has created this order.|
|| | \`updatedBy\` | string | Party that has last updated this order.|

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9''
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
}

response = requests.get(url, headers=headers)
print(response.text)
\`\`\`

\`\`\`javascript
fetch("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  }
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
\`\`\`

\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623")
  .method("GET", null)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();
\`\`\`

\`\`\`objc
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"GET"];
[request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
\`\`\`

\`\`\`swift
var request = URLRequest(url: URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/28f45670-b0d1-47b0-a136-4a703a87b623")!,timeoutInterval: Double.infinity)
request.addValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  guard let data = data else {
    print(String(describing: error))
    return
  }
  print(String(data: data, encoding: .utf8)!)
}

task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
  "code": "CSP0000",
  "msg": "OK",
  "data": {
    "id": "28f45670-b0d1-47b0-a136-4a703a87b623",
    "accountId": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "idempotencyKey": "703",
    "status": "PROCESSED",
    "title": "create piracy detection order",
    "orderFiles": [
      {
        "id": "eff68fb2-797d-4031-b770-c01e10fd7262",
        "fileName": "image002_sf6789.jpg",
        "origDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/28f45670-b0d1-47b0-a136-4a703a87b623/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T040320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=88dc1285a89ece8a347249569177e2bbab2ec3fcedadf9a00d4da6f2a2d0b382",
        "fileType": "IMG",
        "status": "DETECTED",
        "detectedCode": "6789"
      }
    ],
    "createdAt": "2024-06-04T04:01:44.840918Z",
    "updatedAt": "2024-06-04T04:03:09.52839Z",
    "createdBy": "cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d",
    "updatedBy": "system"
  }
}

\`\`\`

## Delete Files

### Delete Original / Watermark Files

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to delete original / watermark files given the order id | | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/order-files\`| | |
|| **HTTP Method** | \`DELETE\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`orderId\` | string | Identifier of the order resource.|
**Response** | **Response Data Body** | **NA** |  | 

#### Sample request

\`\`\`curl
curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)
print(response.status_code)
print(response.json())
\`\`\`

\`\`\`javascript
const fetch = require('node-fetch');

const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files';
const options = {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
        'Content-Type': 'application/json'
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

\`\`\`java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            conn.setRequestProperty("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9");
            conn.setRequestProperty("Content-Type", "application/json");

            try(BufferedReader br = new BufferedReader(
              new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"DELETE"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"Response: %@", jsonResponse);
            }
        }];
        [dataTask resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files")!
var request = URLRequest(url: url)
request.httpMethod = "DELETE"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    guard let data = data else {
        print("No data")
        return
    }
    let jsonResponse = try! JSONSerialization.jsonObject(with: data, options: [])
    print("Response: \\(jsonResponse)")
}
task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

### Delete Piracy Detection Files

| | | | | |
--- | --- | --- | --- | ---
**Description** | |API to delete piracy files given the order id | | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}/order-files\`| | |
|| **HTTP Method** | \`DELETE\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`orderId\` | string | Identifier of the order resource.|
**Response** | **Response Data Body** | **NA** |  | 

#### Sample request

\`\`\`curl
curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
}

response = requests.delete(url, headers=headers)
print(response.status_code)
print(response.json())
\`\`\`

\`\`\`javascript
const fetch = require('node-fetch');

const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files';
const options = {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
        'Content-Type': 'application/json'
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

\`\`\`java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            conn.setRequestProperty("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9");
            conn.setRequestProperty("Content-Type", "application/json");

            try(BufferedReader br = new BufferedReader(
              new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"DELETE"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"Response: %@", jsonResponse);
            }
        }];
        [dataTask resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files")!
var request = URLRequest(url: url)
request.httpMethod = "DELETE"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    guard let data = data else {
        print("No data")
        return
    }
    let jsonResponse = try! JSONSerialization.jsonObject(with: data, options: [])
    print("Response: \\(jsonResponse)")
}
task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

## Share Watermark Files&nbsp;
### Share Watermark Files&nbsp;

| | | | | |
--- | --- | --- | --- | ---
**Description** | | API to share watermark files given the order id | | |
**Request** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/share\`| | |
|| **HTTP Method** | \`POST\` | | |
|| **Header** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **Request Path Variable** | **Properties** | **Type** | **Note** |
|| | \`orderId\` | string | Identifier of the order resource.|
|| **Request Body** | **Properties** | **Type** | **Note** |
|| | \`email\` | string | The email to share the watermark files to.|
**Response** | **Response Data Body** | **NA** |  |

#### Sample request

\`\`\`curl
curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "khoa@markany.com"
}'
\`\`\`

\`\`\`python
import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
}
data = {
    "email": "khoa@markany.com"
}

response = requests.post(url, headers=headers, json=data)
print(response.status_code)
print(response.json())
\`\`\`

\`\`\`javascript
const fetch = require('node-fetch');

const url = 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share';
const options = {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: "khoa@markany.com"
    })
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

\`\`\`java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = "{\\"email\\": \\"khoa@markany.com\\"}";

            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            try(BufferedReader br = new BufferedReader(
              new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

\`\`\`objc
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"POST"];
        [request setValue:@"Bearer eyJhbGciOiJIUzUxMiJ9" forHTTPHeaderField:@"Authorization"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

        NSDictionary *jsonBodyDict = @{
            @"email": @"khoa@markany.com"
        };
        NSData *jsonBodyData = [NSJSONSerialization dataWithJSONObject:jsonBodyDict options:0 error:nil];
        [request setHTTPBody:jsonBodyData];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error) {
                NSLog(@"Error: %@", error);
            } else {
                NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                NSLog(@"Response: %@", jsonResponse);
            }
        }];
        [dataTask resume];
    }
    return 0;
}
\`\`\`

\`\`\`swift
import Foundation

let url = URL(string: "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("Bearer eyJhbGciOiJIUzUxMiJ9", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let jsonBody: [String: Any] = [
    "email": "khoa@markany.com"
]
let jsonData = try! JSONSerialization.data(withJSONObject: jsonBody, options: [])

let task = URLSession.shared.uploadTask(with: request, from: jsonData) { data, response, error in
    if let error = error {
        print("Error: \\(error)")
        return
    }
    guard let data = data else {
        print("No data")
        return
    }
    let jsonResponse = try! JSONSerialization.jsonObject(with: data, options: [])
    print("Response: \\(jsonResponse)")
}
task.resume()
\`\`\`

#### Sample response

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

## Webhooks

### Subscription

MarkAny uses webhooks to notify when an event occurs.
Example: WTR_ORDER.PROCESSED, PD_ORDER.PROCESSED ... See Events section for the full list.

> **WARNING**: New event types are continuously added to the platform. It is up to you to decide which events you want to process and how, but your implementation of the event listener must be able to handle new event types without breaking.

When one of those events occurs, an HTTP POST request is sent to the web hook’s configured URL, allowing you to act upon it.

> **NOTE** Highly recommends that you make your webhook handlers idempotent, to ensure events are only handled once on your end.

An attempt will be made to deliver a single webhook event to the specified URL. If the delivery fails for any reason (timeout or HTTP response code other than 200), the event will be retried at **max 3 times** with exponential backoff algorithm. Events will be fired as soon as they are created & can be out of order. That’s your duty to handle this problem for the time being. We also keep improving our platform to overcome it in the future.

> **WARNING**: To avoid processing the retried events more than once, make sure to implement idempotence using the eventId as the idempotency key.


### Securing your webhooks (Optional)

Ensure your server is only receiving the expected MarkAny requests:

- Once your server is configured to receive payloads, it'll listen for any payloads sent to the endpoint you configured.
- For security reasons, you probably want to verify that the payloads are coming from MarkAny.
- To verify the payloads when creating a webhook you can set up a secret token which MarkAny will use to sign the payloads.

Setting up your secret token:

- Give your secret token on both \`Staging\` & \`Production\` environments to MarkAny at the time you onboard for the time being.
- In the future, we will improve our platform to allow configuration via a UI tool.

Verifying payloads from MarkAny:

- If your secret token is set, we will use it to create a hash signature with the entire body of the webhook request.
- This hash signature, encoded with base64 is passed along with each request in the headers as X-MarkAny-Signature.
- MarkAny uses an HMAC SHA-256 to compute the hash.
- Compare the hash value to the value of the X-MarkAny-Signature header:
If they’re equal then this request has passed validation.
If these values do not match, then this request may have been tampered with in-transit or someone may be spoofing requests to your endpoint.


Sample code:

Example for an event with a body|
---|
\`{  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",  "eventType": "WTR_ORDER.PROCESSED",  "occurredAt": "2024-06-05T11:03:45Z",  "data": {    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",    "createdAt": "2024-06-04T11:03:45Z",    "updatedAt": "2023-06-04T11:04:45Z",    "status": "PROCESSED"  }}\` |


Validate signature: |
---|
\`// Hmac256 using Apache Commons Codec var secretToken = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Get from the Create Webhook Endpoint API var eventBody =   """     {       "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",       "eventType": "WTR_ORDER.PROCESSED",       "occurredAt": "2024-06-05T11:03:45Z",       "data": {         "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",         "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",         "createdAt": "2024-06-04T11:03:45Z",         "updatedAt": "2023-06-04T11:04:45Z",         "status": "PROCESSED"       }     }     """; var hm256 = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, Base64.getDecoder().decode(secretToken)); var hashValue = hm256.hmacHex(eventBody); // hashValue = f679dc83b37aa8438c41c55db556dffe0fdb1c1a954d1dc6e70bb9484d79081e assert hashValue.equals(request.getHeader("x-markany-signature"));\`|


## Events

MarkAny uses events to record important changes happening for our resources. Once an event is created, it will be delivered to your application via a webhook call.

Our event types follow a specific structure: \`{{RESOURCE}}.{{EVENT}}\`

Each event includes an \`eventId\` field, which uniquely identifies the event instance, an \`eventType\` field that identifies the type of the event instance & an \`occurredAt\` field that identifies the time the event occurs.

Event Type | Description | Sample Request
--- | --- | ---
\`WTR_ORDER.PROCESSED\` | Occurs upon completion of a watermarking order processing. | \`{  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",  "eventType": "WTR_ORDER.PROCESSED",  "occurredAt": "2024-06-05T11:03:45Z",  "data": {    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",    "createdAt": "2024-06-04T11:03:45Z",    "updatedAt": "2023-06-04T11:04:45Z",    "status": "PROCESSED"  }}\`
\`PD_ORDER.PROCESSED\` | Occurs upon completion of a piracy detection order processing. | \`{   "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d334",   "eventType": "PD_ORDER.PROCESSED",   "occurredAt": "2024-06-02T11:03:45Z",   "data": {     "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442e",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc7",     "createdAt": "2024-06-01T11:03:45Z",     "updatedAt": "2023-06-01T11:04:45Z",     "status": "PROCESSED"   } }\`



`
export default apiDocumentation;