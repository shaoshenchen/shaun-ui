import React, { FC, ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  options: Array<string>;
  defaultValue?: string;
  onSelect?: (item: string) => void;
}

const filterOptions = (options: string[], query: string) => {
  return options.filter((item) => item.toLocaleLowerCase().includes(query))
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { defaultValue, onSelect, options, ...restProps } = props
  // value 如果值为 undefined，那么渲染的 Input 组件是非受控组件
  const [inputValue, setInputValue] = useState(defaultValue || '')
  const [suggestions, setSuggestions] = useState<Array<string>>(options)
  const [loading, setloading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSelect = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue)

  useClickOutside(componentRef, () => { setSuggestions([]) })

  useEffect(() => {
    if (debounceValue && triggerSelect.current) {
      setloading(false)
      setSuggestions(filterOptions(options, debounceValue))
    } else {
      setloading(false)
      setSuggestions([])
    }

    // -1 时可能有bug
    setHighlightIndex(-1)
  }, [debounceValue, options])

  const normalizeHighlightIndex = (idx: number) => {
    // 比限制上下边界更好的做法
    // 让 idx 在选择区域循环
    if (idx < 0) {
      idx = suggestions.length - 1
    }

    setHighlightIndex(idx % suggestions.length)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        normalizeHighlightIndex(highlightIndex - 1)
        break
      case 'ArrowDown':
        normalizeHighlightIndex(highlightIndex + 1)
        break
      case 'Enter':
        handleClick(suggestions[highlightIndex])
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 输入框显示的值，不可在此修改数据
    const val = e.target.value
    setInputValue(val)
    setloading(true)
    triggerSelect.current = true
  }

  // 点击 li 标签自动补全 Input
  const handleClick = (text: string) => {
    setInputValue(text)
    setSuggestions([])
    triggerSelect.current = false
    // 用户自定义事件
    onSelect && onSelect(text)
  }

  const showUserList = () => {
    if (loading) {
      // 加载图标
      return (
        <Icon icon='spinner' spin />
      )
    } else {
      // 渲染列表
      return (
        suggestions.map((item, idx) => {
          const classes = classNames('suggestion-item', {
            'suggestion-highlight': idx === highlightIndex
          })
          return (
            <li key={idx} onClick={() => handleClick(item)} className={classes}>
              {item}
            </li>
          )
        })
      )
    }
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      <ul>
        {showUserList()}
      </ul>
    </div>
  )
}

export default AutoComplete