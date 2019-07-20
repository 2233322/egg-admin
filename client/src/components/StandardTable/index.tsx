import React from 'react';
import { Table, Pagination } from 'antd';
import { ColumnProps } from 'antd/lib/table';

export interface StandardTableProps<T> {
  columns: StandardTableColumnProps[];
  dataSource: TableListItem[];
  loading: boolean;
}

export interface StandardTableColumnProps extends ColumnProps<TableListItem> {
  needTotal?: boolean;
  total?: number;
}

export interface TableListItem {
  id: number;
  key?: number;
  disabled?: boolean;
  href?: string;
  avatar?: string;
  name?: string;
  title?: string;
  owner?: string;
  desc?: string;
  callNo?: number;
  status?: number;
  updatedAt?: Date;
  createdAt?: Date;
  progress?: number;
}

const StandardTable: React.FC<StandardTableProps<TableListItem>>  = props => {
  const { ...rest } = props;
  return (
    <div>
      <Table
        {...rest}
        pagination={false}
      />
      <Pagination

      />
    </div>
  )
}

export default StandardTable;
