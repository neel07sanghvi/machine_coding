const app = document.getElementById('app');
const diameter = 200;
const radius = diameter / 2;
const circles = [];

app.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const left = x - radius;
  const top = y - radius;

  const circle = document.createElement('div');

  circle.style.position = 'absolute'
  circle.style.backgroundColor = getRandomRgbColor()
  circle.style.height = `${diameter}px`
  circle.style.width = `${diameter}px`
  circle.style.borderRadius = '50%'
  circle.style.left = `${left}px`;
  circle.style.top = `${top}px`;
  circle.style.transition = 'background-color 0.3s ease';
  circle.style.border = '3px solid rgba(255, 255, 255, 0.3)';
  circle.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';

  if (circles.length) {
    circles.forEach(c => {
      const dx = Math.abs(c.x - x)
      const dy = Math.abs(c.y - y)

      const distance = Math.sqrt((dx * dx) + (dy * dy))

      if (distance < diameter) {
        // collision
        c.node.style.backgroundColor = getRandomRgbColor()
      }
      else if (distance === diameter) {
        // touch
      }
      else {
        // no collision
      }
    })
  }

  circles.push({
    x,
    y,
    node: circle
  })

  app.appendChild(circle)
})

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}   