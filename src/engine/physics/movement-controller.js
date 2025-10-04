export function linearMovement(element, velocityX, velocityY, deltaTime) {
  element.position.x += velocityX * deltaTime;
  element.position.y += velocityY * deltaTime;
}

export function sinusoidalMovement(
  element,
  verticalSpeed,
  amplitude = 3,
  frequency = 50,
  deltaTime
) {
  element.position.y += verticalSpeed * deltaTime;
  element.position.x += Math.sin(element.position.y / frequency) * amplitude;
}

export function circularMovement(
  element,
  centerX,
  centerY,
  radius,
  speed,
  deltaTime
) {
  const time = (element.time || 0) + speed * deltaTime;
  element.position.x = centerX + Math.cos(time) * radius;
  element.position.y = centerY + Math.sin(time) * radius;
  element.time = time;
}

export function zigzagMovement(
  element,
  verticalSpeed,
  horizontalSpeed,
  switchDistance,
  deltaTime
) {
  element.position.y += verticalSpeed * deltaTime;
  element.position.x += (element.direction || 1) * horizontalSpeed * deltaTime;

  element.zigzagDistance =
    (element.zigzagDistance || 0) + Math.abs(horizontalSpeed * deltaTime);
  if (element.zigzagDistance >= switchDistance) {
    element.direction = (element.direction || 1) * -1;
    element.zigzagDistance = 0;
  }
}

export function parabolicMovement(
  element,
  initialVelocityX,
  initialVelocityY,
  gravity,
  deltaTime
) {
  element.velocityY =
    (element.velocityY || initialVelocityY) + gravity * deltaTime;
  element.position.x += initialVelocityX * deltaTime;
  element.position.y += element.velocityY * deltaTime;
}

export function followTargetMovement(element, target, speed, deltaTime) {
  const dx = target.position.x - element.position.x;
  const dy = target.position.y - element.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    const normalizedX = dx / distance;
    const normalizedY = dy / distance;

    element.position.x += normalizedX * speed * deltaTime;
    element.position.y += normalizedY * speed * deltaTime;
  }
}

export function orbitMovement(element, center, radius, speed, deltaTime) {
  const angle = (element.orbitAngle || 0) + speed * deltaTime;
  element.position.x = center.x + Math.cos(angle) * radius;
  element.position.y = center.y + Math.sin(angle) * radius;
  element.orbitAngle = angle;
}

// Pesquisar sobre movimento em curva de Bézier
