import axios from 'axios';

export const login = async () => {
  const response = await axios.post('/api/login');  // הכניס את המידע שלך פה
  document.cookie = `userToken=${response.data.token}; path=/;`;  // קוקי שמוזן בלקוח
};
