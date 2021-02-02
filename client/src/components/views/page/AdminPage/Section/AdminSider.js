import React from 'react'
import { Link, withRouter} from "react-router-dom";
import {   Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";


function AdminSider(props) {
    return (      

          <Menu style={{ width: 256, backgroundColor: "#f5f5f5" }} mode="vertical">
          {props.data &&
            props.data.map((x, index) => {
              const key = `sub${index + 1}`;
              const url = `/admin/${key}`;
              return (
                  <Menu.Item key={key}>
                    <PieChartOutlined />
                      <Link to={url}>{Object.keys(x)}</Link>
                  </Menu.Item>
              );
            })}
              <Menu.Item key='test'>
                    <PieChartOutlined />
                      <Link to='/admin/test'>Test</Link>
              </Menu.Item>
              <Menu.Item key='testadd'>
                    <PieChartOutlined />
                      <Link to='/admin/testadd'>TestAdd</Link>
              </Menu.Item>
          </Menu>
    );
}

export default React.memo(withRouter(AdminSider))
