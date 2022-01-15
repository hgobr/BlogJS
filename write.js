const form = document.querySelector('form#composer');

const getBase64fromFile = function (file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
};

const sendArticle = function (jsonArticle) {
  fetch('http://localhost:3000/articles', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(jsonArticle),
  })
    .then((response) => response.json())
    .then(console.info())
    .catch(() => console.error('Une erreur est survenue:'));
};

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const { title, content, image, author } = ev.target.elements;

  getBase64fromFile(image.files[0], function (base64img) {
    const jsonArticle = {
      title: title.value,
      content: content.value,
      image: base64img,
      author: author.value,
    };
    sendArticle(jsonArticle);
  });
});
