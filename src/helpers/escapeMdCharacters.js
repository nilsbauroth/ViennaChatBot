// '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|',
// '{', '}', '.', '!' must be escaped with the preceding character '\'.
// https://core.telegram.org/bots/api#markdownv2-style

export const escapeMdCharacters = (mdString) =>
  typeof mdString === 'string'
    ? mdString
        .replaceAll('.', '\\.')
        .replaceAll('-', '\\-')
        .replaceAll(',', '\\,')
        .replaceAll('!', '\\!')
    : mdString
