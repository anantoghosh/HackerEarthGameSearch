import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { filterData, sortData } from '../actions';
import { sortDirection, gameItemKey } from '../actions/actionTypes';
import Table from '../components/Table';
import { State } from '../Constants';

const mapStateToProps = (state: { loadReducer: State }) => {
  return {
    items: state.loadReducer.processedData
  };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
  return {
    onFilter: (query: string) => {
      dispatch(filterData(query));
    },
    onSort: (by: gameItemKey, direction: sortDirection) => {
      dispatch(sortData(by, direction));
    }
  };
};

const ItemsListData = connect(mapStateToProps, mapDispatchToProps)(Table);

export default ItemsListData;
