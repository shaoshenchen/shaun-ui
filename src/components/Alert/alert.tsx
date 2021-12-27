import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Button from '../Button/button'

type AlertType = 'success' | 'info' | 'warning' | 'error'

export interface BaseAlertProps {
  className?: string;
  alertType: AlertType;
  // alertTitle?: string; 暂时删去，用 alertType 代替
  // alertContent?: string; 暂时删去，用 children 代替
  closable?: boolean;
  onClose?: React.MouseEventHandler;
  children?: React.ReactNode;
}

// 将放置 Alert 组件的容器插到 body 元素末尾
const div: HTMLElement = document.createElement('div')
div.classList.add('alert-container')
document.body.append(div)

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    // alertTitle,
    // alertContent,
    closable,
    onClose,
    children,
  } = props
  // alert, alert-success, alert-info
  // alert-warning, alert-error
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'closable': closable
  })

  const getAlertTitle = () => {
    switch (alertType) {
      case 'success':
        return 'Success Tips'
      case 'info':
        return 'Informational Notes'
      case 'warning':
        return 'Warning'
      case 'error':
        return 'Error'
    }
  }

  // 关闭事件
  const handleClose = (e: React.MouseEvent) => {
    // 删除视觉顶层元素
    div.lastElementChild?.remove()
    // 触发用户自定义 onClose 事件
    onClose && onClose(e)
  }

  // 键盘事件
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        div.lastElementChild?.remove()
      }
    })
  })

  return ReactDOM.createPortal(
    (
      <div className={classes}>
        <div className='alert-message'>
          <div className="alert-title">
            {getAlertTitle()}
          </div>
          <div className="alert-content">
            {children}
          </div>
        </div>
        {/* 右上角有无关闭按钮 */}
        {
          closable ? (
            <div className='alert-close'>
              <Button btnType='text' onClick={(e) => handleClose(e)}>x</Button>
            </div>
          ) : (<></>)
        }
      </div>

    ), div)

}

export default Alert