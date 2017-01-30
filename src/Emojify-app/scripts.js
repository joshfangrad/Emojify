var emojiReg = new RegExp(/(:[\w0-9]+:)/ig);


function Emojify(text, replace, cap) {
    if (text) {
        var wordSplit = text.split(' ');
        //seperate exsisting emojis into sub-arrays
        for (var i in wordSplit) {
            var found = wordSplit[i].match(emojiReg);
            if (found && (wordSplit[i].length != found[0].length)) {
                var wordReplace = wordSplit[i].split(emojiReg);
                wordSplit[i] = wordReplace;
            }
        }
        //convert text and stuff to regional indicators
        for (var i in wordSplit) {
            if (Array.isArray(wordSplit[i])) {
                var replace;
                for (var j in wordSplit[i]) {
                    wordSplit[i][j] = Convert(wordSplit[i][j]);
                }
                wordSplit[i] = wordSplit[i].join('');
            } else {
                wordSplit[i] = Convert(wordSplit[i]);
            }
        }
        var returnString = "";
        //add spaces, or space replace characters
        if (replace.length > 0) {
            returnString = wordSplit.join(replace.toString())
        } else {
            returnString = wordSplit.join('    ')
        }
        if (cap && replace) {
            returnString = " " + replace.toString() + " " + returnString + " " + replace.toString() + " ";
        }
        return returnString;
    } else {
        return;
    }
}
//function for converting letters to regional indicators, among other things
function Convert(word) {
    var numText = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:']
    if (word && (!word.match(emojiReg))) {
        var letterSplit = word.split('');
        word = '';
        for (var i in letterSplit) {
            word += ' ';
            if (/[a-z]/i.test(letterSplit[i])) {
                word += ':regional_indicator_' + letterSplit[i].toLowerCase() + ':';
            } else if (/[0-9]/.test(letterSplit[i])) {
                word += numText[parseInt(letterSplit[i])];
            } else if (/#/.test(letterSplit[i])) {
                word += ':hash:';
            } else if (/\*/.test(letterSplit[i])) {
                word += ':asterisk:';
            } else if (/\?/.test(letterSplit[i])) {
                word += ':question:';
            } else if (/\+/.test(letterSplit[i])) {
                word += ':heavy_plus_sign:';
            } else if (/\-/.test(letterSplit[i])) {
                word += ':heavy_minus_sign:';
            } else if (/\</.test(letterSplit[i])) {
                word += ':arrow_backward:';
            } else if (/\>/.test(letterSplit[i])) {
                word += ':arrow_forward:';
            } else if (/\^/.test(letterSplit[i])) {
                word += ':arrow_up_small:';
            } else if (/\$/.test(letterSplit[i])) {
                word += ':heavy_dollar_sign:';
            } else {
                //invalid chars become Xs
                word += ':x:';
            }
        }
    }
    return word;
}

function GetTip() {
    var tips = [
        'Tip: Any emojis typed into the input area will be carried over.',
        'Made with polymer!',
        'Tip: \"Cap\" will put the \"Replace spaces\" text on either end.',
        'Tip: Any characters that aren\'t emojis will evaluate to :x:.',
        'Tip: Help I\'m trapped inside a web app',
        'Tip: these emojis will probably only work with discord.',
        'At least 80% mobile compatible!',
        'Great for parties!',
        'Thinking of tips is hard.',
        'Tip: You can put anything you want in the \"Replace spaces\" field.'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}
