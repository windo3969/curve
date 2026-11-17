import type { Category } from '../tryForm';
import { bizTree } from './biz';
import { commonBranch } from './common';
import { csTree } from './cs';
import { meTree } from './me';
import type { DeptTree, TreeNode } from './types';

export { bizTree, csTree, meTree };
export type { Block, DeptTree, Page, TreeNode } from './types';

/** 체험판은 입력한 학과와 상관없이 기계공학과 트리로 시연해요. */
export const DEMO_TREE: DeptTree = meTree;

/** 1단계 추천: 진로 후보 + 학생이 고른 관심 카테고리(진로/취업 제외)의 공통 가지 */
export function buildRoots(tree: DeptTree, categories: Category[]): TreeNode[] {
  const common = categories
    .filter((c): c is Exclude<Category, '진로/취업'> => c !== '진로/취업')
    .map((c) => commonBranch(c, tree.id));
  return [...tree.careers, ...common];
}

/** 항목 id → { 항목, 상위 경로 } */
export function indexTree(roots: TreeNode[]) {
  const map = new Map<string, { node: TreeNode; path: TreeNode[] }>();
  const walk = (nodes: TreeNode[], path: TreeNode[]) => {
    for (const n of nodes) {
      map.set(n.id, { node: n, path });
      if (n.children) walk(n.children, [...path, n]);
    }
  };
  walk(roots, []);
  return map;
}

/** 이 항목 아래의 모든 하위 항목 id */
export function descendantIds(node: TreeNode): string[] {
  return (node.children ?? []).flatMap((c) => [c.id, ...descendantIds(c)]);
}

/** 고른 항목을 트리 순서(깊이 우선)로 정렬 */
export function inTreeOrder(roots: TreeNode[], picked: string[]): TreeNode[] {
  const set = new Set(picked);
  const out: TreeNode[] = [];
  const walk = (nodes: TreeNode[]) => {
    for (const n of nodes) {
      if (!set.has(n.id)) continue;
      out.push(n);
      if (n.children) walk(n.children);
    }
  };
  walk(roots);
  return out;
}

/** 목표 입력값과 가까운 항목인지 */
export function matchesGoal(node: TreeNode, goal: string): boolean {
  const g = goal.trim().toLowerCase();
  if (!g || !node.goalKeywords) return false;
  return node.goalKeywords.some((k) => g.includes(k.toLowerCase()));
}

/** 입력한 학과가 시연 학과(기계공학과)와 같은지 */
export function isDemoDept(dept: string): boolean {
  return dept.replace(/\s/g, '').includes('기계');
}
