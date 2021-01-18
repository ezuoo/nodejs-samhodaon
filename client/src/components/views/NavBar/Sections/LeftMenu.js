import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">메인</a>
    </Menu.Item>
    <Menu.Item key="cases">
      <a href="/cases">시공사례</a>
    </Menu.Item>
    {/* 
    <Menu.Item key="qna">
      <a href="/">견적문의</a>
    </Menu.Item>

    <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
     */}
  </Menu>
  )
}

export default withRouter(LeftMenu)