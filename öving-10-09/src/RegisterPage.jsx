const handleRegister = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), 
  });
  const data = await response.json();
  if (response.ok) {
    
    console.log('Registrerad!');
  } else {
   
    console.error(data.message);
  }
};
