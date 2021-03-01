jQuery.validator.addMethod("alphanumeric", function(value, element) 
{
return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "Please use letters and numbers only, do not use space."); 

jQuery.validator.addMethod("noSpace", function(value, element) { 
return value.indexOf(" ") < 0; 
}, "Please do not use Space.");

jQuery.validator.addMethod("dangerousCharacterNotAllow", function(value, element) {
	return this.optional(element) ||  /^[A-Za-z\d=#$@%!?_*,:;' ...-]+$/.test(value);
}, "Special characters are not allowed.");

jQuery.validator.addMethod("specificForTextarea", function(value, element) {
	return this.optional(element) ||  /^[A-Za-z\d=#$@%!?_*,:;\n	'\t" ...-]+$/.test(value);
}, "Special characters are not allowed.");

jQuery.validator.addMethod("alphanumericspecial", function(value, element) {
	return this.optional(element) ||  /^[A-Za-z\d=#$@%!_*...-]+$/.test(value);
}, "Please use letters numbers and special characters.");

/* jQuery.validator.addMethod("lettersonly", function(value, element) 
{
	  return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
}, "Please use letters only, do not use numbers and special characters.");    */

//allow letters, number, spaces, special character
jQuery.validator.addMethod("lettersonly", function(value, element) 
{
	 // return this.optional(element) || /^[a-zA-Z\s\d=#$@%!_*...-]+$/.test(value);
	 return true;
}, "Some of the special character not allow.");   

jQuery.validator.addMethod("lettersonlywithoutspace", function(value, element) 
{
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "Please use letters only, do not use space and numbers.");  

jQuery.validator.addMethod('filesize', function(value, element, param) {
   return this.optional(element) || (element.files[0].size <= param) 
});   

jQuery.validator.addMethod("timeCompare",
   function (value, element, params) {
   var val = new Date('1/1/1991' + ' ' + value);       
   var par = new Date('1/1/1991' + ' ' + $(params).val());
   if (!/Invalid|NaN/.test(new Date(val))) {
		   return new Date(val) > new Date(par);
   }
		
   return isNaN(val) && isNaN(par)
	   || (Number(val) > Number(par));
		console.log("bbbbb");
}, 'End Time must be greater than Start Time.'); 

$.validator.addMethod('positiveNumber',
    function (value) { 
   		 return Number(value) > 0;
}, 'Enter a positive number.');

$.validator.addMethod("noDecimal", function(value, element) {
    return !(value % 1);
}, "Decimal numbers not allow.");   

jQuery.validator.addMethod("negativePositiveNumberNotAllow", function(value, element) {
	return this.optional(element) ||  /^[0-9]+$/.test(value);
}, "Enter a positive number only.");
	
jQuery.validator.addMethod("emailWithExt", function(value, element, param) {
    return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
},'Please enter a valid email address.');

$.validator.addMethod('latCoord', function(value, element) {
	console.log(this.optional(element))
  return this.optional(element) ||
	value.length >= 4 && /^(?=.)-?((8[0-5]?)|([0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(value);
  }, 'Your Latitude format has error.')
  
  $.validator.addMethod('longCoord', function(value, element) {
	console.log(this.optional(element))
  return this.optional(element) ||
	value.length >= 4 && /^(?=.)-?((0?[8-9][0-9])|180|([0-1]?[0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(value);
  }, 'Your Longitude format has error.')	