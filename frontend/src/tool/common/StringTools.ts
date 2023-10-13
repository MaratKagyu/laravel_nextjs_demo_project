
export const fullNameToTwoLetters = (name: string|null) => {
  if (!name) {
    return '?';
  }
  const words = name.split(' ');
  return (
    (words[0]?.substring(0, 1).toUpperCase() || '')
    + (words[1]?.substring(0, 1).toUpperCase() || '')
  )
}
