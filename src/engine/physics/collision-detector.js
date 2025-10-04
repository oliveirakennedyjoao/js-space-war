export function isColliding(element1, element2) {
  return (
    element1.position.x < element2.position.x + element2.width &&
    element1.position.x + element1.width > element2.position.x &&
    element1.position.y < element2.position.y + element2.height &&
    element1.position.y + element1.height > element2.position.y
  );
}

export function detectCollisions(
  elementGroup1,
  elementGroup2,
  collisionCallback
) {
  for (let i = 0; i < elementGroup1.length; i++) {
    for (let j = 0; j < elementGroup2.length; j++) {
      if (isColliding(elementGroup1[i], elementGroup2[j])) {
        collisionCallback(elementGroup1[i], elementGroup2[j]);
      }
    }
  }
}
