export const format = (date: string) => {
  const timePassed = Math.floor((Date.now() - parseInt(date)) / 1000);
  // console.log(timePassed);
  if (timePassed < 60) {
    return timePassed + "сек назад";
  } else if (timePassed < 60 * 60) {
    return Math.floor(timePassed / 60) + "м назад";
  } else if (timePassed < 60 * 60 * 60) {
    return Math.floor(timePassed / 60 / 60);
  } else if (timePassed < 60 * 3600 * 24) {
    return Math.floor(timePassed / 60 / 3600 / 24);
  }
};
