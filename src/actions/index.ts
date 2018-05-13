import { ActionType, Action, sortDirection, gameItemKey } from './actionTypes';
import { GameItem } from '../Constants';
import { Dispatch } from 'redux';

export const requestData = (): Action => {
  return {
    type: ActionType.loadDataRequest
  };
};

export const dataReceived = (data: Array<GameItem>): Action => {
  return {
    type: ActionType.loadDataSuccess,
    data
  };
};

export const filterData = (query: string): Action => {
  return {
    type: ActionType.filterData,
    query
  };
};

export const sortData = (by: gameItemKey, direction: sortDirection): Action => {
  return {
    type: ActionType.sortData,
    by,
    direction
  };
};

export const dataFailed = (): Action => {
  return {
    type: ActionType.loadDataFailure
  };
};

export function loadData() {
  return function<S>(dispatch: Dispatch<S>) {
    dispatch(requestData());

    return fetch('http://starlord.hackerearth.com/gamesext')
      .then(
        response => response.json(),
        error => {
          dispatch(dataFailed());
        }
      )
      .then(json => {
        dispatch(dataReceived(json));
      });
  };
}
