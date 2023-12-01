export function formatPath(str) {
  var newString = str.toLowerCase();
  newString = newString.replace(/ć|č/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z").replace(/:|-|,/g, "").replace(/ /g, "-").replace(".", "").replace("„", "").replace("“", "").replace(/„/g, "").replace(/“/g, "");
  return newString;
}
