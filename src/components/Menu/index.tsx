import React from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>,
  Sub: React.FC<SubMenuProps>,
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.Sub = SubMenu

export default TransMenu