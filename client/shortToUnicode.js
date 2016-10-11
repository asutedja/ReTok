import {emojify} from 'react-emojione';


const	shortToUnicode = (str, emojis, username) => {
	const userEmojis = {}
	emojis.forEach((owned) => {
		userEmojis[owned.emoji] = true;
	})
	var start;
	var escapeIndex = str.indexOf(':');
	const name = str.slice(0,escapeIndex+1);
	const string = str.slice(escapeIndex + 1);
	console.log('name', name);
	var shortToUniOne = (string) => {
		if(string.includes(':')) {
			var startIndex = string.indexOf(':');
			//console.log(startIndex)
			for (var i = startIndex+1; i< string.length; i++) {
				if(string.charAt(i) === ':') {
					if (startIndex !== 0) {
						start = string.slice(0,startIndex);
					}
					var end = string.slice(i + 1) || '';
					var short = string.slice(startIndex, i+1);
					if (!!userEmojis[short]  || !name.includes(username)) {
						var emoji = emojify(short, {output: 'unicode'})
						console.log('short code', short);
						console.log('end' + end)
						return  start + emoji + shortToUniOne(end);
					} else {
						return start + short + shortToUniOne(end);
					}
				}
			}
		}
		return string;		
	}

	return name + shortToUniOne(string);
}

export default shortToUnicode;