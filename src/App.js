import './App.css';
import Users from './components/users';
import Layout from './components/layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Users/>
      </Layout>
    </div>
  );
}

export default App;
