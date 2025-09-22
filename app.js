const tg = window.Telegram.WebApp;
const BACKEND_URL = "https://your-railway-url.up.railway.app"; // Замените на ваш Railway URL

tg.expand();

// Функция для отправки данных на бэкенд
async function sendToBackend(data) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/data`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action: 'user_action',
                data: data,
                user: tg.initDataUnsafe.user
            })
        });
        
        const result = await response.json();
        console.log('Backend response:', result);
        return result;
    } catch (error) {
        console.error('Backend error:', error);
    }
}

// Пример использования
document.getElementById('send-btn').addEventListener('click', async () => {
    const result = await sendToBackend({message: 'Hello from Mini App!'});
    tg.showPopup({title: 'Успех!', message: 'Данные отправлены на сервер'});
});
