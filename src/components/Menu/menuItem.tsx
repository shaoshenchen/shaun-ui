import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  keyy: string;
  disabled?: boolean;
  className?: string;
  // style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    keyy,
    disabled,
    className,
    children,
  } = props
  // 订阅，当 MenuContext.Provider 的 context value 更新时触发重渲染
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'menu-disabled': disabled,
    'menu-active': context.key === keyy
  })
  const handleClick = () => {
    // 给 li 设置 menu-active 类
    if (context.onSelect && !disabled && (typeof keyy === 'string')) {
      context.onSelect(keyy)
    }
    console.log(context.key, keyy);

    // 给 menu-submenu 设置 menu-active 类
    // if ()
  }

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {}

MenuItem.displayName = 'MenuItem'

export default MenuItem