import { useState } from 'react';
import Transition from './components/Transition'
import Button from './components/Button'

function App() {
  const [trigger, setTrigger] = useState(false)

  return (
    <div className="App">
      <Button btnType='primary' onClick={() => setTrigger(!trigger)}>primary</Button>

      <Transition
        in={trigger}
        timeout={300}
        animation='zoom-in-bottom'
      >
        <h1>Hello</h1>
      </Transition>
    </div>
  );
}

export default App;
