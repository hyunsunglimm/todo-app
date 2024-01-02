# 📌 기업의 할 일(Todo) 관리 페이지 만들기

주어진 API를 활용해 '[완성 예시](https://todo-vite-vue3-composition-ts.vercel.app/)' 처럼 자유롭게 기업의 할 일 관리(Todo) 기능을 구현해보세요!    
과제 수행 및 리뷰 기간은 별도 공지를 참고하세요!

## 과제 수행 및 제출 방법

```
// KDT기수번호_이름
KDT99_ParkYoungWoong
```

1. 현재 저장소를 로컬에 클론(Clone)합니다.
1. 자신의 본명으로 브랜치를 생성합니다.(구분 가능하도록 본명을 꼭 파스칼케이스로 표시하세요, `git branch KDTX_ParkYoungWoong`)
1. 자신의 본명 브랜치에서 과제를 수행합니다.
1. 과제 수행이 완료되면, 자신의 본명 브랜치를 원격 저장소에 푸시(Push)합니다.(`main` 브랜치에 푸시하지 않도록 꼭 주의하세요, `git push origin KDTX_ParkYoungWoong`)
1. 저장소에서 `main` 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, `main` <== `KDTX_ParkYoungWoong`)

- `main` 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
- Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
- Pull Request에서 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!
- 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사에서 얘기하세요!

## 요구사항

필수 요구사항은 꼭 달성해야 하는 목표로, 수정/삭제는 불가하고 추가는 가능합니다.    
선택 요구사항은 단순 예시로, 자유롭게 추가/수정/삭제해서 구현해보세요.  
각 요구사항은 달성 후 마크다운에서 `- [x]`로 표시하세요.

### ❗ 필수

- [ ] 원하는 특정 기업을 하나 선정하거나 새로운 가상의 기업을 만드세요!
- [ ] 해당 기업의 할 일 목록(List)이 출력되는 페이지가 있어야 합니다! (예시)`example.com/`)
- [ ] 해당 기업 혹은 담당 개발자에 대한 간단한 소개 페이지가 포함돼야 합니다! (예시) `example.com/about`)
- [ ] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다!
- [ ] 실제 서비스로 배포하고 외부에서 접근 가능한 링크를 추가해야 합니다! (Vercel, Netlify, AWS, GCP 등)
- [ ] 각 페이지를 데스크탑과 모바일 등 다양한 디바이스 크기에 대응하는 반응형 레이아웃으로 만들어야 합니다!

### ❔ 선택

- [ ] 할 일 항목을 수정할 수 있도록 만들어보세요.
- [ ] 할 일 항목을 삭제할 수 있도록 만들어보세요.
- [ ] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요. (추천 라이브러리 - [SortableJS](http://sortablejs.github.io/Sortable/))
- [ ] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [ ] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [ ] 할 일 항목의 최신 수정일을 표시해보세요.
- [ ] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 할 일과 관련된 기타 기능도 고려해보세요.

## API 사용법

요청 주소(Endpoint)

```curl
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
```

모든 API 요청(Request)은, 다음 사용 예시와 같이 `headers` 정보가 꼭 포함돼야 합니다!
`username`은 `KDTX_ParkYoungWoong`와 같이 본명을 포함하고 파스칼 케이스로 작성해야 합니다!
확인할 수 없는 사용자의 DB 정보는 임의로 삭제될 수 있습니다!

API 사용 예시:

```js
async function createTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'KDT7_GrZ1eYBo', // KDT 7기 APIKEY 입니다!
      'username': 'KDT7_ParkYoungWoong'
    },
    body: JSON.stringify({
      title: '아침 먹기!'
    })
  })
  const json = await res.json()
  console.log(json)

  return json
}
```

### 목록 조회

전체 할 일 목록을 조회합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'GET'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Todo[] // 할 일 목록

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}
```

```json
[
  {
    "id": "mnIwaAPIAE1ayQmqekiR",
    "order": 0,
    "title": "JS 공부하기",
    "done": false,
    "createdAt": "2021-10-28T05:18:51.868Z",
    "updatedAt": "2021-10-28T05:18:51.868Z"
  },
  {
    "id": "tMzPImGoWtRdJ6yyVv2y",
    "order": 1,
    "title": "과제 PullRequest(PR) 생성",
    "done": true,
    "createdAt": "2021-10-28T04:16:53.980Z",
    "updatedAt": "2021-10-28T09:40:17.955Z"
  },
  {
    "id": "Rq8BebKihCgteHHhMIRS",
    "order": 2,
    "title": "API 스터디",
    "done": false,
    "createdAt": "2021-10-28T04:17:02.510Z",
    "updatedAt": "2021-10-28T04:17:02.510Z"
  }
]
```

### 항목 추가

할 일 항목을 새롭게 추가합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "KDT 과정 설계 미팅",
  "order": 2
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}
```

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "order": 0,
  "title": "KDT 과정 설계 미팅",
  "done": false,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 수정

특정 할 일 항목을 수정합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  done: boolean // 할 일 완료 여부 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2
}
```

응답 데이터 타입 및 예시:

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 삭제

특정 할 일 항목을 삭제합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'DELETE'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true
```

### 항목 일괄 삭제

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/deletions
  \ -X 'DELETE'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  todoIds: string[] // 삭제할 할 일 ID 목록 (필수!)
}
```

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true
```

### 목록 순서 변경

할 일 목록의 순서를 변경합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  todoIds: string[] // 새롭게 정렬할 할 일 ID 목록 (필수!)
}
```

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 순서 변경 여부
```
