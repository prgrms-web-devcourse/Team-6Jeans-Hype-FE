import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_LIST } from './constants';

export type BattleStatusName = typeof BATTLE_STATUS_NAME_LIST[number];

export type BattleStatusValue = typeof BATTLE_STATUS_VALUE_LIST[number];
