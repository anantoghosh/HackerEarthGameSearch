import * as React from 'react';
import { debounce } from 'ts-debounce';
import { GameItem } from '../Constants';
import { gameItemKey, sortDirection } from '../actions/actionTypes';

import 'react-virtualized/styles.css';
import { Table as VTable, Column, AutoSizer } from 'react-virtualized';

interface Props {
  items: Array<GameItem>;
  onSort(by: gameItemKey, direction: sortDirection): void;
  onFilter(query: string): void;
}

interface State {
  search: string;
  sortBy: gameItemKey | null;
  sortDirection: sortDirection | null;
}

class Table extends React.Component<Props, State> {
  filter = debounce(this.props.onFilter, 1000);
  autoCompleteData: null | JSX.Element = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      search: '',
      sortBy: null,
      sortDirection: null
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.sort = this.sort.bind(this);
  }

  changeHandler(event: React.FormEvent<HTMLInputElement>) {
    let search: string = event.currentTarget.value;

    this.setState({
      search
    });

    this.filter(search);
  }

  sort(by: gameItemKey) {
    let direction: sortDirection = 'ASC';
    if (this.state.sortBy === by) {
      if (this.state.sortDirection === 'ASC') {
        direction = 'DESC';
      }
    }

    this.props.onSort(by, direction);

    this.setState({
      sortBy: by,
      sortDirection: direction
    });
  }

  createDataList() {
    if (!this.props.items) {
      return null;
    }

    let dataList = [];
    for (const [i, row] of this.props.items.entries()) {
      if (i > 1 && this.props.items[i - 1].title !== row.title) {
        dataList.push(<option value={row.title} />);
      }
    }

    return <datalist id="titles">{dataList}</datalist>;
  }

  render(): JSX.Element {
    if (!this.autoCompleteData) {
      this.autoCompleteData = this.createDataList();
    }

    return (
      <div style={{ height: '85vh', width: '98.5vw' }}>
        <input
          className="input"
          placeholder="Search"
          type="text"
          onChange={this.changeHandler}
          value={this.state.search}
          list="titles"
        />

        {this.autoCompleteData}

        {!this.props.items && <div>Loading...</div>}

        {this.props.items && (
          <AutoSizer>
            {({ height, width }) => (
              <VTable
                width={width}
                height={height}
                headerHeight={20}
                rowHeight={30}
                rowCount={this.props.items.length}
                rowGetter={({ index }) => this.props.items[index]}
                sort={({ sortBy }) => this.sort(sortBy as gameItemKey)}
              >
                <Column label="Title" dataKey="title" width={400} />
                <Column width={200} label="Platform" dataKey="platform" />
                <Column width={200} label="Score" dataKey="score" />
                <Column width={200} label="Genre" dataKey="genre" />
                <Column
                  width={100}
                  label="Editors Choice"
                  dataKey="editors_choice"
                />
                <Column
                  width={200}
                  label="Release Year"
                  dataKey="release_year"
                />
              </VTable>
            )}
          </AutoSizer>
        )}
      </div>
    );
  }
}

export default Table;
