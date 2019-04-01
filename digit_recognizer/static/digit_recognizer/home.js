
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const painting = document.getElementById('paint');
const paint_style = getComputedStyle(painting);
canvas.width = 200
canvas.height = 200

const mouse = { x: 0, y: 0 };

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 8;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'white';

canvas.addEventListener('mousedown', function(e) {
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);
  canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', onPaint, false);
}, false);

const onPaint = () => {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};

const printCanvas = () => {
  let img = document.createElement("img");
  img.src = canvas.toDataURL();

  let src = document.getElementById("header");
  src.appendChild(img);
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let place = document.getElementById('display_response')
  place.innerText = '';
}

const sendImage = () => {
  fetch('http://localhost:8000/recognizer/upload/', { // Your POST endpoint
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'image': canvas.toDataURL('image/jpeg', 0.2) })
  })
    .then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      let place = document.getElementById('display_response')
      // let text = document.createTextNode(JSON.stringify(response.number));
      place.innerText = '';
      place.innerText = JSON.stringify(response.number);
    })
    .catch(error => console.error('Error:', error));
}