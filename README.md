# 🐾 Mungpass (멍패스)
### 반려 시설 간편 입장 및 통합 관리 플랫폼 (O2O)

### "반려 시설의 번거로운 수기 입장 절차를 개선하고, 사장님과 견주를 유기적으로 연결하는 비즈니스 지향 O2O 서비스입니다."
<br />

**[서비스 랜딩페이지 가보기](https://mungpass-landing.vercel.app/)**<br />
**[서비스 페이지 가보기](https://mungpass.vercel.app/)**

<br />

🚀 서비스 비전 & 목적
문제 정의: 기존 반려 시설 이용 시 발생하는 번거로운 수기 명부 작성 및 불투명한 매출 관리의 불편함 해결

비즈니스 가치: QR 코드를 활용한 빠른 입장(Entry) 시스템과 데이터 기반의 관리자 대시보드를 통합하여 반려 시장의 DX(Digital Transformation) 지향

현재 상태: 비즈니스 모델 고도화 진행 중 (Active Project)

<br />

## 🛠 기술 스택 (Tech Stack)

| Category | Tech Stack | Details & Reason |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** | App Router를 활용한 SEO 최적화 및 서버 사이드 렌더링 구현 |
| **Language** | **TypeScript** | 엄격한 타입 정의를 통한 안정적인 데이터 구조 및 비즈니스 로직 설계 |
| **UI Library** | **Ant Design (antd)** | **Antd Registry를 통한 SSR 환경 스타일 최적화** 및 UI 일관성 유지 |
| **State** | **TanStack Query, Zustand** | 효율적인 서버 상태 캐싱(Server State) 및 전역 상태 관리 분리 |
| **BaaS** | **Supabase** | Auth, Realtime, DB, Storage를 연동한 실시간 O2O 인프라 구축 |
| **Admin** | **Refine, Recharts** | Admin, owner 프레임워크 기반 효율적 개발 및 데이터 시각화(매출/통계) 구현 |
| **Styling** | **Tailwind CSS, Framer Motion** | 생산성 높은 스타일링과 부드러운 인터랙션 구현 |
| **Architecture** | **FSD (Feature-Sliced Design)** | 관심사 분리를 통해 확장성과 유지보수성을 극대화한 설계 |

<br />

## 🏗 아키텍처 (Architecture)
FSD (Feature-Sliced Design) 도입
프로젝트의 규모가 커짐에 따라 코드의 결합도를 낮추고 유지보수성을 극대화하기 위해 FSD 구조를 채택했습니다.

Layers: app, pages, widgets, features, entities, shared로 엄격히 구분하여 관심사 분리 구현

<br />

## ✨ 주요 구현 사항 (Key Features)
1. QR 기반 O2O 통합 입장 시스템
- 매장별 상품 고유 QR 코드를 생성하고 유저의 고유 ID와 매칭하여 1초 고속 입장 로직 구현
- Supabase Realtime을 연동하여 유저의 입장과 동시에 사장님 페이지에 실시간 알림 반영

2. 데이터 기반 B2B 관리자 대시보드
- Refine 프레임워크를 활용하여 유저 관리, 매장 설정 기능을 효율적으로 구축
- Recharts 라이브러리를 통해 일별/월별 매출 현황 및 실시간 방문자 통계를 시각화하여 경영 인사이트 제공

3. 백엔드 보안 및 자동화 설계
- Supabase Trigger: 데이터베이스 레벨에서 비즈니스 로직을 자동화하여 서버 비용 절감 및 무결성 확보
- RLS 정책: 유저 타입(견주/사장님)에 따른 엄격한 데이터 접근 권한 분리 설계
<br />

## 🔫 트러블 슈팅 (Troubleshooting)
[Next.js SSR 스타일 깨짐(FOUC) 해결]
- 문제: Ant Design 사용 시 서버 사이드 렌더링 환경에서 스타일이 적용되기 전 HTML이 노출되는 현상 발생
- 해결: @ant-design/nextjs-registry를 도입하여 서버에서 스타일 시트를 미리 추출하고 주입함으로써 사용자 경험 개선

[컴포넌트 재사용 시 데이터 정합성 이슈]
- 문제: 동일한 모달 내에서 데이터가 바뀔 때 이전 데이터가 일시적으로 남는 캐시 문제 발생
- 해결: React의 key 속성을 활용하여 컴포넌트의 라이프사이클을 명확히 제어함으로써 데이터 엇박자 해결

[Next.js SSR 환경의 Hydration 및 사전 렌더링 에러 해결]
- 문제1 : **useSearchParams** 빌드 오류 : 런타임 기반의 클라이언트 훅이 사전 PreRender되어 Vercel 배포 빌드가 중단되는 현상 발생
- 해결1 : 해당 컴포넌트의 상위 페이지를 **Suspense** 로 감싸 CSR 전환 시점을 명확히 분리
- 문제2 : **Zustand Persist** 데이터 깜빡임 : 서버에는 없는 브라우저의 **localStorage**상태가 클라이언트 하이드레이션 이전에 참조되어 새로고침시 데이터가 순간적으로 비어 보이는 현상 발생
- 해결2 : **onRehydrateStorage**를 활용해 상태 복구 완료를 관리하고 하이드레이션 완료 후에만 UI를 렌더링하도록 제어



