export const makeTransparentImage = (w = 32) => {
  const colors = ["lightGray", "white"];
  const c = document.createElement("canvas");
  c.width = w;
  c.height = w;
  const g = c.getContext("2d");
  g.fillStyle = colors[0];
  g.fillRect(0, 0, w / 2, w / 2);
  g.fillRect(w / 2, w / 2, w / 2, w / 2);
  g.fillStyle = colors[1];
  g.fillRect(w / 2, 0, w / 2, w / 2);
  g.fillRect(0, w / 2, w / 2, w / 2);
  const url = c.toDataURL("image/png");
  return url;
};
