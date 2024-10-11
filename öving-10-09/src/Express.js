const bcrypt = require('bcrypt');

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Användaren finns redan' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.json({ message: 'Registrerad framgångsrikt!' });
});

