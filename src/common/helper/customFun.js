
//function to get the first letter in uppercase
export const getUcFirstLetter = (string) => {
    if(string && string !== ''){
        return string?.charAt(0)?.toUpperCase();
    } else {
        return string;
    }
}

//function to get the string with its first letter in uppercase
export const getUcFirstLetterString = (string) => {
    if(string && string !== ''){
        return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    } else {
        return string;
    }
}