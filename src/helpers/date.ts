export function dateFormat(date: Date | undefined): string {
    if (date == undefined) return "";
    
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    const yyyy = date.getFullYear().toString();

    dd.length == 1 ? dd = "0" + dd : dd;
    mm.length == 1 ? mm = "0" + mm : mm;

    return dd + "/" + mm + "/" + yyyy;
    }