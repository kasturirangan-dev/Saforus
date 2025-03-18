const codeExamples = {
  overallStructure: {
    json: `{      
  "code": "some code", // Successful or failed code       
  "msg": "some message", // The human readable description of the code       
  "data": {// (optional) Entity fields in successful cases OR error field descriptions in validation failed cases
  }
}`,
  },
  eventExample: {
    json: `{
  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",
  "eventType": "WTR_ORDER.PROCESSED",
  "occurredAt": "2024-06-05T11:03:45Z",
  "data": {
    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",
    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",
    "createdAt": "2024-06-04T11:03:45Z",
    "updatedAt": "2023-06-04T11:04:45Z",
    "status": "PROCESSED"
  }
}`,
  },
  validateSignature: {
    java: `// // HMAC SHA-256 signature verification using Apache Commons Codec
var secretToken = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Retrieved from the Webhook Endpoint Creation API
var eventBody =
  """
    {
      "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",
      "eventType": "WTR_ORDER.PROCESSED",
      "occurredAt": "2024-06-05T11:03:45Z",
      "data": {
        "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",
        "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",
        "createdAt": "2024-06-04T11:03:45Z",
        "updatedAt": "2023-06-04T11:04:45Z",
        "status": "PROCESSED"
      }
    }
    """;
var hm256 = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, Base64.getDecoder().decode(secretToken));
var hashValue = hm256.hmacHex(eventBody);
// hashValue = f679dc83b37aa8438c41c55db556dffe0fdb1c1a954d1dc6e70bb9484d79081e

assert hashValue.equals(request.getHeader("x-markany-signature"));`,
  },
  wmCreate: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "idempotencyKey": "502",
      "title": "create watermark order",
      "files": [
        {
          "fileName": "image002.jpg",
          "fileType": "IMG",
          "wtrMsg": "6789"
        }
      ]
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders")
  .method("POST", body)
  .addHeader("Authorization", "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders' \\
--header 'Authorization: Bearer 43f87542-1ce4-4ef8-8413-138e8d766278' \\
--header 'Content-Type: application/json' \\
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
}'`,
    python: `import requests

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
  'Authorization': 'Bearer 43f87542-1ce4-4ef8-8413-138e8d766278',
  'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278",
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
  .catch(error => console.log('error', error));`,
  },
  wmCreateResponse: {
    json: `{
  "code": "CSW0000",
  "msg": "OK",
  "data": {
    "id": "26249042-c1eb-4b54-9358-b924f407e6c2",
    "accountId": "5e22f922-4e30-405d-a121-075e440e1868",
    "idempotencyKey": "501",
    "status": "AWAITING_PROCESS",
    "title": "create watermark order",
    "orderFiles": [
      {
        "id": "fcf805cd-3a7f-4d79-84c7-d7ce574c6638",
        "fileName": "image002.jpg",
        "uploadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T063917Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=903b7dc0f6b06ca07c759b881cf5da7ec8e8a500e6fe6ba84ff84187461b3c86",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS",
        "wtrMsg": "6789"
      }
    ],
    "createdAt": "2024-09-05T06:38:57.269359Z",
    "updatedAt": "2024-09-05T06:38:57.564985Z",
    "createdBy": "5e22f922-4e30-405d-a121-075e440e1868",
    "updatedBy": "5e22f922-4e30-405d-a121-075e440e1868"
  }
}`,
  },
  wmUpload: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(mediaType, "@/Users/user/Documents/markany/sample-files/image002.jpg=");
Request request = new Request.Builder()
  .url("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T063917Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=903b7dc0f6b06ca07c759b881cf5da7ec8e8a500e6fe6ba84ff84187461b3c86")
  .method("PUT", body)
  .addHeader("x-amz-meta-markany-file-type", "IMG")
  .addHeader("x-amz-meta-markany-wtr-msg", "6789")
  .addHeader("x-amz-meta-markany-file-id", "fcf805cd-3a7f-4d79-84c7-d7ce574c6638")
  .addHeader("Content-Type", "application/x-www-form-urlencoded")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T063917Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=903b7dc0f6b06ca07c759b881cf5da7ec8e8a500e6fe6ba84ff84187461b3c86' \\
--header 'x-amz-meta-markany-file-type: IMG' \\
--header 'x-amz-meta-markany-wtr-msg: 6789' \\
--header 'x-amz-meta-markany-file-id: fcf805cd-3a7f-4d79-84c7-d7ce574c6638' \\
--data '@/Users/user/Documents/markany/sample-files/image002.jpg'`,
    python: `import requests

url = "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T063917Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=903b7dc0f6b06ca07c759b881cf5da7ec8e8a500e6fe6ba84ff84187461b3c86"

payload = '%40%2FUsers%2Fuser%2FDocuments%2Fmarkany%2Fsample-files%2Fimage002.jpg='
headers = {
  'x-amz-meta-markany-file-type': 'IMG',
  'x-amz-meta-markany-wtr-msg': '6789',
  'x-amz-meta-markany-file-id': 'fcf805cd-3a7f-4d79-84c7-d7ce574c6638',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text) 
`,
    javascript: `fetch("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T063917Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=903b7dc0f6b06ca07c759b881cf5da7ec8e8a500e6fe6ba84ff84187461b3c86", {
  method: "PUT",
  headers: {
    "x-amz-meta-markany-file-type": "IMG",
    "x-amz-meta-markany-wtr-msg": "6789",
    "x-amz-meta-markany-file-id": "fcf805cd-3a7f-4d79-84c7-d7ce574c6638",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: new URLSearchParams({
    "@/Users/user/Documents/markany/sample-files/image002.jpg": ""
  })
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  wmGet: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/26249042-c1eb-4b54-9358-b924f407e6c2")
  .method("GET", null)
  .addHeader("Authorization", "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/26249042-c1eb-4b54-9358-b924f407e6c2' \\
--header 'Authorization: Bearer 43f87542-1ce4-4ef8-8413-138e8d766278'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/26249042-c1eb-4b54-9358-b924f407e6c2"
headers = {
  'Authorization': 'Bearer 43f87542-1ce4-4ef8-8413-138e8d766278'
}

response = requests.get(url, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/26249042-c1eb-4b54-9358-b924f407e6c2", {
  method: "GET",
  headers: {
    "Authorization": "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278",
  },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  wmGetResponse: {
    json: `{
  "code": "CSW0000",
  "msg": "OK",
  "data": {
    "id": "26249042-c1eb-4b54-9358-b924f407e6c2",
    "accountId": "5e22f922-4e30-405d-a121-075e440e1868",
    "idempotencyKey": "501",
    "status": "AWAITING_PROCESS",
    "title": "create watermark order",
    "orderFiles": [
      {
        "id": "fcf805cd-3a7f-4d79-84c7-d7ce574c6638",
        "fileName": "image002.jpg",
        "origDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T064425Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=2796f92f8b91cf113ec5840bc480745e439e06f04e15eb6050ac39b161154bfc",
        "wtrDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T064425Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=07969312e766e45410e9850c77affe9024efe5dbeaa7762f5e89a1db8328b2e5",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS",
        "wtrMsg": "6789",
        "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
      }
    ],
    "createdAt": "2024-09-05T06:38:57.269359Z",
    "updatedAt": "2024-09-05T06:38:57.564985Z",
    "createdBy": "5e22f922-4e30-405d-a121-075e440e1868",
    "updatedBy": "5e22f922-4e30-405d-a121-075e440e1868"
  }
}`,
  },
  pdCreate: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "idempotencyKey": "703",
      "title": "create piracy detection order",
      "files": [
        {
          "fileName": "image002_sf6789.jpg",
          "fileType": "IMG",
          "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
        }
      ]
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders")
  .method("POST", body)
  .addHeader("Authorization", "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders' \\
--header 'Authorization: Bearer 43f87542-1ce4-4ef8-8413-138e8d766278' \\
--header 'Content-Type: application/json' \\
--data '{
  "idempotencyKey": "703",
  "title": "create piracy detection order",
  "files": [
    {
      "fileName": "image002_sf6789.jpg",
      "fileType": "IMG",
      "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
    }
  ]
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders"

payload = {
  "idempotencyKey": "703",
  "title": "create piracy detection order",
  "files": [
    {
      "fileName": "image002_sf6789.jpg",
      "fileType": "IMG",
      "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
    }
  ]
}
headers = {
  'Authorization': 'Bearer 43f87542-1ce4-4ef8-8413-138e8d766278',
  'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "idempotencyKey": "703",
    "title": "create piracy detection order",
    "files": [
      {
        "fileName": "image002_sf6789.jpg",
        "fileType": "IMG",
        "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
      }
    ]
  })
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  pdCreateResponse: {
    json: `{
  "code": "CSP0000",
  "msg": "OK",
  "data": {
    "id": "da54b638-afaf-47bd-a660-4cac27bfe734",
    "accountId": "5e22f922-4e30-405d-a121-075e440e1868",
    "idempotencyKey": "703",
    "status": "AWAITING_PROCESS",
    "title": "create piracy detection order",
    "orderFiles": [
      {
        "id": "45d07068-ffa8-4464-a377-72c37c49a9ff",
        "fileName": "image002_sf6789.jpg",
        "uploadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T075952Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-orig-file-key&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=5a3c00bee4b6fd9a222d7b2d228786dcec7dcf2a894421bbef361f6a0e2917fe",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS",
        "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
      }
    ],
    "createdAt": "2024-09-05T07:59:51.848668041Z",
    "updatedAt": "2024-09-05T07:59:52.009343Z",
    "createdBy": "5e22f922-4e30-405d-a121-075e440e1868",
    "updatedBy": "5e22f922-4e30-405d-a121-075e440e1868"
  }
}`,
  },
  pdUpload: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(mediaType, "@/Users/user/Downloads/image002_sf6789.jpg=");
Request request = new Request.Builder()
  .url("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T075952Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-orig-file-key&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=5a3c00bee4b6fd9a222d7b2d228786dcec7dcf2a894421bbef361f6a0e2917fe")
  .method("PUT", body)
  .addHeader("x-amz-meta-markany-file-type", "IMG")
  .addHeader("x-amz-meta-markany-file-id", "45d07068-ffa8-4464-a377-72c37c49a9ff")
  .addHeader("x-amz-meta-markany-orig-file-key", "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg")
  .addHeader("Content-Type", "application/x-www-form-urlencoded")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T075952Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-orig-file-key&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=5a3c00bee4b6fd9a222d7b2d228786dcec7dcf2a894421bbef361f6a0e2917fe' \\
--header 'x-amz-meta-markany-file-type: IMG' \\
--header 'x-amz-meta-markany-file-id: 45d07068-ffa8-4464-a377-72c37c49a9ff' \\
--header 'x-amz-meta-markany-orig-file-key: wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg' \\
--data '@/Users/user/Downloads/image002_sf6789.jpg'`,
    python: `import requests

url = "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T075952Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-orig-file-key&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=5a3c00bee4b6fd9a222d7b2d228786dcec7dcf2a894421bbef361f6a0e2917fe"

payload = '%40%2FUsers%2Fuser%2FDownloads%2Fimage002_sf6789.jpg='
headers = {
  'x-amz-meta-markany-file-type': 'IMG',
  'x-amz-meta-markany-file-id': '45d07068-ffa8-4464-a377-72c37c49a9ff',
  'x-amz-meta-markany-orig-file-key': 'wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)`,
    javascript: `fetch("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T075952Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-orig-file-key&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=5a3c00bee4b6fd9a222d7b2d228786dcec7dcf2a894421bbef361f6a0e2917fe", {
  method: "PUT",
  headers: {
    "x-amz-meta-markany-file-type": "IMG",
    "x-amz-meta-markany-file-id": "45d07068-ffa8-4464-a377-72c37c49a9ff",
    "x-amz-meta-markany-orig-file-key": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: new URLSearchParams({
    "@/Users/user/Downloads/image002_sf6789.jpg": ""
  })
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  pdGet: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/da54b638-afaf-47bd-a660-4cac27bfe734")
  .method("GET", null)
  .addHeader("Authorization", "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/da54b638-afaf-47bd-a660-4cac27bfe734' \\
--header 'Authorization: Bearer 43f87542-1ce4-4ef8-8413-138e8d766278'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/da54b638-afaf-47bd-a660-4cac27bfe734"
headers = {
  'Authorization': 'Bearer 43f87542-1ce4-4ef8-8413-138e8d766278'
}

response = requests.get(url, headers=headers)
print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/da54b638-afaf-47bd-a660-4cac27bfe734", {
  method: "GET",
  headers: {
    "Authorization": "Bearer 43f87542-1ce4-4ef8-8413-138e8d766278"
  }
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  pdGetResponse: {
    json: `{
  "code": "CSP0000",
  "msg": "OK",
  "data": {
    "id": "da54b638-afaf-47bd-a660-4cac27bfe734",
    "accountId": "5e22f922-4e30-405d-a121-075e440e1868",
    "idempotencyKey": "703",
    "status": "AWAITING_PROCESS",
    "title": "create piracy detection order",
    "orderFiles": [
      {
        "id": "45d07068-ffa8-4464-a377-72c37c49a9ff",
        "fileName": "image002_sf6789.jpg",
        "origDownloadUrl": "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/5e22f922-4e30-405d-a121-075e440e1868/da54b638-afaf-47bd-a660-4cac27bfe734/image002_sf6789.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T081559Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240905%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=71f049a0d9373591156be86f4e0f57e63365efd4cdbf113cf514873367084acc",
        "fileType": "IMG",
        "status": "AWAITING_PROCESS",
        "origFileKey": "wtr/5e22f922-4e30-405d-a121-075e440e1868/26249042-c1eb-4b54-9358-b924f407e6c2/image002.jpg"
      }
    ],
    "createdAt": "2024-09-05T07:59:51.848668Z",
    "updatedAt": "2024-09-05T07:59:52.009343Z",
    "createdBy": "5e22f922-4e30-405d-a121-075e440e1868",
    "updatedBy": "5e22f922-4e30-405d-a121-075e440e1868"
  }
}`,
  },
  webhookCreate: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "url": "https://webhook.site/db381c6c-f8d8-4ec2-a2b3-65fde937cce5"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/webhook-endpoints")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZTU0Mzg4Ni03ZmM5LTQ3NjQtYjEyOS1hMGIwZmU1OTk5N2IiLCJzdWIiOiI1ZTIyZjkyMi00ZTMwLTQwNWQtYTEyMS0wNzVlNDQwZTE4NjgiLCJyb2xlcyI6WyJVU0VSIl0sImFjY291bnROYW1lIjoiRk8gVGVzdCBBY2NvdW50IiwiY29tcGFueU5hbWUiOiJNYXJrQW55Iiwiem9uZUlkIjoiVVRDKzA5OjAwIiwidHlwZSI6IkFDQ0VTUyIsImVtYWlsIjoiZm9zdGFnLnRlc3QwMDFAbWFya2FueS5jb20iLCJzdWJzY3JpcHRpb25UaWVyIjoiRlJFRSIsImJpbGxpbmdFeHBpcmVkQXQiOjE3Mjc0OTYxMDU0MjMsImV4cCI6MTcyNTUyNjkyMn0.w69plUI03-C2VCLEFAQSSpYv5e3cdmGpypsqLbhDL0w5a7Ma1i_NBDbIj09pQHBcjbdFDR2gCxzAqJ26hUAghQ")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/webhook-endpoints' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZTU0Mzg4Ni03ZmM5LTQ3NjQtYjEyOS1hMGIwZmU1OTk5N2IiLCJzdWIiOiI1ZTIyZjkyMi00ZTMwLTQwNWQtYTEyMS0wNzVlNDQwZTE4NjgiLCJyb2xlcyI6WyJVU0VSIl0sImFjY291bnROYW1lIjoiRk8gVGVzdCBBY2NvdW50IiwiY29tcGFueU5hbWUiOiJNYXJrQW55Iiwiem9uZUlkIjoiVVRDKzA5OjAwIiwidHlwZSI6IkFDQ0VTUyIsImVtYWlsIjoiZm9zdGFnLnRlc3QwMDFAbWFya2FueS5jb20iLCJzdWJzY3JpcHRpb25UaWVyIjoiRlJFRSIsImJpbGxpbmdFeHBpcmVkQXQiOjE3Mjc0OTYxMDU0MjMsImV4cCI6MTcyNTUyNjkyMn0.w69plUI03-C2VCLEFAQSSpYv5e3cdmGpypsqLbhDL0w5a7Ma1i_NBDbIj09pQHBcjbdFDR2gCxzAqJ26hUAghQ' \\
--header 'Content-Type: application/json' \\
--data '{
  "url": "https://webhook.site/db381c6c-f8d8-4ec2-a2b3-65fde937cce5"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/webhook-endpoints"

payload = {
  "url": "https://webhook.site/db381c6c-f8d8-4ec2-a2b3-65fde937cce5"
}

headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZTU0Mzg4Ni03ZmM5LTQ3NjQtYjEyOS1hMGIwZmU1OTk5N2IiLCJzdWIiOiI1ZTIyZjkyMi00ZTMwLTQwNWQtYTEyMS0wNzVlNDQwZTE4NjgiLCJyb2xlcyI6WyJVU0VSIl0sImFjY291bnROYW1lIjoiRk8gVGVzdCBBY2NvdW50IiwiY29tcGFueU5hbWUiOiJNYXJrQW55Iiwiem9uZUlkIjoiVVRDKzA5OjAwIiwidHlwZSI6IkFDQ0VTUyIsImVtYWlsIjoiZm9zdGFnLnRlc3QwMDFAbWFya2FueS5jb20iLCJzdWJzY3JpcHRpb25UaWVyIjoiRlJFRSIsImJpbGxpbmdFeHBpcmVkQXQiOjE3Mjc0OTYxMDU0MjMsImV4cCI6MTcyNTUyNjkyMn0.w69plUI03-C2VCLEFAQSSpYv5e3cdmGpypsqLbhDL0w5a7Ma1i_NBDbIj09pQHBcjbdFDR2gCxzAqJ26hUAghQ',
  'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/webhook-endpoints", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZTU0Mzg4Ni03ZmM5LTQ3NjQtYjEyOS1hMGIwZmU1OTk5N2IiLCJzdWIiOiI1ZTIyZjkyMi00ZTMwLTQwNWQtYTEyMS0wNzVlNDQwZTE4NjgiLCJyb2xlcyI6WyJVU0VSIl0sImFjY291bnROYW1lIjoiRk8gVGVzdCBBY2NvdW50IiwiY29tcGFueU5hbWUiOiJNYXJrQW55Iiwiem9uZUlkIjoiVVRDKzA5OjAwIiwidHlwZSI6IkFDQ0VTUyIsImVtYWlsIjoiZm9zdGFnLnRlc3QwMDFAbWFya2FueS5jb20iLCJzdWJzY3JpcHRpb25UaWVyIjoiRlJFRSIsImJpbGxpbmdFeHBpcmVkQXQiOjE3Mjc0OTYxMDU0MjMsImV4cCI6MTcyNTUyNjkyMn0.w69plUI03-C2VCLEFAQSSpYv5e3cdmGpypsqLbhDL0w5a7Ma1i_NBDbIj09pQHBcjbdFDR2gCxzAqJ26hUAghQ",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "url": "https://webhook.site/db381c6c-f8d8-4ec2-a2b3-65fde937cce5"
  }),
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  webhookCreateResponse: {
    json: `{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "webhookSecret": "5f53ISNV9MKugegrvi3HRNplsAScjI82APXKkl58bs8="
  }
}`,
  },
  pdDownload: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14")
  .get()
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14'`,
    python: `import requests

url = "https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14"

response = requests.get(url)

print(response.text)
`,
    javascript: `fetch("https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14", {
  method: "GET",
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  wmDownloadOrigin: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813")
  .get()
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813'`,
    python: `import requests

url = "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813"

response = requests.get(url)

print(response.text)
`,
    javascript: `fetch("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813", {
  method: "GET",
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  wmDownloadWtr: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f")
  .get()
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f'`,
    python: `import requests

url = "https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f"

response = requests.get(url)

print(response.text)
`,
    javascript: `fetch("https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f", {
  method: "GET",
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  sharFileRequest: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "email": "khoa@markany.com"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "email": "khoa@markany.com"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share"

payload = {
  "email": "khoa@markany.com"
}

headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
  'Content-Type': 'application/json',
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/e102a05f-2fe1-4c26-b186-ebf1a74f1a45/share", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "email": "khoa@markany.com"
  }),
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  noResponse: {
    json: `{
  "code": "CSW0000",
  "msg": "OK"
}`,
  },
  login: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "email":  "khoa@markany.com",
      "password": "MarkAny123456789"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "email": "khoa@markany.com",
  "password": "MarkAny123456789"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login"
payload = {
  "email": "khoa@markany.com",
  "password": "MarkAny123456789"
}
headers = {
  'Content-Type': 'application/json'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/login", {
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
  .catch(error => console.log('error', error));`,
  },
  loginResponse: {
    json: `{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9"
  }
}`,
  },
  changePassword: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "oldPassword": "35sSNgV0yq",
      "newPassword": "aA123456789"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--data-raw '{
  "oldPassword": "35sSNgV0yq",
  "newPassword": "aA123456789"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password"
payload = {
  "oldPassword": "35sSNgV0yq",
  "newPassword": "aA123456789"
}
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/change-password", {
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
  .catch(error => console.log('error', error));`,
  },
  triggerPasswordReset: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "email":  "khoa@markany.com"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "email": "khoa@markany.com"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset"
payload = {"email": "khoa@markany.com"}
headers = {'Content-Type': 'application/json'}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset", {
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
  .catch(error => console.log('error', error));`,
  },
  resetPassword: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "newPassword":"FooBar123456789"
    }
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--data-raw '{
  "newPassword": "FooBar123456789"
}'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password"
payload = {"newPassword": "FooBar123456789"}
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/accounts/reset-password", {
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
  .catch(error => console.log('error', error));`,
  },
  createApiKey: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "name": "key for testing",
      "note": "some note",
      "expiredAt": "2024-07-20T00:00:00Z" 
    } 
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")
  .method("POST", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--header 'Content-Type: application/json' \\
--data '{
  "name": "key for testing",
  "note": "some note",
  "expiredAt": "2024-07-20T00:00:00Z"
}'`,
    python: `import requests

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
print(response.text)`,
    javascript: `fetch('https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys', {
  method: 'POST',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      name: "key for testing",
      note: "some note",
      expiredAt: "2024-07-20T00:00:00Z",
  }),
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
`,
  },
  createApiKeyResponse: {
    json: `{
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
}`,
  },
  getApiKeys: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys")
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9'`,
    python: `import requests

url = 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys'
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9'
}

response = requests.get(url, headers=headers)
print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys", {
  method: "GET",
  headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  getApiKeysResponse: {
    json: `{
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
}`,
  },
  updateApiKey: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType,
  """
    {
      "name": "key updated for testing",
      "status": "INACTIVE",
      "note": "some updated note",
      "expiredAt": "2024-07-29T00:00:00"
    } 
  """);
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14")
  .method("PATCH", body)
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location --request PATCH 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--header 'Content-Type: application/json' \\
--data '{
  "name": "key updated for testing",
  "status": "INACTIVE",
  "note": "some updated note",
  "expiredAt": "2024-07-29T00:00:00"
}'`,
    python: `import requests

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
print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/6c8ac83e-efec-4dee-bc71-90e9bd572d14", {
  method: "PATCH",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "name": "key updated for testing",
    "status": "INACTIVE",
    "note": "some updated note",
    "expiredAt": "2024-07-29T00:00:00"
  }),
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  deleteApiKey: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b")
  .delete()
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    bash: `curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9'`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
}

response = requests.delete(url, headers=headers)
print(response.text)`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-auth/ext/v1/api-keys/95b5de62-af00-4a1f-90a9-769400a01b0b", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
`,
  },
  deleteWatermarkFiles: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files")
  .delete()
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files"
headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
}

response = requests.delete(url, headers=headers)

print(response.text)`,
    bash: `curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--header 'Content-Type: application/json'`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-wtr/ext/v1/orders/2b957793-0bc6-42ea-a619-9b77da85ceda/order-files", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9",
  },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
  deletePiracyFiles: {
    java: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
Request request = new Request.Builder()
  .url("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files")
  .delete()
  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9")
  .build();
Response response = client.newCall(request).execute();`,
    python: `import requests

url = "https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files"
headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9',
}

response = requests.delete(url, headers=headers)

print(response.text)`,
    bash: `curl --location --request DELETE 'https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9' \\
--header 'Content-Type: application/json'`,
    javascript: `fetch("https://stag-cs.saforus.com/api/saforus-cs-api-pd/ext/v1/orders/be49e685-053b-463c-a86a-34d58472ae80/order-files", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9"
  },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`,
  },
};

export default codeExamples;
