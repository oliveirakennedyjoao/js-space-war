export function renderCollisionBoxes(elements) {
  elements.forEach((element) => {
    let color = "red";
    if (element.type === "player") {
      color = "green";
    }

    if (element.type === "asteroid") {
      color = "yellow";
    }
    strokeRect(
      element.position.x - 1,
      element.position.y - 1,
      element.width + 1,
      element.height + 1,
      color,
      3
    );
  });
}
