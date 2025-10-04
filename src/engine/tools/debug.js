export function renderCollisionBoxes(elements) {
  elements.forEach((element) => {
    strokeRect(
      element.position.x - 1,
      element.position.y - 1,
      element.width + 1,
      element.height + 1,
      "red",
      3
    );
  });
}
