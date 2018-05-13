import { GameItem } from '../Constants';

export enum ActionType {
  loadDataRequest = 'LOAD_DATA_REQUEST',
  loadDataSuccess = 'LOAD_DATA_SUCCESS',
  loadDataFailure = 'LOAD_DATA_FAILURE',
  filterData = 'FILTER_DATA',
  sortData = 'SORT_DATA'
}

interface ActionRequest {
  type: ActionType.loadDataRequest | ActionType.loadDataFailure;
}

interface ActionData {
  type: ActionType.loadDataSuccess;
  data: Array<GameItem>;
}

interface ActionFilter {
  type: ActionType.filterData;
  query: string;
}

interface ActionSort {
  type: ActionType.sortData;
  by: gameItemKey;
  direction: sortDirection;
}

export type sortDirection = 'ASC' | 'DESC';
export type gameItemKey = keyof GameItem;
export type Action = ActionRequest | ActionData | ActionFilter | ActionSort;
