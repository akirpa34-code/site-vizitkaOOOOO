const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(express.json({ limit: '20kb' }));
app.use(express.static(frontendPath));

const profile = {
  fullName: 'Дерябин Владислав Дмитриевич',
  group: '4618',
  university: 'ГУАП',
  direction: '09.03.03 Прикладная информатика',
  program: 'Прикладной искусственный интеллект и наука о данных',
  skills: ['Python', 'несколько библиотек Python', 'основы ООП'],
  interests: ['программирование', 'искусственный интеллект', 'наука о данных']
};

app.get('/api/profile', (_req, res) => {
  res.json(profile);
});

app.post('/api/feedback', (req, res) => {
  const sender = String(req.body.sender || '').trim();
  const message = String(req.body.message || '').trim();

  if (!sender || !message) {
    return res.status(400).json({ error: 'Заполните имя и сообщение.' });
  }
  if (sender.length > 80 || message.length > 1000) {
    return res.status(400).json({ error: 'Слишком длинное сообщение.' });
  }

  // Демонстрационный endpoint: сообщение выводится в консоль сервера.
  // Для постоянного хранения подключите базу данных.
  console.log(`[Сообщение от ${sender}] ${message}`);
  return res.status(201).json({ message: 'Спасибо! Сообщение принято демо-сервером.' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сайт запущен: http://localhost:${PORT}`);
});
