export const renderPosition = (position: number): string => {
  if (position === 1) {
    return `${position}st`;
  }
  if (position === 2) {
    return `${position}nd`;
  }
  if (position === 3) {
    return `${position}rd`;
  }
  if (position > 3 && position <= 20) {
    return `${position}th`;
  }
  if (position === 21) {
    return `${position}st`;
  }
  if (position === 22) {
    return `${position}nd`;
  }
  if (position === 23) {
    return `${position}rd`;
  }
  if (position > 23 && position <= 30) {
    return `${position}th`;
  }

  return `${position}`;
};
