const form = document.querySelector('#message-form');
const statusLine = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusLine.textContent = 'Отправка...';
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Не удалось отправить сообщение');
    statusLine.textContent = result.message;
    form.reset();
  } catch (error) {
    statusLine.textContent = 'Сервер недоступен. Запустите backend по инструкции в README.';
    console.error(error);
  }
});
