import React, { PureComponent } from "react";
import "./data-table.css";
import { Table } from "antd";

export default class DataTable extends PureComponent {
  render() {
    const {
      tableData,
      tableHeader,
      totalCount,
      onChange,
      loading
    } = this.props;
    return (
      <Table
        onChange={onChange}
        pagination={{
          total: +totalCount,
          pageSize: 3
        }}
        rowKey="id"
        loading={loading}
        dataSource={tableData}
        columns={tableHeader}
      />
    );
  }
}
