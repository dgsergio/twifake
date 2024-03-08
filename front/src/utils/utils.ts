export function timePassed(date: string): string {
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ];
  const passedDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - passedDate.getTime();
  const dayPassed = timeDifference / (1000 * 3600 * 24);

  if (currentDate.getFullYear() !== passedDate.getFullYear())
    return `${passedDate.getDate()} ${
      months[passedDate.getMonth()]
    } ${passedDate.getFullYear()}`;
  else if (timeDifference / 1000 < 60)
    return `${Math.round(timeDifference / 1000)}s`;
  else if (dayPassed * 24 < 1)
    return `${Math.round(timeDifference / (1000 * 60))}min`;
  else if (dayPassed < 1) return `${Math.round(dayPassed * 24)}h`;
  else return `${passedDate.getDate()} ${months[passedDate.getMonth()]}`;
}
