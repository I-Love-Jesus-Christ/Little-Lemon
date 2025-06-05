

/*
const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}
*/

const fetchAPI = function(current_date) {
    let result = [];
    let random_number = Math.random();

    for(let i = 17; i <= 23; i++) {
        if(random_number < 0.5) {
            result.push(i + ':00');
        }
        else  {
            result.push(i + ':30');
        }
        random_number = Math.random();
    }
    return result;
};
const submitAPI = function(formData) {
    return true;
};

export {fetchAPI, submitAPI}