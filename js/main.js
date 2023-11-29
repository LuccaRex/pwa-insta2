// Verifica se o navegador suporta a API de câmera
if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
  alert('API de câmera não suportada no seu navegador!');
}

let capturedImage;

// Função para capturar a foto
async function capturePhoto() {
  const video = document.createElement('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  document.body.appendChild(video);
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      capturedImage = canvas.toDataURL('image/png');
      stream.getTracks().forEach(track => track.stop());
      document.body.removeChild(video);
      resolve(capturedImage);
    };
  });
}

// Adiciona evento ao botão de captura
document.getElementById('captureButton').addEventListener('click', async () => {
  capturedImage = await capturePhoto();
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = `<img src="${capturedImage}" alt="Captured Photo">`;
});

// Adiciona evento ao botão de postagem
document.getElementById('postButton').addEventListener('click', () => {
  if (capturedImage) {
    // Aqui você pode implementar a lógica para postar a imagem, por exemplo, usando uma API ou serviço de backend.
    // Neste exemplo, exibiremos um alerta com o caminho da imagem.
    alert('Imagem postada: ' + capturedImage);
  } else {
    alert('Capture uma foto antes de postar!');
  }
});