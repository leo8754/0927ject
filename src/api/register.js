export const sendRegisterRequest = async (data) => {
  const response = await fetch('http://localhost:8080/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('註冊失敗');
  }

  return response.json();
};
