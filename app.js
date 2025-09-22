// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;

// Отображаем информацию о пользователе
if (user) {
    document.getElementById('user-info').innerHTML = `
        👤 ${user.first_name} ${user.last_name || ''}
        <br>@${user.username || 'без username'}
    `;
}

// Обработчики событий
document.getElementById('btn-primary').addEventListener('click', function() {
    showMessage('Вы нажали основную кнопку!');
});

document.getElementById('btn-secondary').addEventListener('click', function() {
    showMessage('Вторая кнопка сработала!');
});

document.getElementById('submit-btn').addEventListener('click', function() {
    const inputText = document.getElementById('text-input').value;
    if (inputText) {
        showMessage(`Вы ввели: "${inputText}"`);
        // Можно отправить данные обратно в бота
        tg.sendData(JSON.stringify({action: 'text_input', text: inputText}));
    } else {
        showMessage('Пожалуйста, введите текст!');
    }
});

document.getElementById('tg-back').addEventListener('click', function() {
    tg.BackButton.onClick(); // или tg.close()
});

document.getElementById('tg-close').addEventListener('click', function() {
    tg.close();
});

// Функция для отображения сообщений
function showMessage(message) {
    const output = document.getElementById('output');
    output.innerHTML = `<p>📢 ${message}</p>`;
    
    // Вибрация (если поддерживается)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Обработка данных от Telegram
tg.onEvent('viewportChanged', (data) => {
    console.log('Viewport changed:', data);
});

// Показываем кнопку "Назад" если нужно
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.close();
});