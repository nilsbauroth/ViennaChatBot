// '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|',
// '{', '}', '.', '!' must be escaped with the preceding character '\'.
// https://core.telegram.org/bots/api#markdownv2-style

export const escapeMdCharacters = (mdString) =>
  mdString.replaceAll('.', '\\.').replaceAll('-', '\\-')
