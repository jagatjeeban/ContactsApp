
//function to get the first letter in uppercase
export const getUcFirstLetter = (string) => {
    if(string !== undefined && string !== ''){
        return string?.charAt(0)?.toUpperCase();
    } else {
        return string;
    }
}