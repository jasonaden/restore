export function tokenize (str = "", ignorePattern = "") {
    return str
      .replace( new RegExp("([^A-Z])([A-Z])", "g"), '$1 $2' )
      .replace( new RegExp("([^A-Za-z0-9 " + ignorePattern + "]*)([A-Za-z0-9 " + ignorePattern + "]*)", "g"), ' $2' )
      .replace( new RegExp("[ ]+", "g"), ' ' )
      .trim();
  }