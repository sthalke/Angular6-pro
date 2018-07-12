export default class Utils {
    static isObjectEmpty(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
            return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

    static searchRecords(data: any, searchText: string) { 
        const filteredResultSet = data.filter(function (row) {
            return Object.values(row).join('').toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
        return filteredResultSet;
    }
// tslint:disable-next-line:eofline
}