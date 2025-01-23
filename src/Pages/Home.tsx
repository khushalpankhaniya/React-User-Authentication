import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  interface User {
    _id: string;
    name: string;
    email: string;
  }
  const [userInfo, setuserInfo] = useState<User | null>();

  useEffect(() => {
    fetch('http://localhost:3000/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('userInformation', JSON.stringify(data.userData));
        setuserInfo(JSON.parse(localStorage.getItem('userInformation') ?? '{}'));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInformation');
    navigate('/login');
  };

  return (
    <div>
      <p>User ID: {userInfo?.name}</p>
      <p>Username: {userInfo?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
