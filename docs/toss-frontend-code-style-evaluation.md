# Jaeyoon.dev 코드 품질 평가

> 토스 프론트엔드 코드 스타일의 핵심 질문인 “요구사항이 바뀌었을 때 안전하고 쉽게
> 수정할 수 있는가?”를 기준으로 현재 프로젝트를 평가했다.

- 평가일: 2026-08-28
- 기준 커밋: `e3c2a8e`
- 평가 대상: `src/`, `package.json`, Astro·TypeScript·Biome·Vitest 설정, 콘텐츠 스키마
- 제외 대상: MDX 글의 문장 품질과 이미지 내용, 배포 인프라의 운영 상태
- 참고 자료:
  - [토스 프론트엔드 코드 스타일 정리](https://velog.io/@ayoung_dev/토스-프론트엔드-코드-스타일)
  - [토스: 선언적인 코드 작성하기](https://toss.tech/article/frontend-declarative-code)
  - [Frontend Fundamentals: 좋은 코드를 위한 4가지 기준](https://frontend-fundamentals.com/code-quality/code/)

## 1. 종합 결론

현재 코드는 **작은 블로그를 안정적으로 운영하기에 양호한 구조**다. Astro 페이지는 데이터
준비와 화면 조합이 단순하고, React는 상호작용이 필요한 섬에만 사용하며, 이미지 정책과
콘텐츠 타입도 중앙에서 관리한다. 새 글이나 단순 페이지를 추가하는 변경 비용은 낮다.

카테고리 선택에서는 URL 상태, 목록 스크롤, 탭 표시의 책임을 분리하고 회귀 테스트를 추가해
이전 평가의 핵심 위험을 해소했다. 호출처 없는 API·설정·메타데이터와 no-op 날짜 함수도 제거해
탐색해야 할 내부 계약을 줄였다. 날짜 입력·UTC 변환·HTML 기계 표현·정렬도 하나의 검증된 계약에
모아 콘텐츠와 소비자의 비정상 상태를 줄였다. Astro 전용 타입 검사와 경고 없는 Biome, 테스트,
빌드도 하나의 품질 게이트로 묶어 변경이 통합 기준을 어기면 즉시 실패한다. 반면 카드 UI, 전역
레이아웃, 테마처럼 **항상 함께 바뀌어야 하는 코드의 경계가 일부 어긋나 있다**. 지금은 파일 수가
적어 수동 동기화가 가능하지만, 카드 변형이 늘어나면 변경 누락이 발생하기 쉽다. `SlidePost`도
화면 코드가 암시하는 것보다 많은 제어 흐름을 책임진다.

**종합 점수: 90/100 — 좋음. URL·날짜 경계와 회귀 테스트에 더해 경고 없는 통합 품질 게이트를
갖췄으며, 남은 UI 중복 정책과 상호작용 경계를 정리할 단계다.**

| 평가 기준 | 점수 | 요약 |
| --- | ---: | --- |
| 가독성 | 18/20 | 카테고리 제어 흐름이 역할별로 나뉘었고, 슬라이더에는 여전히 맥락이 많다. |
| 예측 가능성 | 20/20 | 날짜 계약과 정적 검사 실패 기준이 테스트·통합 게이트로 고정됐다. |
| 응집도 | 16/20 | 이미지·카테고리·날짜 경계는 좋고 카드·레이아웃·테마 정책은 분산돼 있다. |
| 결합도 | 17/20 | 카테고리의 전역 DOM 결합을 제거했으며 테마·Giscus 이벤트 결합이 남아 있다. |
| 선언 수준 | 19/20 | `pnpm check`가 전체 품질 기준을 선언하며, 슬라이더에는 저수준 제어가 남아 있다. |

점수는 절대적인 품질 인증이 아니라 개선 순서를 비교하기 위한 휴리스틱이다. 폼, 서버 상태,
오버레이, 퍼널이 없는 프로젝트이므로 참고 글의 해당 예시는 평가 대상에서 제외했다.

## 2. 잘된 점

### 2.1 정적 화면과 상호작용의 경계가 명확하다

대부분의 화면은 Astro로 렌더링하고, 카테고리 필터·슬라이더·테마·댓글만 React island로
분리했다. 특히 `client:visible`, `client:idle`, `client:load`를 목적에 따라 선택한
[`index.astro`](../src/pages/index.astro#L14)와
[`[...slug].astro`](../src/pages/posts/%5B...slug%5D.astro#L22)는 페이지가 무엇을 하는지
짧은 선언으로 보여준다. 상호작용 구현의 영향 범위도 해당 island 안에 머문다.

### 2.2 게시글 데이터 변환이 한 방향으로 흐른다

[`posts.ts`](../src/lib/posts.ts#L34)는 컬렉션 항목을 카드 데이터로 바꾸고, 정렬하고, 이미지를
최적화하는 단계를 명시적으로 나눈다. `PostCardData`와 `ResponsivePostCardData`의 반환 형태도
타입으로 구분되어 호출자가 어떤 데이터를 받는지 알 수 있다.

### 2.3 함께 바뀌어야 하는 이미지 정책이 잘 모여 있다

카드·표지·히어로의 너비와 `sizes`, 포맷, 품질이
[`images.ts`](../src/lib/images.ts#L1)에 모여 있다. 새 이미지 규격을 추가하거나 품질 정책을
바꿀 때 수정 지점이 분명하다. `satisfies Record<PostImageVariant, PostImagePreset>`도 누락된
프리셋을 컴파일 시점에 막는다. 이 프로젝트에서 가장 좋은 응집도 사례다.

### 2.4 복잡한 조건과 중첩 삼항이 거의 없다

분기는 대부분 이른 반환이나 단순한 2항 선택으로 끝난다. 공개 유틸 함수의 이름과 타입도
전반적으로 일관적이다. `SITE_CONFIG`, `GISCUS_CONFIG`, `POST_IMAGE_PRESETS`처럼 의미가 있는
정책에는 이름을 붙였고, 컴포넌트 Props도 작다. 사용하지 않는 Props를 여러 계층에 전달하는
전형적인 Props Drilling은 발견하지 못했다.

### 2.5 현재 규모에서는 프레임워크별 디렉터리가 합리적이다

참고 기준은 함께 수정되는 기능 단위 배치를 권하지만, 이 저장소에서는 `astro/`와 `react/`가
렌더링·하이드레이션 경계를 설명한다. 현재 규모에서 이를 곧바로 `domains/` 구조로 바꾸면 시점
이동을 줄이기보다 탐색 규칙만 하나 더 만들 가능성이 높다. 기능 하나가 세 개 이상의 UI·훅·유틸
파일로 커지고 실제로 함께 자주 수정될 때 기능 하위 그룹을 도입하는 편이 낫다.

### 2.6 카테고리 URL 상태와 화면 효과의 책임이 분리됐다

[`useCategorySearchParam.ts`](../src/components/react/useCategorySearchParam.ts#L9)는 유효한 카테고리와
`All`만 상태로 허용하고 URL 읽기·정규화·history 구독을 한곳에서 맡는다. 유효하지 않은 값과
명시적인 `?category=All`은 `replaceState`로 정규화하고, 선택 변경은 `pushState`로 기록한다. 이때
다른 search param과 hash를 보존하며 같은 카테고리 재선택은 history를 추가하지 않는다.

[`PostsList.tsx`](../src/components/react/PostsList.tsx#L49)는 이름이 드러나는
`handleCategorySelect`에서 목록 스크롤을 호출하고,
[`CategoryTabs.tsx`](../src/components/react/CategoryTabs.tsx#L50)는 탭 표시와 선택된 탭의 가로 중앙
정렬만 담당한다. 전역 `id`, `document.getElementById`, 80px 계산을 제거하고 기존
[`globals.css`](../src/styles/globals.css#L38)의 `scroll-padding-top` 정책을 사용한 것도 결합도를
낮춘다. 로컬 게시글 배열을 필터링하는 현재 요구사항에는 TanStack Query나 Router를 추가하지 않은
판단도 적절하다.

### 2.7 첫 자동화 회귀 테스트의 범위가 구체적이다

[`vitest.config.ts`](../vitest.config.ts#L1)에서 `@` alias와 기본 Node 환경을 설정하고, 브라우저
동작 테스트만 jsdom을 사용한다.
[`useCategorySearchParam` 테스트](../src/components/react/useCategorySearchParam.browser.test.tsx#L23)는
직접 URL, 잘못된 값, `All`, 다른 parameter와 hash 보존, `pushState`·`replaceState`, 재선택과
`popstate`를 검증한다.
[`PostsList` 테스트](../src/components/react/PostsList.browser.test.tsx#L72)는 필터링, 목록
`scrollIntoView`, 탭 가로 `scroll`을 구분해 검증한다. 테스트 수보다 중요한 URL·화면 효과의
계약을 고정했다는 점이 좋다. [`dates` 테스트](../src/lib/dates.test.ts#L9)는 형식과 실제 달력
날짜, 윤년, UTC 변환, HTML 값, 최신순 비교를 22개 사례로 검증한다.

## 3. 핵심 개선 사항과 완료 기록

> 관리 원칙: 평가에서 발견한 개선 사항은 완료 후에도 삭제하지 않는다. 제목에 `[완료]` 상태와
> 완료 커밋을 표시하고, 최초 문제·권장 방향·실제 변경·검증 결과를 기록한다. 완료 표시가 없는
> 항목은 아직 남은 개선 사항이다.

### P1. 동일한 게시글 카드가 두 구현으로 갈라져 있다

- 근거:
  - Astro 카드: [`PostCard.astro`](../src/components/astro/PostCard.astro#L16)
  - React 카드: [`PostsList.tsx`](../src/components/react/PostsList.tsx#L6)
- 현재 상태와 차이:
  - **[완료 · `25b8d8b`]** Astro의 no-op 날짜 함수와 React의 원문 표시 차이는 제거됐다. 두
    구현 모두 `createdAt` 문자열을 직접 표시한다.
  - **[완료 · `8b6a605`]** 두 카드가 받는 실제 콘텐츠의 `createdAt`은 이제 공통 스키마를
    통과하며 저장·화면 형식은 모두 `YYYY.MM.DD`로 유지된다.
  - 제목이 한쪽은 `<p>`, 다른 쪽은 `<h2>`다.
  - muted 색상도 토큰과 하드코딩 값으로 갈라져 있다.
  - 나머지 크기·간격·이미지·링크 마크업은 사실상 같은 요구사항을 복제한다.
- 위험: 카드 디자인, 날짜 형식, 접근성, 이미지 속성을 변경할 때 한쪽만 고칠 수 있다. 이미 작은
  차이가 생겼으므로 “앞으로 서로 달라질 수 있어 허용한 중복”보다는 응집도 저하에 가깝다.
- 권장: `ResponsivePostCardData`를 공통 view model로 삼고, hydration 없이도 Astro에서 서버
  렌더링할 수 있는 하나의 React 표시 컴포넌트를 양쪽에서 사용한다. Astro `<Image>`를 유지해야
  한다면 이미지 렌더러만 얇은 adapter로 받고 카드의 의미 구조와 스타일은 한 구현에 둔다.

### P1. [완료 · `37b0c80`] `useCategoryFilter`가 이름보다 많은 부수 효과를 수행했다

- 최초 평가 근거: 기준 커밋 `764fff5`의
  [`CategoryTabs.tsx`](https://github.com/devjaeyoon/jaeyoon.dev/blob/764fff5/src/components/react/CategoryTabs.tsx#L102-L139)
- 이전 `CategoryTabs.tsx`와 `useCategoryFilter`에 모여 있던 책임:
  1. 선택 상태 관리
  2. 탭 위치 중앙 정렬
  3. 페이지 스크롤
  4. URL query 생성
  5. 브라우저 history 추가
  6. `popstate` 구독과 복원
- 이전 문제: `selectCategory()`라는 호출만 보고는 화면 스크롤과 history 변경까지 예측하기
  어려웠다. `80` 픽셀 오프셋도 헤더 규격과의 관계가 이름으로 드러나지 않았고, URL에 존재하지
  않는 카테고리가 들어오면 선택된 탭 없이 게시글이 0개가 됐다. 클릭 직후와 선택 effect에서 탭
  중앙 정렬도 중복 호출됐다.
- 당시 권장 방향:
  - URL 동기화를 유효한 category 목록을 받는 전용 훅으로 분리한다.
  - 페이지 스크롤은 `PostsList`의 명시적인 `handleCategorySelect`에서 호출한다.
  - URL 값을 검증하고 유효하지 않으면 `All`로 정규화한다.
  - 전역 DOM 탐색과 고정 offset 계산을 제거한다.
  - 탭 중앙 정렬을 선택 상태 변경 effect 한 경로로 합친다.
- 완료 내용:
  - [`useCategorySearchParam`](../src/components/react/useCategorySearchParam.ts#L9)으로 URL 읽기,
    유효성 검증, 정규화, history와 `popstate` 책임을 분리했다.
  - [`PostsList`](../src/components/react/PostsList.tsx#L49)의 `handleCategorySelect`가 지역 ref의
    `scrollIntoView`를 호출하고, 같은 탭을 다시 선택해도 목록 스크롤은 수행한다.
  - [`CategoryTabs`](../src/components/react/CategoryTabs.tsx#L50)는 탭 표시와 가로 정렬만 맡으며,
    선택 effect에서만 중앙 정렬한다.
  - `All`과 잘못된 URL은 다른 search param·hash를 보존하며 `replaceState`로 정규화하고, 같은
    category 재선택은 history 항목을 추가하지 않는다.
  - Vitest와 jsdom을 도입해 훅과 컴포넌트의 URL·필터·스크롤 계약을 7개 테스트로 고정했다.
- 검증: `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`가 모두 성공했다.

### P1. [완료 · `8b6a605`] 날짜의 입력·표시·기계 표현 계약이 느슨하다

- 최초 평가 근거: 기준 커밋 `25b8d8b`의
  [`content.config.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/25b8d8b/src/content.config.ts#L19),
  [`dates.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/25b8d8b/src/lib/dates.ts#L1-L3),
  [`PostTitle.astro`](https://github.com/devjaeyoon/jaeyoon.dev/blob/25b8d8b/src/components/astro/PostTitle.astro#L23-L25)
- 최초 문제:
  - 스키마는 날짜를 임의의 문자열로 허용하고 파서는 `.`와 `/`를 모두 묵시적으로 허용했다.
  - Astro와 React의 카드는 검증되지 않은 `createdAt`을 표시하고, 상세의 `<time datetime>`에도
    화면 형식인 `YYYY.MM.DD`가 그대로 들어갔다.
  - 빌드 HTML에 `datetime="2026.08.24"`가 생성됐고, 오타가 정렬에서는 `Invalid Date`, RSS와
    HTML에서는 서로 다른 결과를 만들 수 있었다.
- 당시 권장 방향:
  - 공통 `postDateSchema`에서 `YYYY.MM.DD`와 실제 달력 날짜를 검증한다.
  - `toHtmlDateTime`, `parsePostDate`의 계약을 분리하거나 한 번 Date로 정규화한다.
  - **[완료 · `25b8d8b`]** 실제 소비 계획이 없던 `updatedAt` 필드와 빈 값을 제거해 불필요한
    날짜 상태를 없앤다.
  - 날짜 파싱·정렬·ISO 변환을 가장 먼저 단위 테스트한다.
- 완료 내용:
  - [`dates.ts`](../src/lib/dates.ts#L1)에 네 자리 양의 연도, zero-padding, 윤년을 포함한 실제 달력
    날짜를 검증하는 `postDateSchema`를 정의하고 콘텐츠의 `createdAt`에 적용했다.
  - `parsePostDate`는 잘못된 입력을 `RangeError`로 거부하고 유효한 날짜를 UTC 자정으로 변환한다.
    `toHtmlDateTime`은 검증 후 `YYYY-MM-DD`를 만들며, `comparePostDatesDescending`은 목록과 RSS의
    최신순 비교 계약을 함께 맡는다. 기존 `parseDate`는 제거했다.
  - 상세 화면은 텍스트 `YYYY.MM.DD`를 유지하면서 `<time datetime>`만 ISO 형식으로 출력한다.
    기존 게시글 11개의 frontmatter와 표시 순서는 수정하지 않았다.
- 검증:
  - [`dates.test.ts`](../src/lib/dates.test.ts#L1)의 22개 사례가 정상·윤년·잘못된 구분자와 padding,
    존재하지 않는 날짜, `0000`, UTC, HTML 변환, 동일 날짜와 최신순 비교를 통과한다.
  - `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`가 모두 종료 코드 0이다.
  - 빌드 HTML은 `datetime="2026-08-24"`와 `2026.08.24`를 함께 출력한다. RSS 첫 항목은 기존처럼
    `Mon, 24 Aug 2026 00:00:00 GMT`이며 전체 11개 항목의 최신순이 유지된다.

### P1. [완료 · `e3c2a8e`] 자동화 테스트는 생겼지만 정적 검사 신호는 아직 깨끗하지 않다

- 최초 문제:
  - [`package.json`](../package.json#L8)에 `test`와 `test:watch`가 추가됐고, 카테고리 기능의
    브라우저 회귀 테스트 7개와 날짜 계약 22개 사례가 실행됐다.
  - `pnpm lint`는 종료 코드 0이지만 47개 경고를 출력했다. 모두 `.astro`의
    `noUnusedImports`/`noUnusedVariables`이며, 실제로는 frontmatter에서 선언해 template에서 쓰는
    심볼이다. 기존 46개에 새 `toHtmlDateTime` import 오탐 1개가 추가돼 현재 출력은 실제 결함과
    도구 오탐을 구분하기 어려웠다.
  - TypeScript·TSX만 대상으로 한 Biome 검사와 `tsc --noEmit`은 경고·오류 없이 통과했다. 다만
    `astro check`를 포함하는 단일 `check` 명령은 없었다.
- 당시 권장 방향:
  - `.astro`에서 현재 오탐인 규칙을 override하고 Astro 전용 검사로 template 타입 안전성을
    보완하거나, Astro 사용을 정확히 추적하는 린트 구성을 선택한다.
  - 경고가 일상적으로 남지 않게 한 뒤 CI에서 경고도 실패로 다룬다.
  - `astro check`를 포함한 `check` 스크립트를 추가한다.
  - 다음 테스트 범위는 게시글 변환·카테고리 추출 같은 나머지 순수 함수부터 확장한다.
  - 현재 경고의 자동 수정 제안대로 import를 삭제하면 Astro template가 깨질 수 있으므로 그대로
    적용하지 않는다.
- 완료 내용:
  - `@astrojs/check@^0.9.10`을 개발 의존성으로 추가하고 기존 TypeScript 의존성은 유지했다.
  - [`biome.json`](../biome.json#L34)의 `.astro` override에서 오탐인 `noUnusedImports`와
    `noUnusedVariables`만 껐다. Astro 포맷팅과 나머지 권장 규칙은 그대로 적용된다.
  - `pnpm lint`에 `--error-on-warnings`를 적용해 새 경고도 실패하도록 만들었다.
  - `pnpm check`는 `astro check --minimumFailingSeverity warning`, lint, test, build를 순서대로
    실행한다. Astro 검사가 `.astro`와 TypeScript를 함께 검사하므로 `tsc`는 중복 포함하지 않았다.
  - 실제 Astro 진단이 없었으므로 애플리케이션 소스와 화면·콘텐츠는 수정하지 않았다.
- 검증:
  - `pnpm check`에서 Astro 33개 파일의 오류·경고·힌트가 모두 0건이고, Biome 37개 파일의 진단도
    0건이다.
  - 기존 Vitest 3개 파일·29개 테스트가 통과하고 Astro build가 15개 정적 페이지를 생성했다.
  - 별도 `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`도 종료 코드 0이다.

### P2. 테마 계약이 세 파일과 문자열 이벤트에 분산되어 있다

| 책임 | 현재 위치 |
| --- | --- |
| 최초 테마 결정·DOM class·storage | [`BaseLayout.astro`](../src/layouts/BaseLayout.astro#L49) |
| 토글·storage·custom event 발행 | [`ThemeToggler.tsx`](../src/components/react/ThemeToggler.tsx#L106) |
| Giscus 테마 변환·event 구독 | [`Giscus.tsx`](../src/components/react/Giscus.tsx#L13) |

초기 inline script는 화면 깜빡임을 막기 위해 적절한 경계다. 문제는 `"theme"`, `"dark"`,
`"theme-change"`, Giscus 테마 매핑이 암묵적인 프로토콜이라는 점이다. 이벤트 payload도
`CustomEvent<boolean>`로 강제 단언한다.

`Theme` 타입, storage key, event name, Giscus 테마 변환을 작은 모듈에 모으고 inline script에는
필요한 값만 주입하는 편이 안전하다. 소비자가 두 곳뿐인 현재는 전역 상태 라이브러리나 Context까지
도입할 필요는 없다.

### P2. `SlidePost`가 화면과 제어 흐름을 동시에 관리한다

- 근거: [`SlidePost.tsx`](../src/components/react/SlidePost.tsx#L12)
- 한 컴포넌트가 현재 index, 자동 전환 interval, hover/focus 일시정지, DOM event 등록, 이전·다음
  계산, indicator, animation, 카드 렌더링을 모두 다룬다.
- `isHovered`는 실제로 focus 상태도 포함하므로 이름과 상태 의미가 다르다.
- `TIME_INTERVAL`은 목적과 단위가 없어 `AUTO_ADVANCE_INTERVAL_MS`보다 정보가 적다.
- 권장:
  - index와 자동 전환을 `useAutoRotatingIndex({ itemCount, intervalMs })` 같은 훅으로 격리한다.
    목적은 재사용보다 타이머 정책을 독립적으로 바꾸고 테스트하는 데 있다.
  - 수동 `addEventListener` 대신 `<section onMouseEnter ... onFocus ...>`처럼 React 이벤트로
    일시정지 의도를 화면에 선언한다.
  - 상태 이름은 `isPaused`로 바꾼다.
  - 화살표 SVG 중복은 두 화면의 변경 방향이 갈리는 문제가 아니고 변경 위험도도 낮으므로,
    이 작업과 동시에 억지로 공통화할 필요는 없다.

### P2. 전역 레이아웃 두 개가 필수 `title` 여부 외에는 같다

[`MainLayout.astro`](../src/layouts/MainLayout.astro#L1)와
[`PostLayout.astro`](../src/layouts/PostLayout.astro#L1)는 `title`의 optional 여부만 다르다. Header,
Footer, main 폭이나 상단 여백은 사이트 전체 정책이므로 한쪽만 바뀌면 실제 UI 불일치가 생긴다.

현재는 `[...slug].astro`도 `MainLayout`을 직접 사용하고 `PostLayout`을 제거하는 것이 가장 작은
변경이다. 게시글 전용 shell 요구사항이 실제로 생길 때 다시 분리하는 편이 성급한 추상화도 피한다.

### P3. [완료 · `25b8d8b`] 사용되지 않는 추상화와 이름을 정리한다

- 최초 평가 근거: 기준 커밋 `37b0c80`의
  [`posts.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/37b0c80/src/lib/posts.ts#L97-L101),
  [`dates.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/37b0c80/src/lib/dates.ts#L5-L7),
  [`constants.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/37b0c80/src/constants.ts#L1-L22),
  [`content.config.ts`](https://github.com/devjaeyoon/jaeyoon.dev/blob/37b0c80/src/content.config.ts#L20)
- 최초 문제:
  - `getPostBySlug`는 공개 함수지만 호출처가 없어 탐색할 API만 늘렸다.
  - `formatDisplayDate`는 이름과 달리 입력을 그대로 반환했고, Astro 두 호출부만 React와 다른
    표시 경로를 사용했다.
  - `SITE_CONFIG.author`, `SOCIAL`, 선택적 `updatedAt` 스키마와 게시글 11개의 빈 `updatedAt`은
    실제 소비처나 가까운 사용 계획이 없었다.
- 당시 권장 방향:
  - 사용 시점이 정해지지 않은 API·설정·메타데이터는 제거한다.
  - 날짜 표시 정책을 구현하지 않을 것이라면 no-op 함수 대신 `createdAt`을 직접 렌더링해 이름과
    동작을 일치시킨다.
  - 날짜 입력 검증과 ISO `datetime` 변환은 별도 날짜 계약 작업에서 다룬다.
- 완료 내용:
  - `getPostBySlug` export와 `formatDisplayDate`, Astro 두 호출부의 import를 제거했다. 두 화면은
    기존과 같은 `createdAt` 문자열을 직접 렌더링한다.
  - `SITE_CONFIG.author`와 `SOCIAL` export를 제거했다.
  - 콘텐츠 스키마의 `updatedAt`과 게시글 11개의 빈 frontmatter 항목을 제거했다.
  - 당시 정렬·RSS에서 사용하던 `parseDate`는 유지했다. 후속 날짜 P1
    **[완료 · `8b6a605`]** 에서 이를 `parsePostDate`와 공통 내림차순 비교 함수로 교체했다.
    게시글 본문의 과거 코드 예시에 있는 `updatedAt`과 `getPostBySlug` 문구는 콘텐츠 기록이므로
    유지했다.
- 검증:
  - 소스 검색에서 제거 대상 심볼과 스키마 참조가 0건이고, `updatedAt:` frontmatter도 0건이다.
  - `pnpm test`와 `pnpm exec tsc --noEmit`은 종료 코드 0으로 성공했다.
  - `pnpm lint`는 종료 코드 0으로 성공했고, 기존 Astro template 오탐 46개를 경고로 출력했다.
  - `pnpm build`는 종료 코드 0으로 15개 정적 페이지를 생성했다. 빌드 HTML의 게시글 상세 제목
    영역과 Astro 카드 날짜는 기존과 같은 `YYYY.MM.DD` 텍스트를 출력한다.

## 4. 기준별 상세 평가

### 4.1 가독성

**판정: 좋음**

- 페이지 파일이 데이터 준비 후 컴포넌트를 조합하는 순서로 자연스럽게 읽힌다.
- `posts.ts`의 map → sort, 이미지의 map → `Promise.all` 흐름이 명확하다.
- 중첩 삼항과 이름 없는 복잡한 boolean 식은 발견하지 못했다.
- 카테고리 동작은 URL 상태·목록 효과·탭 표시로 나뉘어 각 파일에서 고려할 맥락이 줄었다.
- `SlidePost`는 여전히 동시에 고려할 맥락이 많아 동작 변경 시 파일을 반복해서 오르내리게 된다.
- Tailwind arbitrary value가 많지만 주로 시각 규격이다. 모든 숫자를 상수화할 필요는 없고,
  JavaScript 동작과 연결되는 `5000`처럼 의미·단위가 필요한 값부터 이름 붙여야 한다.

### 4.2 예측 가능성

**판정: 좋음**

- strict TypeScript와 명시적인 view model 덕분에 함수 입력·반환은 대체로 예측 가능하다.
- `useCategorySearchParam`은 이름과 반환 API에서 URL 변경을 드러내고, 유효하지 않은 category를
  경계에서 `All`로 정규화한다.
- 호출처 없는 공개 API·설정과 `formatDisplayDate` no-op을 제거해 실제 계약과 코드 표면이
  일치한다.
- `postDateSchema`가 외부 입력을 경계에서 검증하고, UTC·HTML·정렬 함수가 잘못된 입력을 같은
  `RangeError` 계약으로 거부한다.
- `pnpm check`가 Astro·TypeScript 진단, 경고 없는 lint, 테스트, 빌드의 성공 조건을 한 경로로
  고정해 로컬과 향후 CI의 결과를 예측할 수 있다.
- `getPostCards`는 이름만으로 날짜 내림차순 정렬까지 예상하기 어렵다.
- Giscus 테마 문자열이 같은 파일에서 두 번 계산되어 정책 변경 시 한쪽을 놓칠 수 있다.

### 4.3 응집도

**판정: 좋음**

- 이미지 정책, 게시글 데이터 변환, 카테고리 URL 상태, 날짜 계약은 높은 응집도를 보인다.
- 날짜의 콘텐츠 검증·UTC 변환·HTML 표현·정렬이 `dates.ts`의 작은 공개 API로 모였다.
- 카테고리의 화면 스크롤과 탭 정렬은 각 효과를 실제로 소유한 컴포넌트에 위치한다.
- 카드 마크업과 전역 shell은 반드시 같이 바뀔 가능성이 높은데 구현이 각각 두 벌이다.
- 테마 정책은 초기화·토글·외부 위젯 동기화로 나뉘는 것이 자연스럽지만, 이들을 연결하는 계약은
  한곳에 모여 있지 않다.
- 현재 폴더 구조 자체보다 “어떤 변경이 몇 파일을 동시에 요구하는가”가 더 큰 문제다.

### 4.4 결합도

**판정: 좋음**

- React island가 필요한 범위만 hydration하여 정적 페이지와 상호작용 코드의 결합을 줄였다.
- 컴포넌트 Props가 작고 중간 전달 전용 컴포넌트가 없다.
- category의 브라우저 history 결합은 전용 훅 안에 격리됐고, 목록 스크롤은 지역 ref만 사용한다.
- Giscus는 전역 query selector와 문자열 custom event에 결합한다. 외부 script 연동 자체의
  명령형 구현은 적절하지만, 앱과 연결되는 adapter 계약은 좁힐 수 있다.
- 카드 중복을 없앨 때 옵션 Props를 계속 추가하는 거대 공통 컴포넌트로 만들면 오히려 결합도가
  높아진다. 현재 동일한 카드 요구사항까지만 공통화해야 한다.

### 4.5 선언 수준

**판정: 좋음**

- Astro의 content collection, layout, page 조합과 이미지 프리셋은 “어떻게”보다 “무엇”을
  보여주는 선언 수준이다.
- Header가 `<ThemeToggler />`만 알고 테마 조작 상세를 모르는 것도 좋은 추상화다.
- 카테고리는 `useCategorySearchParam`과 `handleCategorySelect`로 URL 변경과 화면 효과의 의도가
  드러나며, `CategoryTabs`는 브라우저 URL을 알지 않는다.
- 날짜 소비자는 `comparePostDatesDescending`, `parsePostDate`, `toHtmlDateTime`으로 목적을 선언하고
  형식 검증과 달력 계산 상세를 알지 않는다.
- 저장소의 전체 품질 기준은 `pnpm check` 한 명령으로 선언되어 개별 도구의 실행 순서를 외울
  필요가 없다.
- 슬라이더의 DOM listener와 interval은 화면 코드에 구현 상세가 많이 노출된다. 이 제어 흐름은
  작은 훅/adapter 뒤로 이동할 가치가 있다.
- Overlay, Funnel, Suspense를 사용하지 않은 것은 감점 요소가 아니다. 이 프로젝트에는 해당
  복잡성이 없으며, 예시 라이브러리를 도입하는 것 자체는 변경 비용을 낮추지 않는다.

## 5. 변경 결합 지도

| 변경하려는 정책 | 현재 함께 확인해야 하는 파일 | 권장 경계 |
| --- | --- | --- |
| 게시글 카드 디자인·의미 구조 | `PostCard.astro`, `PostsList.tsx` | 공통 카드 표시 컴포넌트 |
| 전역 Header·Footer·main 규격 | `MainLayout.astro`, `PostLayout.astro` | 하나의 site layout |
| 테마 저장·이벤트·외부 위젯 테마 | `BaseLayout.astro`, `ThemeToggler.tsx`, `Giscus.tsx` | 작은 theme contract 모듈 |
| 게시글 날짜 입력·정렬·표시·RSS | `dates.ts`와 `content.config.ts`, `posts.ts`, `PostTitle.astro`, `rss.xml.ts` 소비자 | `dates.ts` 공통 계약 완료; 소비자 역할 유지 |
| 카테고리 선택·URL·스크롤 | `useCategorySearchParam.ts`, `PostsList.tsx`, `CategoryTabs.tsx` | 역할별 분리 완료; 현재 경계 유지 |

이 표에서 한 행의 파일들이 실제로 항상 같이 바뀌어야 한다면 응집도를 우선해 공통화하고,
향후 요구사항이 갈릴 가능성이 크며 한쪽 누락의 위험이 낮다면 중복을 허용한다.

카테고리 행은 여러 파일이 있다는 사실 자체가 응집도 저하가 아닌 사례다. URL 규칙, 목록 위치,
탭의 가로 정렬은 변경 이유가 서로 다르고 각 책임의 계약이 테스트로 연결돼 있다. pagination·정렬
등 복합 search param을 여러 React 경로가 공유하게 될 때만 Router 도입을 다시 검토하면 된다.

## 6. 개선 로드맵

### 1단계 — 품질 신호와 데이터 경계 복구

1. **[완료 · `8b6a605`]** 날짜 스키마와 UTC·ISO 변환을 추가한다.
2. **[날짜 완료 · `8b6a605`]** 날짜 파싱·정렬 단위 테스트를 추가한다. 게시글 변환·카테고리
   추출 테스트는 필요에 따라 확장한다.
3. **[완료 · `e3c2a8e`]** Biome의 Astro 오탐을 제거하고 `astro check`를 포함한 단일 `check`
   명령을 만든다.
4. **[완료 · `25b8d8b`]** 사용하지 않는 API·설정·메타데이터와 no-op 함수를 정리한다.

### 2단계 — 함께 바뀌는 UI 통합

1. 공통 card view model과 표시 컴포넌트를 만든다.
2. 홈과 전체 게시글 화면의 날짜·시맨틱 마크업·색상 토큰이 동일함을 확인한다.
3. `PostLayout`을 제거하거나 공통 site shell에 위임한다.

### 3단계 — 상호작용 책임 축소

1. **[완료 · `37b0c80`]** category search param 상태와 목록 스크롤 효과를 분리하고 잘못된 URL을
   `All`로 정규화한다.
2. 슬라이더 자동 전환을 테스트 가능한 훅으로 분리하고 React 이벤트를 사용한다.
3. 테마의 타입·storage key·event name·Giscus 매핑을 한 계약으로 모은다.

### 이번 업데이트로 완료된 조건

- 유효하지 않은 `?category=`는 빈 화면이 아니라 `All`로 복구된다.
- `useCategorySearchParam` API는 URL 변경을, `handleCategorySelect`는 화면 효과를 드러낸다.
- URL 상태와 카테고리 필터의 핵심 회귀 테스트가 `pnpm test`에서 실행된다.
- 호출처 없는 `getPostBySlug`, no-op `formatDisplayDate`, 소비되지 않는 설정을 제거했다.
- `updatedAt` 스키마와 게시글 11개의 빈 메타데이터를 제거했다.
- Astro 날짜 표시가 `createdAt` 직접 렌더링으로 단순해졌고 화면 텍스트는 그대로 유지된다.
- 콘텐츠 날짜 오타와 존재하지 않는 날짜는 스키마에서 실패한다.
- 날짜 변환은 잘못된 입력을 거부하고 UTC 자정, HTML ISO 값, 최신순 정렬을 일관되게 만든다.
- 날짜 계약의 22개 사례가 `pnpm test`에서 실행되고 RSS 11개 항목의 순서와 시각이 유지된다.
- `.astro` template 사용 심볼의 Biome 오탐 47개를 좁은 파일별 override로 제거했다.
- `pnpm check`가 Astro·TypeScript 진단, 경고 없는 Biome, 테스트, 빌드를 연속 검증한다.

### 남은 완료 조건

- 카드의 의미 구조와 스타일을 바꿀 기본 수정 지점이 한 곳이다.
- 게시글 변환·카테고리 추출 등 나머지 핵심 순수 함수의 회귀 테스트가 있다.

## 7. 검증 결과

평가 시점에 아래 명령을 실행했다.

| 명령 | 결과 | 해석 |
| --- | --- | --- |
| `pnpm check` | 성공 | Astro 33개 파일 진단 0건, Biome 37개 파일 진단 0건, 3개 파일·29개 테스트 통과, 15개 정적 페이지 생성 |
| `pnpm test` | 성공, 3개 파일·29개 테스트 통과 | URL·필터·스크롤 및 날짜 형식·UTC·정렬 계약 검증 |
| `pnpm exec tsc --noEmit` | 성공 | TypeScript·TSX와 테스트 코드 타입 검사 통과 |
| `pnpm lint` | 성공, 37개 파일·진단 0건 | 경고도 실패하는 Biome 검사 통과 |
| `pnpm build` | 성공 | 콘텐츠 동기화, 15개 정적 페이지 생성, 화면 날짜와 RSS 계약 유지 |
| `git diff --check` | 성공 | 커밋한 설정·잠금 파일에 공백 오류 없음 |

브라우저 동작 테스트는 jsdom 환경에서 가로 탭 `scroll`과 목록 `scrollIntoView`를 별도로 stub해
실행했다. 실행 환경은 Node.js `v24.18.0`, pnpm `11.18.0`이며 프로젝트의 Node.js 엔진 조건을
만족했다. 빌드 결과에서 게시글 상세 제목 영역의 `datetime`과 화면 텍스트는 각각
`2026-08-24`, `2026.08.24`였고, Astro·React 카드는 기존 `YYYY.MM.DD` 표시를 유지했다. RSS는
11개 게시글을 최신순으로 출력하며 첫 항목의 `pubDate`는
`Mon, 24 Aug 2026 00:00:00 GMT`다. 제거된 `parseDate`와 `datetime={createdAt}` 직접 변환은 소스
검색에서 0건이다.

## 8. 최종 판단

이 프로젝트의 문제는 난해한 알고리즘이나 과도한 추상화가 아니다. 카테고리 기능은 **외부 입력을
검증하고, 부수 효과의 이름과 위치를 드러내며, 계약을 테스트로 고정하는 방식**으로 이전 위험을
잘 해소했다. 호출처 없는 API와 no-op 함수도 제거해 코드가 암시하는 계약을 실제 동작에 맞췄다.
날짜도 **외부 입력을 검증하고, 저장·화면·기계 표현을 구분하며, 소비자의 의도를 이름으로
드러내는 계약**으로 정리했다. 정적 검사도 Astro template 오탐을 실제 진단과 분리하고 전체
품질 기준을 `pnpm check`로 선언해 변경 검증 경로가 예측 가능해졌다. 이제 다음 변경 비용을
높이는 주된 요인은 같은 카드·레이아웃 정책이 두 구현에 복제된 부분과 테마·슬라이더의 분산된
상호작용 계약이다.

우선순위는 “더 많은 패턴 도입”이 아니라 **변경 누락 가능성이 큰 중복을 합치고, 외부 입력과
부수 효과의 계약을 드러내며, 그 계약을 자동 검사로 고정하는 것**이다. 카테고리에서 적용한
작은 전용 훅·명시적인 이벤트 핸들러·경계 테스트의 조합을 남은 날짜·테마·슬라이더에도 필요한
만큼만 확장하면 된다.
