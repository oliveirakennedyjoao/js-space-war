export function isColliding(element1, element2) {
  return (
    element1.position.x < element2.position.x + element2.width &&
    element1.position.x + element1.width > element2.position.x &&
    element1.position.y < element2.position.y + element2.height &&
    element1.position.y + element1.height > element2.position.y
  );
}

export function detectCollisions(elements, collisionCallback) {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      if (isColliding(elements[i], elements[j])) {
        collisionCallback(elements[i], elements[j]);
      }
    }
  }
}
