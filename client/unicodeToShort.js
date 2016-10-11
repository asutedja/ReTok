const db = '../node_modules/react-emojione/lib/data'

const unicodeToShort = (string) => {

	const checkForUnicode = (s) =>  {
    return /[^\u0000-\u00ff]/.test(s);
	}

	if(checkForUnicode(string)) {
		var unicode = '';
		for (var i = 0, n = str.length; i < n; i++) {
		   if (str.charCodeAt( i ) > 255) {
		   	unicode.concat(str.charAt(i));
		   } 
		   if(unicode.length > 0 && !(str.charCodeAt(i+1) > 255) ) {
		   	
		   }
	}

}