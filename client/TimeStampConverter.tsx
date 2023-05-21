export function timeConverter(timestamp: number) {
  let date = new Date(timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let d = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  return d + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}
