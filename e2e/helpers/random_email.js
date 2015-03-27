exports.getRandomEmail = function () {
    var strValues = "abcdefghijk123456789";
    var strEmail = "";
    for (var i = 0; i < strValues.length; i++) {
        strEmail = strEmail + strValues.charAt(Math.round(strValues.length * Math.random()));
    }
    return strEmail + "@mymail.test";
};