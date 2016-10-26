/**
* FileName:WholeNumber.js
* CreatedBy: Vamsee
* Date :27-08-2016
* Purpose : function to generate whole number
*/
/**
Function to generate Random Whole Number
@param {Number} number - Pass a number within it the function generate randomWholeNumber
@return {Number} - Returns a whole Number
*/
function randomWholeNumber(number) {
    return Math.floor(Math.random() * number);
}
/*taking input from the user*/
var number = prompt("pass a number u want to generate whole number to the function");
/*calling the method and writing the result to the document*/
document.write(randomWholeNumber(number));
