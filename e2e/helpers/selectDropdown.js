exports.selectDropdownbyNum = function (optionNum) {
  if (optionNum){
    var options = element.all(by.tagName('option'))   
      .then(function(options){
        options[optionNum].click();
      });
  }
};