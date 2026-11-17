import type { CoverData } from '../components/report/ReportCover';
import type { RoadmapPage } from '../components/report/ReportPage';
import { DEMO_TREE, buildRoots, inTreeOrder, indexTree, isDemoDept, type DeptTree, type Page, type TreeNode } from '../data/trees';
import type { Category, Grade, Plan } from '../data/tryForm';

export type TryInput = {
  name: string;
  age: string;
  school: string;
  dept: string;
  grade: Grade | '';
  categories: Category[]; // 우선순위 순서(최대 3개)
  goal: string;
  noGoal: boolean;
  plans: Plan[]; // 앞으로 1년간 세워 둔 계획
  planEtc: string; // '기타' 내용
  mbti: string; // '' = 모름
  picks: string[]; // 목차로 고른 항목 id(고른 순서)
};

export type RoadmapReport = {
  cover: CoverData;
  pages: RoadmapPage[];
  /** 입력한 학과가 시연 학과가 아닐 때 보여 줄 안내 */
  demoNotice?: string;
};

/** 체험판에서 쓰는 추천 트리의 1단계 항목 */
export function rootsFor(input: Pick<TryInput, 'categories'>): TreeNode[] {
  return buildRoots(DEMO_TREE, input.categories);
}

/** 화면에 보여 줄 학과 이름(시연 학과가 아니면 체험 예시로 표시) */
export function deptLabel(dept: string): string {
  return isDemoDept(dept) ? dept.trim() : `${DEMO_TREE.name}(체험 예시)`;
}

/**
 * 체험용 목업 리포트를 만들어요.
 * 나중에 실제 API 호출로 바꿀 수 있게 async 함수로 둬요.
 */
export async function generateReport(input: TryInput): Promise<RoadmapReport> {
  const report = buildRoadmap(DEMO_TREE, input, { deptName: deptLabel(input.dept), idPrefix: 'r-' });
  return {
    ...report,
    demoNotice: isDemoDept(input.dept)
      ? undefined
      : `체험판에서는 입력하신 학과와 상관없이 ${DEMO_TREE.name} 예시로 보여 드려요.`,
  };
}

/**
 * 고른 항목을 트리 순서로 정리해 한 항목 = 한 페이지로 구성해요.
 * 메인 페이지 샘플 리포트도 같은 함수로 만들어요.
 */
export function buildRoadmap(
  tree: DeptTree,
  input: TryInput,
  opts: { deptName: string; idPrefix: string; term?: string },
): RoadmapReport {
  const name = input.name.trim() || '학생';
  const school = input.school.trim();
  const grade = input.grade || '2학년';
  const term = opts.term ?? '2026년 2학기';
  const roots = buildRoots(tree, input.categories);
  const index = indexTree(roots);
  const ordered = inTreeOrder(roots, input.picks);

  const pages: RoadmapPage[] = ordered.map((node, i) => {
    const path = index.get(node.id)?.path ?? [];
    return {
      id: `${opts.idPrefix}${node.id}`,
      number: i + 1,
      title: node.title,
      path: path.map((p) => p.title),
      tag: path[0]?.tag ?? node.tag,
      page: node.page ?? previewPage(node),
    };
  });

  const planList = input.plans.map((p) => (p === '기타' && input.planEtc.trim() ? `기타(${input.planEtc.trim()})` : p));
  const goal = !input.noGoal && input.goal.trim() ? input.goal.trim() : '아직 없어요';
  const meta = [
    { label: '관심 우선순위', value: input.categories.map((c, i) => `${i + 1}순위 ${c}`).join(' · ') },
    { label: '목표', value: goal },
    ...(planList.length ? [{ label: '1년 계획', value: planList.join(', ') }] : []),
    ...(input.mbti ? [{ label: '성향(참고용)', value: input.mbti }] : []),
  ];

  return {
    cover: {
      title: `${name} 님의 커브 로드맵`,
      studentLine: `${school} ${opts.deptName} ${grade} · ${term}`,
      meta,
      toc: pages.map((p) => ({ number: p.number, title: p.title, depth: p.path.length })),
    },
    pages,
  };
}

/** 본문이 아직 없는 항목은 요약으로 짧은 미리보기를 만들어요 */
function previewPage(node: TreeNode): Page {
  return {
    intro: [`이 페이지에서는 ${node.summary}을(를) 다뤄요.`],
    blocks: [{ type: 'assumption', text: '체험판에서는 이 항목의 요약만 보여 드려요. 실제 서비스에서는 학교와 최신 정보를 조사해 한 페이지로 작성해요.' }],
  };
}
