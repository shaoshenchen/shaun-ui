import Menu from './components/Menu'

function App() {
  return (
    <div className="App">
      <Menu defaultSelectedKey='1-0'>
        <Menu.Item keyy='0-0'>0-0</Menu.Item>
        <Menu.Item keyy='1-0'>1-0</Menu.Item>
        <Menu.Sub title='2-0' keyy='2-0'>
          <Menu.Item keyy='2-1'>2-1</Menu.Item>
          <Menu.Item keyy='2-2'>2-2</Menu.Item>
        </Menu.Sub>
        <Menu.Item keyy='3-0'>3-0</Menu.Item>
      </Menu>
    </div>
  );
}

export default App;
