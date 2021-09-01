export const formatDate = {
    getDate: function(string) {
        if(!string) {
            return '';
        } else {
            const date = new Date(string);
            const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
            return `${day}/${month}/${year}`;
        }
    },
    getDateWithTime: function(string) {
        if(!string) {
            return '';
        } else {
            const date = new Date(string);
            const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
            const [hour, minutes] = [date.getHours(), date.getMinutes()];
            return `${day}/${month}/${year} ${hour}:${minutes}`;
        }
    }
}