module.exports.getRandomNumber = (range) => {
  if (range) {
    return Math.floor(Math.random() * range + 1);
  }
  return Math.random();
}
