export default function circle(x, y, r) {
  // prettier-ignore
  return (
    "M " + x + " " + y + " " +
    "m " + -r + ",0 " +
    "a " + r + "," + r + " 0 1,0 " + (r * 2) + ",0 " +
    "a " + r + "," + r + " 0 1,0 " + (-r * 2) +
    ",0 Z"
  );
}
