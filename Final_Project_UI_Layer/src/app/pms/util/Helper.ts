export default class Helper {

    static getDateAsString(date: Date) {

        let strDate: string = '';
        if (date) {
            strDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        }

        return strDate;
    }
}