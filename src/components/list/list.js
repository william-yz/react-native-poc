import React from 'react'

import { List } from 'antd-mobile'
const { Item } = List

const CustomList = ({title, datas, onRowClick}) => {
  return (
    <List renderHeader={() => title}>
      {datas.map((data, index) => {
        return (
          <Item
            key={index}
            onClick={onRowClick.bind(null, data.id)}
            extra={data.extra}
            >
            {data.label}
          </Item>
        )
      })}
    </List>
  )
}

export default CustomList