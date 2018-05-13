import { Action, ActionType } from '../actions/actionTypes';
import { State } from '../Constants';
import { combineReducers } from 'redux';

const loadReducer = (
  state: State = {
    isFetching: false,
    data: null,
    processedData: null
  },
  action: Action
): State => {
  switch (action.type) {
    case ActionType.loadDataRequest:
      return {
        ...state,
        isFetching: true
      };
    case ActionType.loadDataSuccess:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        processedData: action.data
      };
    case ActionType.filterData:
      let data = () => {
        if (state.data === null) {
          return null;
        }

        console.log(action.query);
        if (action.query.trim() === '') {
          console.log('quick');
          return state.data;
        }

        return state.data.filter(
          item => {
            return String(item.title).toLowerCase().indexOf(action.query.toLowerCase()) !== -1;
          }
        );

      };
      return {
        ...state,
        processedData: data()
      };

    case ActionType.sortData:
      let sortData = () => {
        if (state.processedData === null) {
          return null;
        }

        return state.processedData.slice().sort((f, s) => {
          let c;
          if (isNaN(Number(f[action.by]))) {
            c = String(f[action.by]).localeCompare(String(s[action.by]));
          } else {
            c = Number(f[action.by]) - Number(s[action.by]);
          }

          return action.direction === 'ASC' ? c : -c;
        });
      };
      return {
        ...state,
        processedData: sortData()
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  loadReducer
});

export default rootReducer;
