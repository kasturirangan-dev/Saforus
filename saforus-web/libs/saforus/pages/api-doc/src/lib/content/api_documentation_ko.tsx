const koreanApiDocumentation = `
## 인증

### 로그인

| | | | | |
--- | --- | --- | --- | ---
**설명** | | 제공된 자격 증명으로 액세스 토큰을 생성하기 위해 마크애니 시스템을 호출할 고객사를 위한 API입니다.| | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/change-password\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`email\` | string |자격 증명을 받기 위해 마크애니에 등록된 고객사의 이메일 입니다.|
|| | \`password\` | string |  마크애니 시스템 로그인에 사용되는 비밀번호입니다. 최초 비밀번호는 마크애니에서 임의로 생성하여 상기 등록된 파트너 이메일로 발송됩니다. 암호의 길이는 8자 이상이어야 하며 대문자와 소문자 및 숫자를 각 하나 이상 포함해야 합니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`token\` | string | 다른 마크애니 API를 호출하기 위한 엑세스 토큰입니다.|

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9"
  }
}
\`\`\`


### 비밀번호 변경

| | | | | |
--- | --- | --- | --- | ---
**설명** | | 고객사가 비밀번호 변경을 위해 마크애니 시스템을 호출하는 API 입니다.| | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/change-password\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`oldPassword\` | string | 고객사의 이전 비밀번호입니다.|
|| | \`newPassword\` | string |  고객사가 제공한 새로운 비밀번호입니다. 암호의 길이는 8자 이상이어야 하며 대문자와 소문자 및 숫자를 각 하나 이상 포함해야 합니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`n/a\` |  | |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`

### 비밀번호 초기화 작업 트리거

| | | | | |
--- | --- | --- | --- | ---
**설명** | | 고객사가 비밀번호 초기화 작업의 트리거를 진행하기 위해 마크애니 시스템을 호출하는 API.| | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`email\` | string |  이 이메일은 비밀번호를 초기화할 고객사 계정을 나타냅니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`n/a\` | | |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`


### 비밀번호 초기화

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 비밀번호 초기화를 위해 마크애니 시스템을 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/reset-password\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json  Authorization: Bearer {{PASSWORD_RESET_TOKEN}} \`| | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`newPassword\` | string | 고객사가 제공한 신규 비밀번호입니다. 암호의 길이는 8자 이상이어야 하며 대문자와 소문자 및 숫자를 각 하나 이상 포함해야 합니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`n/a\` |  | |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK"
}
\`\`\`


### 웹훅 엔드포인트 생성

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 웹훅 엔드포인트 생성을 위해 마크애니 시스템을 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`url\` | string | 마크애니가 시스템에서 발생한 이벤트에 대해 알릴 수 있도록 해주는 웹훅 URL 입니다. |
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`webhookSecret\` | string | 웹훅 서명 생성을 위한 엔드포인트의 시크릿입니다. 자세한 내용 웹훅 보안 (선택사항) 섹션을 참조하시기 바랍니다.|

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "webhookSecret": "ZtI12RzeWuh+iYw=="
  }
}
\`\`\`

### API 키 관리

| | | | | |
--- | --- | --- | --- | ---
**설명** | |API 키를 만들기 위한 API. | | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`name\` | string | API 키의 이름|
|| | \`note\` | string | **선택 사항**. API 키에 대한 설명.|
|| | \`expiredAt\` | string | API 키가 만료될 날짜 및 시간 (UTC 시간대의 ISO 8601 형식)|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`id\` | string | API 키 식별자.|
|| | \`accountId\` | string | API 키가 속한 계정의 식별자.|
|| | \`name\` | string | API 키의 이름.|
|| | \`status\` | string | API 키의 현재 상태. 현재 유효한 값은 두 가지입니다: <br> \`ACTIVE\`: API 키를 사용할 수 있습니다. <br> \`INACTIVE\`: API 키를 사용할 수 없습니다. |
|| | \`token\` | string | API 키를 설명하는 임의의 고유 문자열. 파트너는 이 값을 인증 요청 헤더의 Bearer 토큰으로 사용하여 워터마크 및 불법 복제 감지 API를 호출해야 합니다. |
|| | \`note\` | string | API 키에 대한 설명. |
|| | \`expiredAt\` | string | API 키가 만료될 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`createdAt\` | string | API 키가 생성된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`updatedAt\` | string | API 키가 마지막으로 업데이트된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |

#### 샘플 요청

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

#### 샘플 응답

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
**설명** | | 모든 API 키를 가져올 API.| | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys\`| | |
|| **HTTP 메소드** | \`GET\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **응답 데이터 바디** | **Properties** | **타입** | **비고** |
|| | \`page\` | integer | 조회할 페이지 번호입니다.|
|| | \`pageSize\` | integer | 페이지당 요소 수.|
**응답** | **응답 데이터 본문** | **Properties** | **타입** | **비고**
|| | \`records[*].id\` | string | API 키 식별자.|
|| | \`records[*].accountId\` | string | API 키가 속한 계정의 식별자.|
|| | \`records[*].name\` | string | API 키의 이름.|
|| | \`records[*].status\` | string | API 키의 현재 상태. 현재 유효한 값은 두 가지입니다: <br> \`ACTIVE\`: API 키를 사용할 수 있습니다. <br> \`INACTIVE\`: API 키를 사용할 수 없습니다. |
|| | \`records[*].token\` | string | API 키를 설명하는 임의의 고유 문자열. 파트너는 이 값을 인증 요청 헤더의 Bearer 토큰으로 사용하여 워터마크 및 불법 복제 감지 API를 호출해야 합니다.|
|| | \`records[*].note\` | string | API 키에 대한 설명. |
|| | \`records[*].expiredAt\` | string | API 키가 만료될 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`records[*].lastUsedAt\` | string | API 키가 마지막으로 사용된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`records[*].createdAt\` | string | API 키가 생성된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`records[*].updatedAt\` | string | API 키가 마지막으로 업데이트된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
|| | \`page\` | string | 페이지 번호. |
|| | \`pageSize\` | string | 페이지당 요소 수. |
|| | \`total\` | string | 총 요소 수. |

#### 샘플 요청

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

#### 샘플 응답

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
**설명** | |API 키를 업데이트하기 위한 | | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}\`| | |
|| **HTTP 메소드** | \`PATCH\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`apiKeyId\` | string | 업데이트할 API 키의 식별자. |
|| **Request Body** | **Properties** | **타입** | **비고** |
|| | \`name\` | string | API 키 이름의 새 값. |
|| | \`status\` | string | API 키의 현재 상태. 현재 유효한 값은 두 가지입니다: <br> \`ACTIVE\`: API 키를 사용할 수 있습니다. <br> \`INACTIVE\`: API 키를 사용할 수 없습니다. |
|| | \`note\` | string | **선택 사항**. API 키에 대한 새 설명. |
|| | \`expiredAt\` | string | API 키가 만료될 새 날짜 및 시간 (UTC 시간대의 ISO 8601 형식). |
**응답** | **응답 데이터 본문** | **Properties** | **타입** | **비고**
|| | \`NA\` |  | |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
"code": "CSA0000",
"msg": "OK"
}
\`\`\`

| | | | | |
--- | --- | --- | --- | ---
**설명** | | API 키를 삭제하는 API| | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}\`| | |
|| **HTTP 메소드** | \`DELETE\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`apiKeyId\` | string | 삭제할 API 키의 식별자. |
**응답** | **응답 데이터 본문** | **Properties** | **타입** | **비고**
|| | \`NA\` |  | |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
"code": "CSA0000",
"msg": "OK"
}
\`\`\`

## 워터마크

### 워터마크 주문 생성하기

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 워터마크 주문을 생성하기 위해 마크애니 시스템을 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`idempotencyKey\` | string | Idempotency를 목적으로 이 요청을 고유하게 식별하는 키입니다.|
|| | \`title\` | string | 주문의 제목입니다|
|| | \`files[*].fileName\` | string | 워터마크를 진행할 파일명입니다.|
|| | \`files[*].fileType\` | string | 워터마크를 진행할 파일 타입입니다. 현재 총 4개의 타입을 지원합 \`IMG\`: jpg, png, tiff \`AUDIO\`: mp3, wav \`VIDEO\`: mp4 \`DOCUMENT\`: pdf|
|| | \`files[*].wtrMsg\` | string | 워터마킹할 메시지입니다. 1 ~ 65535 범위의 정수를 문자열로 표.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`id\` | string | 주문 리소스의 식별자입니다.|
|| | \`accountId\` | string | 고객사 계정 리소스의 식별자입니다.|
|| | \`idempotencyKey\` | string | 주문 요청을 고유하게 식별할 수 있는 키입니다.|
|| | \`status\` | string | 주문의 현재 상태이며, 아래 두 가지 유효한 값을 가집니다: \`AWAITING_PROCESS\`: 이 주문은 주문의 모든 파일이 업로드되고 처리될 때까지 대기합니다. \`PROCESSED\` : 이 주문의 모든 파일이 처리된 상태입니다 (성공 여부와 무관합니다). |
|| | \`title\` | string | 주문 리소스의 제목입니다.|
|| | \`orderFiles[*].id\` | string | 주문 파일 리소스의 식별자입니다.|
|| | \`orderFiles[*].fileName\` | string | 주문 파일 리소스의 이름입니다.|
|| | \`orderFiles[*].uploadUrl\` | string | 워터마킹 목적으로 파일을 업로드할 URL입니다. 현재 마크애니는 확장성 및 성능 확보를 위해 Amazon S3 클라우드 스토리지를 활용하여 고객사 파일을 저장하고 있습니다. 각 고객사는 보안을 위해 고유한 저장 위치를 가지고 있습니다. 링크의 기본 만료 시간은 **30분입니다**.|
|| | \`orderFiles[*].fileType\` | string | 요청의 **fileType** 필드와 동일한 파일 타입입니다.|
|| | \`orderFiles[*].status\` | string | 주문 파일의 현재 상태입니다. 총 3개의 유효한 값이 있습니다: \`AWAITING_PROCESS\`: 주문 파일의 워터마킹이 대기중입니다. \`SUCCEEDED\`: 이 주문 파일은 지정된 \`wtrMsg\` 로 성공적으로 워터마킹되었습니다 \`FAILED\`: 이 주문 파일은 워터마킹할 수 없습니다.|
|| | \`orderFiles[*].wtrMsg\` | string | 워터마킹할 메세지입니다.|
|| | \`createdAt\` | string | 주문이 생성된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`updatedAt\` | string | 문이 마지막으로 업데이트된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`createdBy\` | string | 이 주문을 생성한 당사자입니다.|
|| | \`updatedBy\` | string | 이 주문을 마지막으로 업데이트한 당사자 입니다.|

#### 샘플 요청

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

#### 샘플 응답

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

### 워터마크 주문 가져오기

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 워터마크 주문에 대한 정보를 가져오기 위해 마크애니 시스템에 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`GET\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`orderId\` | string | 주문 리소스의 식별자입니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`id\` | string | 주문 리소스의 식별자입니다.|
|| | \`accountId\` | string | 고객사 계정 리소스의 식별자입니다.|
|| | \`idempotencyKey\` | string | Idempotency를 목적으로 이 요청을 고유하게 식별하는 키입니다.|
|| | \`status\` | string | 주문의 현재 상태이며, 아래 두 가지 유효한 값을 가집니다:\`AWAITING_PROCESS\`: 이 주문은 주문의 모든 파일이 업로드되고 처리될 때까지 대기합니다. \`PROCESSED\`: 이 주문의 모든 파일이 처리된 상태입니다 (성공 여부와 무관합니다).|
|| | \`title\` | string | 주문 리소스의 제목입니다.|
|| | \`orderFiles[*].id\` | string | 주문 파일 리소스의 식별자입니다.|
|| | \`orderFiles[*].fileName\` | string | 주문 파일 리소스의 이름입니다.|
|| | \`orderFiles[*].origDownloadUrl\` | string |  업로드된 원본 파일을 다운로드할 URL입니다. 파일이 성공적으로 업로드된 경우에만 링크가 작동합니다. 링크의 기본 만료 시간은 **30분입니다**.|
|| | \`oorderFiles[*].wtrDownloadUrl\` | string | 워터마킹된 파일을 다운로드할 URL입니다. 해당 파일에 워터마킹이 성공한 경우에만 링크가 작동합니다. 링크의 기본 만료 시간은 **30분입니다**.|
|| | \`orderFiles[*].fileType\` | string | 요청의 **fileType** 필드와 동일한 파일 타입입니다.|
|| | \`orderFiles[*].status\` | string | 주문 파일의 현재 상태입니다. 총 3개의 유효한 값이 있습니다: \`AWAITING_PROCESS\`: 주문 파일의 워터마킹이 대기중입니다. \`SUCCEEDED\`: 이 주문 파일은 지정된 \`wtrMsg\`로 성공적으로 워터마킹되었습니다 \`FAILED\`: 이 주문 파일은 워터마킹할 수 없습니다.|
|| | \`orderFiles[*].wtrMsg\` | string | 워터마크를 진행할 메세지입니다.|
|| | \`orderFiles[*].resolution\` | string | (**선택사항**) \`DOCUMENT\` 파일 타입인 경우에만 사용 가능하며, 워터마킹 시 문서의 해상도 정보를 지정합니다. 참고사항: 이 필드는 \`DOCUMENT\` 타입에 맞게 올바르게 작동하기 위해 불법 복제 탐지 프로세스의 입력값으로 사용되어야  합니다. 섹션 3.3.3.1. 불법 복제 탐지 주문 생성을 참고해 주시기바랍니다. 워터마킹할 메세지입니다.|
|| | \`createdAt\` | string | 주문이 생성된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`updatedAt\` | string | 문이 마지막으로 업데이트된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`createdBy\` | string | 이 주문을 생성한 당사자입니다.|
|| | \`updatedBy\` | string | 이 주문을 마지막으로 업데이트한 당사자 입니다.|

#### 샘플 요청

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

#### 샘플 응답

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


## 불법 복제 탐지

### 불법 복제 탐지 주문 생성하기

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 불법 복제 탐지 주문을 생성하기 위해 마크애니 시스템을 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 바디** | **Properties** | **타입** | **비고** |
|| | \`idempotencyKey\` | string | Idempotency를 목적으로 이 요청을 고유하게 식별하는 키입니다.|
|| | \`title\` | string | 주문의 제목입니다.|
|| | \`files[*].fileName\` | string | 워터마크 코드 탐지를 진행할 파일명입니다.|
|| | \`files[*].fileType\` | string | 워터마크 코드 탐지를 진행할 파일 타입입니다. 현재 총 4개의 타입을 지원합니다: \`IMG\`: jpg, png, tiff \`AUDIO\`: mp3, wav \`VIDEO\`: mp4 \`DOCUMENT\`: pdf|
|| | \`files[*].resolution\` | string | (**선택사항**) \`DOCUMENT\` 파일 타입인 경우의 해상도 정보입니다. 이 정보는 섹션 3.3.2.2. 워터마크 주문 가져   오기 API 에서 얻을 수 있습니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`id\` | string | 주문 리소스의 식별자입니다.|
|| | \`accountId\` | string | 고객사 계정 리소스의 식별자입니다.|
|| | \`idempotencyKey\` | string | Idempotency를 목적으로 주문 요청을 고유하게 식별하는 키입니다.|
|| | \`status\` | string | 주문의 현재 상태이며, 아래 두 가지 유효한 값을 가집니다: \`AWAITING_PROCESS\`: 이 주문은 주문의 모든 파일이 업로드되고 처리될 때까지 대기합니다. \`PROCESSED\`: 이 주문의 모든 파일이 처리된 상태입니다 (성공 여부와 무관합니다).|
|| | \`title\` | string | 주문 리소스의 제목입니다.|
|| | \`orderFiles[*].id\` | string | 주문 파일 리소스의 식별자입니다.|
|| | \`orderFiles[*].fileName\` | string | 주문 파일 리소스의 이름입니다.|
|| | \`orderFiles[*].uploadUrl\` | string | 워터마킹 목적으로 파일을 업로드할 URL입니다. 현재 마크애니는 확장성 및 성능 확보를 위해 Amazon S3 클라우드 스토리지를 활용하여 고객사 파일을 저장하고 있습니다. 각 고객사는 보안을 위해 고유한 저장 위치를 가지고 있습니다.링크의 기본 만료 시간은 **30분입니다**.|
|| | \`orderFiles[*].fileType\` | string | 요청의 \`fileType\` 필드와 동일한 파일 타입입니다.|
|| | \`orderFiles[*].status\` | string | 주문 파일의 현재 상태입니다. 총 4개의 유효한 값이 있습니다: \`AWAITING_PROCESS\`: 주문 파일이 처리 대기중입니다. \`DETECTED\`: 이 주문 파일의 워터마크 코드가 성공적으로 탐지되었습니다. \`UNDETECTED\`: 마크애니가 이 주문 파일에서 워터마크 코드를 탐지할 수 없습니다. \`FAILED\`: 처리를 완료하지 못하게 하는 문제가 발생했습니다.|
|| | \`orderFiles[*].resolution\` | string | (**선택사항**) \`DOCUMENT\` 파일 타입인 경우의 해상도 정보입니다.|
|| | \`createdAt\` | string | 주문이 생성된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`updatedAt\` | string | 주문이 마지막으로 업데이트된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`createdBy\` | string | 이 주문을 생성한 당사자입니다.|
|| | \`updatedBy\` | string | 이 주문을 마지막으로 업데이트한 당사자 입니다.|

#### 샘플 요청

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

#### 샘플 응답

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


### 불법 복제 탐지 주문 가져오기

| | | | | |
--- | --- | --- | --- | ---
**설명** | |고객사가 불법 복제 탐지 주문 정보를 가져오기 위해 마크애니 시스템을 호출하는 API 입니다. | | |
**요청** | **URL** | \`{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`GET\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`orderId\` | string | 주문 리소스의 식별자입니다.|
**응답** | **응답 데이터 바디** | **Properties** | **타입** | **비고**
|| | \`id\` | string | 주문 리소스의 식별자입니다.|
|| | \`accountId\` | string | 고객사 계정 리소스의 식별자입니다.|
|| | \`idempotencyKey\` | string | 주문 요청을 고유하게 식별하는 키입니다.|
|| | \`status\` | string | 주문 파일의 현재 상태입니다. 총 4개의 유효한 값이 있습니다: \`AWAITING_PROCESS\`: 주문 파일이 처리 대기중입니다. \`DETECTED\`: 이 주문 파일의 워터마크 코드가 성공적으로 탐지되었습니다. \`UNDETECTED\`: 마크애니가 이 주문 파일에서 워터마크 코드를 탐지할 수 없습니다. \`FAILED\`: 처리를 완료하지 못하게 하는 문제가 발생했습니다.|
|| | \`title\` | string | 주문 리소스의 제목입니다.|
|| | \`orderFiles[*].id\` | string | 주문파일 리소스의 식별자 입니다.|
|| | \`orderFiles[*].fileName\` | string | 주문 파일 리소스의 파일명입니다.|
|| | \`orderFiles[*].origDownloadUrl\` | string | 업로드된 원본 파일을 다운로드할 URL입니다. 파일이 성공적으로 업로드된 경우에만 링크가 작동합니다. 링크의 기본 만료 시간은 **30분입니다**.|
|| | \`orderFiles[*].fileType\` | string | 요청의 \`fileType\` 필드와 동일한 파일 타입입니다.|
|| | \`orderFiles[*].status\` | string | 주문 파일의 현재 상태입니다. 총 3개의 유효한 값이 있습니다: \`AWAITING_PROCESS\`: 주문 파일의 워터마킹이 대기중입니다. \`SUCCEEDED\`: 이 주문 파일은 지정된 \`wtrMsg\` 로 성공적으로 워터마킹되었습니다 \`FAILED\`: 이 주문 파일은 워터마킹할 수 없습니다.|
|| | \`orderFiles[*].detectedCode\` | string | 탐지된 워터마크 코드입니다. 탐지된 경우 0보다 커야 합니다.|
|| | \`orderFiles[*].resolution\` | string | (**선택사항**) \`DOCUMENT\` 파일 타입인 경우에만 적용됩니다.|
|| | \`createdAt\` | string | 주문이 생성된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`updatedAt\` | string | 주문이 마지막으로 업데이트된 일시(UTC 시간대의 ISO 8601) 입니다.|
|| | \`createdBy\` | string | 이 주문을 생성한 당사자입니다.|
|| | \`updatedBy\` | string | 이 주문을 마지막으로 업데이트한 당사자 입니다.|

#### 샘플 요청

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

#### 샘플 응답

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

## 파일 삭제

### 원본 / 워터마크 파일 삭제

| | | | | |
--- | --- | --- | --- | ---
**설명** | | 주문 ID를 기준으로 원본 / 워터마크 파일을 삭제하는 API| | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/order-files\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`DELETE\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`orderId\` | string | 주문 리소스의 식별자.|
**응답** | **응답 데이터 본문** | **NA** |  |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

### 불법 복제 감지 파일 삭제

| | | | | |
--- | --- | --- | --- | ---
**설명** | |주문 ID를 기준으로 불법 복제 파일을 삭제하는 API | | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}/order-files\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`DELETE\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`orderId\` | string | 주문 리소스의 식별자.|
**응답** | **응답 데이터 본문** | **NA** |  |

#### 샘플 요청

\`\`\`curl
curl --location --request DELETE '  ' \
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

#### 샘플 응답

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

## 워터마크 파일 공유&nbsp;
### 워터마크 파일 공유&nbsp;

| | | | | |
--- | --- | --- | --- | ---
**설명** | |주문 ID를 기준으로 워터마크 파일을 공유하는 API | | |
**요청** | **URL** | \`https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/share\`| | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| **HTTP 메소드** | \`POST\` | | |
|| **헤더** | \`Content-Type: application/json Authorization: Bearer {{ACCESS_TOKEN}}\` | | |
|| **요청 경로 변수** | **Properties** | **타입** | **비고** |
|| | \`orderId\` | string | 주문 리소스의 식별자.|
|| **요청 본문** | **Properties** | **타입** | **비고** |
|| | \`email\` | string | 워터마크 파일을 공유할 이메일 주소.|
**응답** | **응답 데이터 본문** | **NA** |  |

#### 샘플 요청

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

#### 샘플 응답

\`\`\`json
{
"code": "CSW0000",
"msg": "OK"
}
\`\`\`

## 웹훅

### 구독

마크애니는 이벤트가 발생하면 웹훅을 사용하여 고객사에게 알립니다.
이벤트 예시: WTR_ORDER.PROCESSED , PD_ORDER.PROCESSED 등 (전체 이벤트 목록은 섹션 3.4.3. 이벤트에서 확인하실 수 있습니다.)

> **주의사항**:새로운 이벤트 유형이 플랫폼에 지속적으로 추가됩니다. 어떤 이벤트를 어떻게 처리할 것인지는 고객사에게 달려 있지만, 이벤트 리스너의 구현은 새로운 이벤트 유형을 문제없이 처리할 수 있어야 합니다.

이러한 이벤트 중 하나가 발생하면, HTTP POST 요청이 웹훅의 구성된 URL로 전송되어 이에 대한 작업을 수행할 수 있습니다.

> **비고** 당사는 이벤트가 단 한 번만 처리되도록 하기 위해 웹훅 핸들러를 Idempotency가 보장되도록 구성하는 것을 적극 권장합니다.

지정된 URL로 단일 웹훅 이벤트를 전달하려고 시도됩니다. 어떠한 사유(200 이외의 타임아웃 또는 HTTP 응답 코드)로 전달에 실패하면, 지수 백오프 알고리즘으로 최대 **3회**까지 이벤트를 재시도합니다. 이벤트는 생성 즉시 송부되나, 작동하지 않을 수 있습니다. 이 문제를 처리해야 하는 것은 현재로는 고객사의 의무이나, 당사는 이를 극복하기 위해 플랫폼을 지속적으로 개선하고 있습니다.

> **주의사항**: 재시도된 이벤트를 두 번 이상 처리하지 않으려면 eventId를 Idempotent Key로 사용하여 Idempotency를 구현해야 합니다.


### 웹훅의 보안 (선택사항)

서버가 예상되는 마크애니 요청만 수신하고 있는지 확인합니다:

- 고객사의 서버가 페이로드를 수신하도록 구성되면, 구성한 엔드포인트로 전송된 모든 페이로드를 수신합니다.
-  보안상의 이유로 마크애니에서 페이로드가 오고 있는지 확인해야 합니다.
- 웹훅을 생성할 때 페이로드를 확인하려면 마크애니가 페이로드에 서명하는 데 사용할 비밀 토큰을 설정할 수 있습니다.

고객사의 비밀토큰 설정하기:

- \`Staging\` 및 \`Production\` 환경 모두에서 비밀 토큰을 마크애니에게 제공합니다.
- 미래에는 UI 툴을 통해 구성할 수 있도록 플랫폼을 개선할 예정입니다.

마크애니의 페이로드 확인하기:

- 비밀 토큰이 설정된 경우 마크애니는 이 토큰을 사용하여 웹훅 요청의 전체 본문과 함께 해시 시그니처를 만듭니다.
- Base64로 인코딩된 이 해시 서명은 헤더의 X-MarkAny-Signature로 각 요청과 함께  전달됩니다.
- 마크애니는 HMAC SHA-256를 사용하여 해시를 계산합니다.
- C해시 값을 X-MarkAny-Signature 헤더의 값과 비교합니다:
동일한 경우 이 요청은 유효성 검사를 통과합니다.
이 값이 일치하지 않으면, 이 요청이 전송 중에 변경되었거나 다른 사람이 엔드포인트로 스푸핑 요청을 보낸 것으로 해석할 수 있습니다.


예시 코드:

이벤트 예시(바디 포함)|
---|
\`{  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",  "eventType": "WTR_ORDER.PROCESSED",  "occurredAt": "2024-06-05T11:03:45Z",  "data": {    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",    "createdAt": "2024-06-04T11:03:45Z",    "updatedAt": "2023-06-04T11:04:45Z",    "status": "PROCESSED"  }}\` |


서명 확인: |
---|
\`// Hmac256 using Apache Commons Codec var secretToken = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Get from the Create Webhook Endpoint API var eventBody =   """     {       "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",       "eventType": "WTR_ORDER.PROCESSED",       "occurredAt": "2024-06-05T11:03:45Z",       "data": {         "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",         "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",         "createdAt": "2024-06-04T11:03:45Z",         "updatedAt": "2023-06-04T11:04:45Z",         "status": "PROCESSED"       }     }     """; var hm256 = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, Base64.getDecoder().decode(secretToken)); var hashValue = hm256.hmacHex(eventBody); // hashValue = f679dc83b37aa8438c41c55db556dffe0fdb1c1a954d1dc6e70bb9484d79081e assert hashValue.equals(request.getHeader("x-markany-signature"));\`|


## 이벤트

마크애니는 이벤트를 사용하여 리소스에 발생하는 중요한 변경 사항을 기록합니다. 이벤트가 생성되면 웹훅 호출을 통해 고객사의 응용 프로그램으로 전달됩니다.

당사의 이벤트 타입은 \`{{RESOURCE}}.{{EVENT}}\` 구조를 따릅니다.

각 이벤트에는 이벤트 인스턴스를 고유하게 식별하는 \`eventId\` 필드, 이벤트 인스턴스의 타입을 식별하는 \`eventType\` 필드 및 이벤트가 발생하는 시간을 식별하는 \`occurredAt\` 필드가 포함됩니다.

이벤트 타입 | 설명 | 샘플 요청
--- | --- | ---
\`WTR_ORDER.PROCESSED\` | 워터마킹 주문이 처리될 때 발생합니다. | \`{  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",  "eventType": "WTR_ORDER.PROCESSED",  "occurredAt": "2024-06-05T11:03:45Z",  "data": {    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",    "createdAt": "2024-06-04T11:03:45Z",    "updatedAt": "2023-06-04T11:04:45Z",    "status": "PROCESSED"  }}\`
\`PD_ORDER.PROCESSED\` | 불법 복제 탐지 주문이 처리될 때 발생합니다. | \`{   "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d334",   "eventType": "PD_ORDER.PROCESSED",   "occurredAt": "2024-06-02T11:03:45Z",   "data": {     "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442e",    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc7",     "createdAt": "2024-06-01T11:03:45Z",     "updatedAt": "2023-06-01T11:04:45Z",     "status": "PROCESSED"   } }\`



`
export default koreanApiDocumentation;