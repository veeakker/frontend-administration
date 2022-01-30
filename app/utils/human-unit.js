export default function humanUnit(unitSymbol) {
  switch (unitSymbol) {
    case 'C62':
      return 'st';
    case 'KGM':
      return 'kg';
    case 'GRM':
      return 'g';
    default:
      return '?';
  }
}
