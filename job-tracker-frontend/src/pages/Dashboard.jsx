import { useEffect } from 'react';
import { testBackend } from '../services/testApi';

function Dashboard() {
  useEffect(() => {
    testBackend()
      .then((data) => {
        console.log('Backend response:', data);
      })
      .catch((error) => {
        console.error('Backend error:', error);
      });
  }, []);

  return <h1>Dashboard Page</h1>;
}

export default Dashboard;
