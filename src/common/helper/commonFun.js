
//function to get the sorted contacts list
export const sortContacts = (list) => {
    let sortedList = list.slice().sort((a, b) => a?.displayName?.localeCompare(b?.displayName));
    return sortedList;
}