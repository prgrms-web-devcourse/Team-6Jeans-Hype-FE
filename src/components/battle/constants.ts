import { BattleStatusName, BattleStatusValue } from './types';

export const BATTLE_STATUS_NAME_LIST = ['진행중', '진행종료'] as const;

export const BATTLE_STATUS_VALUE_LIST = ['PROGRESS', 'END'] as const;

export const BATTLE_STATUS_VALUE_MAP: Record<BattleStatusName, BattleStatusValue> = {
  진행종료: 'END',
  진행중: 'PROGRESS',
};
