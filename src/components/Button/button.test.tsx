import { render, fireEvent, screen } from '@testing-library/react'
import Button, { ButtonType } from './button'


const defaultProps = {
  // 创建一个被监控的模拟函数
  onClick: jest.fn()
}

const testProps = {
  btnType: 'primary' as ButtonType,
  className: 'klass'
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn()
}
describe('Button component', () => {
  it('render a default button', () => {
    render(<Button {...defaultProps}>Nice</Button>)
    // const element = view.getByText('Nice') as HTMLButtonElement
    const element = screen.getByText('Nice') as HTMLButtonElement

    // 是否成功渲染
    expect(element).toBeInTheDocument()
    // 非 disabled 状态
    expect(element.disabled).toBeFalsy()
    // 类检查
    expect(element).toHaveClass('btn')
    // 按钮事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })


  it('render the component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>)
    // const element = wrapper.getByText('Nice')
    const element = screen.getByText('Nice')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary klass')
  })


  it('render a link when btnType equals link and href is provided', () => {
    render(<Button btnType='link' href='http://dummyurl'>Link</Button>)
    // const element = wrapper.getByText('Link')
    const element = screen.getByText('Link')

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })


  it('render a disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>)
    // const element = wrapper.getByText('Nice') as HTMLButtonElement
    const element = screen.getByText('Nice') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})