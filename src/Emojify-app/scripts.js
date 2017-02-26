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
            returnString = wordSplit.join(" " + replace.toString() + " ")
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
            if (i != 0) {
                word += ' ';
            }
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
            } else if (/\!/.test(letterSplit[i])) {
                word += ':exclamation:';
            } else {
                //add warning eventually
            }
        }
    }
    return word;
}

function GetTip() {
    var tips = [
        '<p class="rainbowTip">Totally tubular, dude.</p>',
        '( ͡° ͜ʖ ͡°)',
        'More features coming soon. Probably.',
        'Any emojis typed into the input area will be carried over.',
        'Made with <a href="https://www.polymer-project.org/1.0/">polymer!</a>',
        '\"Cap\" will put the \"Replace spaces\" text on either end.',
        'Help I\'m trapped inside a web app',
        'At least 80% mobile compatible!',
        'Great for parties!',
        'You can put anything you want in the \"Replace spaces\" field.',
        'Anything put in the \"Replace spaces\" field will be added as-is, no conversion.',
        'Any bug reports are greatly appreciated.',
        'Stop playing Hanzo. Please.',
        'Memes are the life-blood of Discord.',
        'Got a suggestion? Feel free to put it on my github.',
        '<p class="white">Ooh, I\'m a secret! You found me! Good work, Wow! NICE!</p>',
        'Characters like apostrophes or colons don\'t have emoji counterparts, so they won\'t show up.'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}
