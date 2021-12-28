import React from "react";
import { ThemeProps } from '../Icon/icon'
import assert from '../../hooks/useAssert'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    showText,
    styles,
    theme,
  } = props

  assert(0 <= percent && percent <= 100, 'Percent should limit in [0, 100]')

  return (
    <div className='progress-bar' style={styles}>
      <div className="progress-bar-outer">
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          <span className="inner-text">
            {showText ? `${percent}%` : ``}
          </span>
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  showText: true,
  theme: 'blue'
}

export default Progress