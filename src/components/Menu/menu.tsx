import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'


type MenuMode = 'horizontial' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

// Menu 组件参数类型
export interface MenuProps {
  defaultSelectedKey?: string;
  className?: string;
  mode?: MenuMode;
  defaultOpenedSubMenu?: string[];
  onSelect?: SelectCallback;
}

interface IMenuContext {
  key?: string;
  mode?: MenuMode;
  defaultOpenedSubMenu?: string[];
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultSelectedKey,
    className,
    mode,
    defaultOpenedSubMenu,
    onSelect,
    children,
  } = props
  // 管理 menu-item 的 menu-active 状态
  const [menuItemActive, setMenuItemActive] = useState(defaultSelectedKey)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  const handleClick = (key: string) => {
    setMenuItemActive(key)
    // 用户自定义回调
    onSelect && onSelect(key)
  }
  // 传递的 context
  const passedContext: IMenuContext = {
    key: menuItemActive,
    mode,
    defaultOpenedSubMenu,
    onSelect: handleClick,
  }
  // 将拿到的 children 重新渲染
  const renderChildren = () => {
    return React.Children.map(children, (item, idx) => {
      // childElem - child 元素
      const childElem = item as React.FunctionComponentElement<MenuItemProps>
      // type - child 组件内容
      const { displayName } = childElem.type
      if (displayName === 'MenuItem' || 'SubMenu') {
        // 将新 props 和原元素浅层合并
        return React.cloneElement(childElem, {
          key: idx.toString()
        })
        // return (
        //   <childElem.type key={}></childElem.type>
        // )
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  // defaultSelectedKey: '1-0',
  mode: 'horizontial',
  defaultOpenedSubMenu: [],
}

export default Menu