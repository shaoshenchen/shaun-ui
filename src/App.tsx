import { useEffect, useState } from 'react';
import Progress from './components/Progress'

function App() {
  let [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
    }, 100)
  }, [count])

  return (
    <div className="App">
      <Progress percent={count} showText={true} theme='red' />
    </div>
  );
}

export default App;
