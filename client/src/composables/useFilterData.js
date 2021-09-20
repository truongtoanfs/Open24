/* lọc qua mảng của các đối tượng or mảng của chuỗi khi gõ input
    + originArray: là mảng gốc để lọc
    + arrayOfKeywordFilter: mảng chứa các key trong đối tưỢng cần filter
        nếu arrayOfKeywordFilter = '' thì originArray là mảng của chuỗi
*/

import removeAccents from '../composables/useRemoveAccents';
export default function filterData(typedInput, originArray, arrayOfKeywordFilter = '') {
    if(typedInput.length === 0) {
        return originArray;
    }
    const inputText = removeAccents(typedInput).toUpperCase();
    return originArray.filter(item => {
        if(arrayOfKeywordFilter === '') {
            const itemText = removeAccents(item).toUpperCase();
            return itemText.includes(inputText);
        } else {
            let isItemSelected = false;
            for(let i = 0; i < arrayOfKeywordFilter.length; i++) {
                const valueOfKeyword = item[arrayOfKeywordFilter[i]];
                const keyName = removeAccents(valueOfKeyword).toUpperCase();
                if(keyName.includes(inputText)) {
                    isItemSelected = true;
                    break;
                }
            }
            return isItemSelected;
        }
    })
}