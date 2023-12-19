function downloadSvg(apiKey, iconId) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.flaticon.com/v3/icons/${iconId}?key=${apiKey}`);
  xhr.responseType = 'json';
  xhr.onload = () => {
    // Если запрос был успешным, загружаем иконку
    if (xhr.status === 200) {
      const icon = xhr.response.data.icon;

      // Получаем изображение иконки в формате BASE64
      const imageData = icon.svg.data;

      // Сохраняем изображение в файл
      const blob = new Blob([imageData], { type: 'image/svg+xml' });
      const fileName = icon.name + '.svg';
      const saveAs = window.saveAs || ((file, name) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
      });
      saveAs(blob, fileName);
    }
  };
  xhr.send();
}

// Пример использования
const apikey = document.querySelector('.apikey');
const query = document.querySelector('.query');
if (localStorage.getItem('flaticonApiKey')) {
  apikey.value = localStorage.getItem('flaticonApiKey');
}
document.querySelector('.submit').addEventListener('click', () => {
  const flaticonApiKey = apikey.value;
  if (flaticonApiKey) {
    localStorage.setItem('flaticonApiKey', flaticonApiKey);
  }
  const searchQuery = query.value;
  downloadSvg(flaticonApiKey, searchQuery);
})

