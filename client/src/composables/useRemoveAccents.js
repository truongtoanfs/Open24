export default function removeAccents(str) {
   if(!str) {
      return '';
   } else {
      return str.normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .replace(/đ/g, 'd').replace(/Đ/g, 'D');
   }
}

/* PP: Chuẩn hóa các chuỗi Unicode về dạng NFD
 --> nhằm tách dấu và chữ cái ra, sau đó xóa hết các kí tự thể hiện dấu
    links: https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 */