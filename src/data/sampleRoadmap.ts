import { buildRoadmap, type TryInput } from '../lib/generateReport';
import { bizTree, buildRoots } from './trees';

/**
 * 메인 페이지 샘플 리포트
 * 가상 인물: 김하린(21세), 커브대학교(가상) 경영학과 2학년
 * 마케팅과 공기업 사이에서 고민 중이라, 두 진로를 각각 한두 단계씩 파고 돈 벌기 가지를 더했어요.
 */
export const sampleInput: TryInput = {
  name: '김하린',
  age: '21',
  school: '커브대학교',
  dept: '경영학과',
  grade: '2학년',
  categories: ['진로/취업', '돈 벌기', '인간관계'],
  goal: '마케팅과 공기업 사이에서 고민 중',
  noGoal: false,
  plans: ['재학', '알바'],
  planEtc: '',
  mbti: 'ENFP',
  picks: ['biz-marketing', 'biz-mkt-contest', 'biz-contest-story', 'biz-public', 'biz-ncs', 'c-money', 'c-money-scholar'],
};

export const sampleRoadmap = buildRoadmap(bizTree, sampleInput, { deptName: '경영학과', idPrefix: 's-' });

/** "이렇게 골랐어요"에서 보여 줄 1단계 추천 */
export const sampleRoots = buildRoots(bizTree, sampleInput.categories);
