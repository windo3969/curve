/**
 * 목차 고르기(추천 트리) 데이터 타입
 *
 * - 항목(TreeNode) 하나 = 리포트의 한 페이지
 * - 하위 항목은 상위 항목을 "쪼갠" 것이 아니라, 이어서 볼 "다음 주제"예요.
 * - 페이지 형식은 자유로워요. 필요한 블록만 골라 순서대로 씁니다.
 */

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'text'; paragraphs: string[] }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'steps'; title?: string; items: { title: string; body: string }[] }
  | { type: 'checklist'; title?: string; items: string[] }
  | { type: 'compare'; title?: string; columns: { name: string; points: string[] }[] }
  | { type: 'timeline'; title?: string; items: { when: string; what: string }[] }
  | { type: 'key'; text: string }
  | { type: 'tip'; text: string }
  | { type: 'assumption'; text: string };

export type Page = {
  intro: string[];
  blocks: Block[];
  sources?: string[];
};

export type TreeNode = {
  id: string;
  title: string;
  /** 이 페이지에서 다룰 것(한 줄) */
  summary: string;
  /** 칩 앞에 붙는 작은 꼬리표(공통 가지의 카테고리 이름 등) */
  tag?: string;
  /** 목표 입력값에 이 단어가 들어 있으면 "목표와 가까워요" 표시 */
  goalKeywords?: string[];
  /** 페이지 본문. 없으면 요약으로 만든 짧은 미리보기가 들어가요. */
  page?: Page;
  children?: TreeNode[];
};

export type DeptId = 'cs' | 'me' | 'biz';

export type DeptTree = {
  id: DeptId;
  name: string;
  /** 1단계 진로 후보 */
  careers: TreeNode[];
};
