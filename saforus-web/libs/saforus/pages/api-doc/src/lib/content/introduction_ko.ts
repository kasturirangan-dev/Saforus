import authImg from './images/auth.png';
import authFlow from './images/authFlow.png';
import passwordResetFlow from './images/passwordResetFlow.svg';
import watermarkingCreateFlow from './images/watermarkingCreateFlow.svg';
import watermarkingdownloadFlow from './images/watermarkingDownloadFlow.svg';
import piracyDetectionOrderFlow from './images/piracyDetectionOrderFlow.svg';
import passwordDetectionGetFlow from './images/passwordDetectionFlow.svg';
import deleteWatermarkFlow from './images/deleteWatermarkFlow.png';
import deletePDFlow from './images/deletePDFlow.png';
import shareWatermarkFlow from './images/shareWatermarkFlow.png';


const koreanIntroduction = `
# 버전 기록 v0.2

# 개요

## 목적
본 문서는 고객사가 Saforus Content Security와 통합하여 마크애니의 워터마킹, 불법 복제 탐지 등의 기능을 사용할 수 있는 방법을 정의 및 설명하여 원활하고 효율적인 작업을 지원합니다. 

## 범위
본 문서는 당사의 Saforus CS API에 한하여 적용됩니다. 본 문서 외 다른 곳에서 확인 가능한 고객사 비즈니스 검증 프로세스 및 테스트 팩 등의 솔루션이나 프로세스에 대한 전체 세부정보는 제공되지 않습니다. 

## 문서 제공 대상
본 문서는 Saforus CS API 시스템에 대한 인터페이스 구축을 위해 통합 코드를 개발할 매니저 및 기술 인력들을 대상으로 합니다.


# 통합 가이드

## 서론

### 통합 지점

고객사의 시스템을 당사 환경과 쉽게 통합할 수 있도록 아래와 같은 다양한 통합 지점을 제공합니다:

- **APIs**: 당사 시스템 간의 안전하고 효율적인 데이터 교환을 가능하게 하는 포괄적인 RESTful API
- **Webhooks**: 고객사의 시스템을 당사와 동기화하기 위한 실시간 알림

### 시작하기

통합을 시작하기 전에 필요한 자격 증명과 액세스 권한이 있는지 확인해야 합니다. API 엔드포인트, 인증 방법 및 데이터 형식에 대한 자세한 설명은 본 문서의 후속 섹션에서 제공됩니다. 당사의 지원팀은 통합 과정에서 발생할 수 있는 질문이나 이슈에 대해 도움을 드릴 수 있습니다.

본 문서의 가이드를 따르면 고객사의 시스템을 당사의 프로덕션 환경과 효율적이고 안전하게 통합하여 양사 모두에게 이익이 되는 원활한 운영을 보장할 수 있습니다.

### 환경

본 서비스의 API는 아래와 같이 두 가지 주요 환경에서 사용할 수 있습니다:

환경명 | 설명
--- | ---
\`Staging\` | 고객사의 통합을 위한 합격 테스트 환경입니다.
\`Production\` | 대량의 요청을 처리하도록 구성된 프로덕션 환경으로 다운타임을 최소화하고 최적의 성능을 보장합니다.


> **참고사항:** 스테이징 환경에서는 기능을 제한하지 않으며, 프로덕션 환경과 동일합니다.
마크애니는 ap-northeast-2 AWS 리전(서울)의 AWS 클라우드에서 두 환경 모두를 호스팅합니다. 이를 위한 인프라를 구성해 주십시오.

### 인증&nbsp;

마크애니는 응용프로그램이 API에 접근할 수 있도록 토큰 기반 인증을 사용합니다. 응용프로그램은 고객사가 성공적으로 액세스를 인증 및 승인한 후 액세스 토큰을 수신한 다음, 목표 API를 호출할 때 액세스 토큰을 크레덴셜로 전달합니다. 액세스 토큰을 얻기 위한 고객사 온보딩 프로세스는 다음과 같습니다:
![Environment Diagram](${authImg} "Environment Setup")

계정 API와 인증에 대한 자세한 내용은 섹션 3.2.1. 인증에 기재되어 있습니다.

### 필수 영역

달리 명시되지 않는 한, 요청 페이로드의 모든 필드가 필요합니다. 단, 일부 필드는 특정 상황에서만 필요하고, 이러한 필드는 본 문서 전반에 명시되어 있습니다.

### API 요청 재시도

네트워크 구성 요소 장애, API 속도 제한, 타임아웃 또는 서비스 자체이슈 등 여러 가지 원인으로 API 요청이 실패할 수 있습니다. 최선의 효율을 위해, 아래와 같은 요청 재시도 메커니즘을 구현하는 것을 권장합니다:
- 재시도 시 지수 백오프 및/또는 지터가 있어야 합니다.
- 적절한 곳에 Idempotent Key를 추가해야 합니다.

###  속도 제한

속도 제한은 고객사의 자격 증명을 기반으로 하며 **20개의 요청 / 초**로 설정됩니다. 한도는 각 환경(스테이징 및 프로덕션)에 개별적으로 적용됩니다. 한도를 초과하게 되는 경우, 관련 메시지와 오류 코드가 포함된 응답을 받게 됩니다. 이 한도를 늘려야 할 경우 마크애니로 문의 부탁드립니다.

### 타임아웃

본 서비스의 모든 API에는 요청이 실패하게 될 경우 가능한 한 빨리 재요청을 시도할 수 있도록 **30초**의 타임아웃이 적용되어 있습니다. 클라이언트에서도 동일한 요청 타임아웃을 설정하는 것이 권고됩니다. 주문 식별자별 주문 상태를 얻으려면 아래 2개 섹션을 참고하십시오.

- 워터마크 주문 보기
- 불법 복제 탐지 주문 보기

### Idempotency

본 서비스의 API 작업 중 일부는 요청 Idempotency를 지원하므로, 민감한 작업을 여러 번 호출하는 경우에도 작업이 한 번 이하로 수행될 것으로 예상할 수 있습니다. 이를 위해 UUID 버전 4 Idempotent Key의 사용을 권장합니다.

명확한 이유 없이 API 호출이 실패하고 재시도가 예정되어 있는 경우에는 Idempotency의 보장이 중요합니다. 예를 들어, 네트워크 오류로 인해 주문 작성에 성공하지 못할 경우, 동일한 Idempotent Key를 전달하여 호출 횟수에 관계없이 결제가 한 번 이상 발생하지 않는다고 가정하고 안전하게 주문 작성을 재시도할 수 있습니다.

Idempotent Key는 성공적으로 사용된 시점부터 **xxx년** 동안 유효합니다. 이 기간이 지나면 재활용되고 기존 키는 새 것으로 간주됩니다.

> **참고사항** Idempotent Key는 서로 다른 API 리소스 간에 공유되지 않으므로, 다른 유형의 작업에 동일한 Idempotent Key를 사용할 수 있으나, 이는 권장되지 않습니다.

### 응답 바디

전체 구조 |
--- |
\`{   "code": "some code", // Successful or failed code. See below.   "msg": "some message", // The human readable description of the code   "data": { // Optional field    // Entity fields in successful cases OR error field descriptions in validation failed cases  }}\` |



### 코드 설명
위치 | 설명 | 예시
--- | --- | ---
첫 3글자 | API 식별 | WMS: 워터마크 API<br>CSP: 불법 복제 탐지 API
네 번째 글자 | 성공 또는 실패 | 0: 성공<br>Other: 실패
마지막 세 글자 | 사례를 구분하기 위함 | 아래 참조

위치 | 설명 | 예시
--- | --- | ---
**실패 사례**||
\`CSW1000\` | 오류 코드 \`000\` 으로 워터마크 API에 대한 요청이 실패했습니다.| <code> \`<br>{  "code": "CSW1001",  "msg": "ERROR_UNKNOWN"}\` </code>
\`CSW1100\` | 오류 코드 \`100\` 으로 불법 복제 탐지 API에 대한 요청이 실패했습니다. | <code> \`{  "code": "CSP1100",  "msg": "ENTITY_NOT_FOUND"}\` </code>
\`CSW1001\` | 오류 코드 \`001\` (입력 필드가 잘못되었습니다)로 인증 API에 대한 요청이 실패했습니다. 응답에는 오류 필드 목록과 해당 오류의 이유가 포함됩니다. | <code> \`{  "code": "CSA1001",  "msg": "Input invalid, "data": { "errorDetails": [ { "msg": "must not be blank", "propertyName": "accountName" } ]"}\` </code>
**성공 사례**||
\`CSA0000\` | 인증 API에 대한 요청이 성공하고 API가 엔티티 필드를 반환합니다. | <code> \`{  "code": "CSA0000",  "msg": "OK",  "data": {    "token": "eyJhbGciOiJIUzUxMiJ9"  }}\` </code>
\`CSA000A\` | 인증 API에 대한 요청이 성공하여 클라이언트는 A 경로로 계속되어야 합니다 | <code> \`{  "code": "CSA000A",  "msg": "Take path A",  "data": {    "accountId": "51d48610-7ae2-4ed9-8c6b-7c5ab6735be2",    "email": "foo@test.com"  }}\` </code>
\`CSA000B\` | 인증 API에 대한 요청이 성공하여 클라이언트는 B 경로로 계속되어야 합니다. | <code> \`{  "code": "CSA000B",  "msg": "Take path B",  "data": {    "stepToken": "S86rZL0khpgc5mKFZfLg",    "link": "https://bar.com "  }}\` </code>


### 결측 값 처리

- 결측 값은  \`null\`, 빈 어레이 \`[]\`  혹은 빈 오브젝트 \`{}\` 로 나타냅니다.
- 이러한 결측 값들의 경우 응답에서 완전히 제거됩니다.

구분 | 일반 사례 | 예상 사례
--- | --- | ---
\`null\` 값 | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "accountName": null } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`
빈 어레이 \`[]\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "orders": [] } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`
빈 오브젝트 \`{}\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "moreInfo": {} } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`

### 빠르게 시작하는 법

통합 프로세스를 가속화할 수 있는 방법은 여러 가지가 있으며, 이에 도움이 되는 몇 가지 팁이 있습니다:

- **빠르게 반응하기**: 우려사항(존재하는 경우)을 빠르게 제기하고 질문에 답해주실 수록 더 빨리 진행될 수 있습니다.

- **마크애니 기준 따르기**: 당사는 쉬운 통합을 목적으로 표준을 정의하려고 노력합니다. 또한 당사는 합리적인 경우에는 정해진 표준에서 벗어나는 것에 열려 있으나, 실행과정에서 추가 시간이 걸릴 수 있습니다.

- **출시를 위한 제품을 명확하게 정의하기**: 고객사들이 아직 자신의 제품이 무엇이어야 하는지 고민하고 있다면 많은 시간을 낭비할 수 있습니다. 가능하다면 출시할 수 있는 확실한 최소 실행 가능 제품을 정의한 다음, 제품이 출시되면 향후 단계에서 저희와 함께 추가 기능을 구현하시는 것을 권장합니다.

- **기술 통합을 조기에 시작하기**: 본 문서를 제공받는 즉시 API 통합을 시작할 수 있습니다. 저희 엔지니어링 지원 팀은 질문에 답하는 데 도움을 드릴 수 있습니다 (Slack과 같은 인기 있는 채팅 채널을 설정하는 것을 권장합니다). 이렇게 진행될 경우 스테이징 및 프로덕션 환경에 액세스할 수 있을 때 작업 속도가 빨라질 것을 기대할 수 있습니다.

## 하이 레벨 흐름

> **참고 사항** :

- 빨간색으로 표시된 문장: 마크애니가 고객사에게 제공하는 API (섹션 3.3. 마크애니 API 참조).
- 파란색으로 표시된 문장: 고객사가 구현해야 하는 API (섹션 3.4. 웹훅 참조).


### 인증

계정 플로우

본 플로우의 경우 3.1.4. 인증 섹션에 설명된 대로 자격 증명이 미리 제공됩니다.  고객사는 다음과 같이 성공적으로 로그인한 후 비밀번호 변경(선택사항)을 진행할 수 있습니다:
![Authentication Flow Diagram](${authFlow} "Authentication Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - login(credentials) |고객사가 API를 호출하여 로그인하고 액세스 토큰을 만듭니다. <br> API Contract 관련 내용 로그인 섹션을 참고하시기 바랍니다. | 생성된 액세스 토큰의 기본 만료 시간은 2시간입니다.
5 - changePassword(accessToken, oldPassword, new Password) | 고객사가 비밀번호 변경을 위해 API를 호출합니다. <br> API Contract 관련 내용 비밀번호 변경 섹션을 참고하시기 바랍니다. | 
10 - createWebhookEndpoint(accessToken, url) | 고객사가 웹훅 엔드포인트 생성을 위해 API를 호출합니다. <br> API Contract 관련 내용 웹훅 엔드포인트 섹션을 참고 하시기 바랍니다.
15 - createApiKey(accessToken, apiKeyInfo) <br> 20 - getAllApiKeys(accessToken) <br> 24 - updateApiKey(accessToken, apiKey) <br> 28 - deleteApiKey(accessToken, apiKey) | 파트너는 API 키를 관리하기 위해 CRUD API를 호출합니다. <br> API 계약에 대한 자세한 내용은 API 키 관리 섹션을 참조하십시오. | 파트너는 API 호출 또는 대시보드 콘솔을 통해 API 키를 관리할 수 있습니다. <br> API 키는 반드시 워터마킹 및 불법 복제 감지 API를 호출하는 데 사용되어야 합니다.

비밀번호 초기화 플로우

고객사가 비밀번호를 잊은 경우, 아래와 같이 비밀번호 초기화를 진행할 수 있습니다:

![Password Reset Flow Diagram](${passwordResetFlow} "Password Reset Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - triggerPasswordReset(email) | 고객사가 비밀번호 초기화를 위해 API를 호출합니다. API Contract 관련 내용은 섹션 3.3.1.3 비밀번호 변경을 참고하시기 바랍니다. | 생성된 암호 재설정 토큰의 기본 만료 시간은 **10분**입니다.
8 - resetPassword(passwordResetToken, new Password) | 고객사가 비밀번호 변경을 위해 API를 호출합니다. API Contract 관련 내용은 비밀번호 초기화 섹션울 참고하시기 바랍니다. 

### 워터마크

워터마크 주문 생성

본 플로우는 고객사가 파일에 워터마크를 적용하는 주문 생성 방법을 설명합니다:

![Watermarking create Flow Diagram](${watermarkingCreateFlow} "Watermarking create Flow")
프로세스 | 설명 | 비고
--- | --- | ---
1 - create(order) | 고객사가 워터마크 주문 생성을 위해 API를 호출합니다. API Contract 관련 내용은 섹션 3.3.2.1 워터마크 주문 생성을 참고 하시기 바랍니다.| 고객사가 마크애니가 관리하고 있는 S3 저장소에 파일을 업로드하기 위해 아마존 S3 API를 호출합니다. 예시:
8 - upload(file, orderFile.uploadUrl) | Calls Amazon S3 api to upload the files to the S3 storage managed by MarkAny. _Example_: \`curl --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/864314f9-c2a1-4e10-a4ea-a4d194c0350a/d420f98a-966c-46c5-9e89-516d233866a7/test.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240514T043125Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240514%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=7444e74e1b89d492e04d79d90c6ff81a2e6a68a41cbd37572089cbf9b4af3555' \\ --header 'x-amz-meta-markany-file-type: DOCUMENT' \\ --header 'x-amz-meta-markany-wtr-msg: 123' \\ --header 'x-amz-meta-markany-file-id: 49930994-c57d-4c8f-93e9-8f87bdb46592' \\ --data '@/Users/user/Documents/markany/sample-files/test.pdf'\` | \`x-amz-meta-markany-file-type\`: 1단계 요청 바디의 files 필드 아래에 있는 \`fileType\` 필드와 동일한 값을 가져야 합니다. \`x-amz-meta-markany-wtr-msg\`: 1단계 요청 바디의 files 필드 아래에 있는 \`wtrMsg\` 필드와 동일한 값을 가져야 합니다. \`x-amz-meta-markany-file-id\`: 7단계의 응답 바디에 있는 \`orderFiles\` 필드 아래의 id 필드와 동일한 값을 가져야 합니다. 링크의 기본 만료 시간은 **30분**입니다.신뢰성 및 성능 확보를 위해 AWS S3 SDK를 사용하는 것을 권고합니다.
18 - notify(orderProcessedEvent) | 마크애니가 주문 처리 결과를 알려주기 위해 고객사의 웹훅을 호출합니다. 상세 가이드는  웹훅 섹션을 참고하시기 바랍니다.


### 워터마크 주문 가져오기

웹훅을 통해 마크애니로부터 주문 처리 결과를 받으면, 고객사는 아래의 플로우를 통해 관련 파일을 다운로드할 수 있습니다.

![Watermarking download Flow Diagram](${watermarkingdownloadFlow} "Watermarking download Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - getOrder(orderQuery) | 고객사가 API를 호출하여 워터마크 주문에 대한 정보를 수령합니다. API Contract 관련 내용은 워터마크 섹션  주문 가져오기 섹션을 참고하시기 바랍니다. |
5 - download(orderFile.origDownloadUrl) | 고객사는 Amazon S3 API를 호출하여 마크애니가 관리하는 S3 저장소에서 업로드된 원본 파일을 다운로드합니다. <br>_Example_:<br> \`curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813' \` | 링크는 지정된 파일이 성공적으로 업로드된 경우에만 작동합니다. 링크의 기본 만료 시간은 **30분**입니다. 신뢰성 및 성능 확보를 위해 AWS S3 SDK를 사용하는 것을 권고합니다.
7 - download(orderFile.wtrDownloadUrl) |고객사가 Amazon S3 API를 호출하여 마크애니가 관리하는 S3 저장소에서 워터마킹된 파일을 다운로드합니다.<br> _Example_:<br> \` curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f' \` | 링크는 \`orderFiles[*].status\` 필드가 SUCCEEDED 상태일때만 동작합니다. 링크의 기본 만료 시간은 **30분**입니다. 신뢰성 및 성능 확보를 위해 AWS S3 SDK를 사용하는 것을 권고합니다.



### 불법 복제 탐지

불법 복제 탐지 주문 생성

아래 플로우는 고객사가 지정된 파일의 워터마크 코드를 탐지하기 위해 불법 복제 탐지 주문을 만드는 방법을 설명합니다.

![Piracy Detection Flow Diagram](${piracyDetectionOrderFlow} "Piracy Detection Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - create(order) | 고객사가 API를 호출하여 불법 복제 탐지 주문을 생성합니다. API Contract에 관한 사항은 불법 복제 탐지 주문 섹션을 참고하시기 바랍니다. | 한 번의 주문에 허용되는 파일 수는 **10** 개로 제한됩니다.
8 - upload(file, orderFile.uploadUrl) | 고객사가 Amazon S3 API를 호출하여 마크애니가 관리하는 S3 스토리지에 파일을 업로드합니다.<br> _예시_: <br> \` curl \` --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/28f45670-b0d1-47b0-a136-4a703a87b623/test_sf6789.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T040144Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-resolution&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=87febd6822d8d48d9cf17cea6e040c5c935e1e17251f403df87e2b47000a790e' \\ --header 'x-amz-meta-markany-file-type: DOCUMENT' \\ --header 'x-amz-meta-markany-file-id: eff68fb2-797d-4031-b770-c01e10fd7262' \\ --header 'x-amz-meta-markany-resolution: 1920x1080' \\ --data '@/Users/user/Downloads/test_sf6789.pdf' | \`x-amz-meta-markany-file-type\`: 1단계 요청 바디의 \`files\` 필드 아래에 있는 \`fileType\` 필드와 동일한 값을 가져야 합니다. \`x-amz-meta-markany-file-id\`: 7단계 응답 바디의 \`orderFiles\` 필드 아래에 있는 \`id\` 필드와 동일한 값을 가져야 합니다. \`x-amz-meta-markany-resolution\`: 7단계 응답 바디의 orderFiles필드 아래에 있는 \`resolution\` 필드와 동일한 값을 가져야 합니다. (\`DOCUMENT\` 파일 타입에만 해당됩니다) 링크의 기본 만료 시간은 **30분**입니다. 신뢰성 및 성능 확보를 위해 AWS S3 SDK를 사용하는 것을 권고합니다.
18 - notify(orderProcessedEvent) | 마크애니가 주문 처리 결과를 알려주기 위해 고객사의 웹훅을 호출합니다. 상세 가이드는 웹훅 섹션을 참고하시기 바랍니다. |

### 불법 복제 탐지 주문 가져오기

웹훅을 통해 마크애니로부터 주문 처리 결과를 받은 고객사는, 지정된 파일의 워터마크 코드(있는 경우)를 확인할 수 있습니다.

![Piracy Detection Flow Diagram](${passwordDetectionGetFlow} "Piracy Detection Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - getOrder(orderQuery) | 고객사는 API를 호출하여 불법 복제 탐지 주문에 대한 정보를 얻습니다. API Contract 관련 사항은 불법 복제 탐지 주문 가져오기 섹션을 참조하십시오. |
5 - download(orderFile.origDownloadUrl) | 고객사는 Amazon S3 API를 호출하여 마크애니가 관리하는 S3 저장소에서 업로드된 원본 파일을 다운로드합니다. _예시_: \` curl \` --location 'https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14' | 링크는 지정된 파일이 성공적으로 업로드된 경우에만 작동합니다. 링크의 기본 만료 시간은 ****30분**입니다**. 신뢰성 및 성능 확보를 위해 AWS S3 SDK를 사용하는 것을 권고합니다.

### 파일 삭제 흐름

이 흐름은 파트너가 마크애니에 선택한 주문에 속한 모든 파일을 삭제하도록 요청하는 방법을 설명합니다.

원본 파일 / 워터마크 파일 삭제

![Delete Watermark Flow Diagram](${deleteWatermarkFlow} "Piracy Delete Watermark Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - deleteFiles(orderId) | 주문에 속한 모든 원본 및 워터마크 파일을 삭제하는 API를 호출합니다. <br> API 계약에 대한 자세한 내용은 원본 / 워터마크 파일 삭제 섹션을 참조하십시오.|

불법 복제 감지 파일 삭제

![Delete Piracy Flow Diagram](${deletePDFlow} "Piracy Delete PD Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - deleteFiles(orderId) | 주문에 속한 모든 불법 복제 감지 파일을 삭제하는 API를 호출합니다. <br> 주문에 속한 모든 불법 복제 감지 파일을 삭제하는 API를 호출합니다.|

### 워터마크 파일 공유

![Share Watermarking Flow Diagram](${shareWatermarkFlow} "Share Watermarking Flow")

프로세스 | 설명 | 비고
--- | --- | ---
1 - shareFiles(orderId) | 주문에 속한 모든 워터마크 파일을 공유하는 API를 호출합니다. <br> API 계약에 대한 자세한 내용은 워터마크 파일 공유 섹션을 참조하십시오.|
12 - download(sharingWatermarkFileEmail.watermarkFiles) | Amazon S3 API를 호출하여 마크애니가 관리하는 S3 저장소에서 워터마크가 적용된 파일을 다운로드합니다. <br> 예시: <br> \` curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f' \` | 링크는 주문 파일이 아직 삭제되지 않은 경우에만 작동합니다. <br> 링크는 기본적으로 **7일**의 만료 시간이 설정됩니다. <br> 신뢰성과 성능을 위해 AWS S3 SDK를 사용하는 것이 권장됩니다.


`;
export default koreanIntroduction;