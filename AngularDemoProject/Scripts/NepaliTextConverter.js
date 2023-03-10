// JavaScript source code
newSession = true;
var isCurlyOn = false;
var isSquareOn = false;

function clearInput() {
    if (newSession == true || Form1.asciiArchive.value.length < 50 || confirm("Are you sure you want to clear what you typed?")) {
        Form1.asciiArchive.value = "";
        Form1.unicodeArchive.value = "";
        Form1.ascii.value = smartConverterMsg;
        Form1.unicode.value = "";
        Form1.ascii.readOnly = false;
        Form1.ascii.focus();
        newSession = false;
        Form1.htmlEncode.value = "false";
    }
}

function toggleHTML() {
    if (Form1.smartConverter_.checked) smartConverter(false); /*no smart converter for transcript editing...it can be real slow otherwise*/
    Form1.unicodeArchive.value = fts(Form1.asciiArchive.value, eval(Form1.htmlEncode.value), false);
    if (Form1.smartConverter_.checked) smartConverter(true);
    convert();
}

function asciiClick() {
    if (Form1.ascii.value == smartConverterMsg) {
        Form1.ascii.value = "";
        Form1.unicode.value = "";
    }
}

function asciiArchiveClick() {
    if (Form1.asciiArchive.value == nonsmartConverterMsg) {
        Form1.asciiArchive.value = "";
        Form1.unicodeArchive.value = "";
    }
}

function asciiBlur() {
    if (Form1.ascii.value.length == 0) Form1.ascii.value = smartConverterMsg;
}

function beginConvert(e) {
    e = (window.event) ? window.event : e;
    var keycode_;
    if (e.keyCode) keycode_ = e.keyCode;
    else keycode_ = e.charCode;
    if (keycode_ == 13) moveUp(true);
    else convert();
}
var convertButtonOn = false;

function editArchive() {
    if (Form1.asciiArchive.value.length < 800) {
        convertArchive();
        if (convertButtonOn) displayConvertButton(false);
    } else {
        if (!convertButtonOn) displayConvertButton(true);
    }
}

function displayConvertButton(display) {
    if (display) {
        Form1.convertNow.disabled = false;
        Form1.convertNow.style.border = "2px solid orange";
        convertButtonOn = true;
        alert("The text is too large for an efficient automatic conversion. Please press the 'Convert Now' button.");
    } else {
        Form1.convertNow.style.disabled = true;
        convertButtonOn = false;
    }
}
var prevAr = new Array();
var engTknsAr = new Object;
var prevArI;
var nextArI;
var currArI;
var tempStr_;
var prevLast30Chars = "";

function convertArchive() {
    if (Form1.smartConverter_.checked) smartConverter(false); /*no smart converter for transcript editing...it can be real slow otherwise*/
    prevArI = 0;
    nextArI = 0;
    var nextAr = new Array();
    var currAr = Form1.asciiArchive.value.replace(/\s*\?/g, "?").split(" ");
    engTknsAr = new Object(); /*reset when pane empty */
    var tempCurI = currAr.length;
    for (currArI = 0; currArI < tempCurI; currArI++) {
        if (currAr[currArI].indexOf("{") >= 0 && currAr[currArI].indexOf("}", currAr[currArI].indexOf("{")) < 0) {
            currAr[currArI] = currAr[currArI] + "}";
            var tempCurrArI = currArI;
            while (++tempCurrArI < currAr.length && currAr[tempCurrArI].indexOf("}") < 0) currAr[tempCurrArI] = "{" + currAr[tempCurrArI] + "}";
            currAr[tempCurrArI] = "{" + currAr[tempCurrArI]; /*last token*/
        }
        if (prevAr && prevAr[prevArI] && prevAr[prevArI] == currAr[currArI]) {
            nextAr.push(prevAr[prevArI]);
            prevArI++;
        } else if (engTknsAr[currAr[currArI]] || isAllUnicode(currAr[currArI])) /*eng or nep*/ nextAr.push(currAr[currArI]);
        else {
            tempStr_ = fts(currAr[currArI], eval(Form1.htmlEncode.value), false).replace(/\s*$/, "");
            var tmpStrT = tempStr_.split(" ");
            for (nextArI = 0; nextArI < tmpStrT.length; nextArI++) nextAr.push(tmpStrT[nextArI].replace(/\s*$/, ""));
        }
    }
    engTknsAr = new Object;
    for (nextArI = 0; nextArI < nextAr.length; nextArI++) {
        if ((nextAr[nextArI] + "").length > 1 && (nextAr[nextArI] + "").charCodeAt(0) < 2300) {
            engTknsAr[nextAr[nextArI]] = "1";
        }
    }
    prevAr = nextAr;
    Form1.unicodeArchive.value = nextAr.join(" ");
    if (Form1.smartConverter_.checked) smartConverter(true); /*go to original state*/
    var curr30Chars;
    if (Form1.asciiArchive.value.length > 30) curr30Chars = Form1.asciiArchive.value.substring(Form1.asciiArchive.value.length - 30);
    else curr30Chars = Form1.asciiArchive.value;
    if (prevLast30Chars != curr30Chars) {
        while (Form1.unicodeArchive.scrollTop < Form1.unicodeArchive.scrollHeight - Form1.unicodeArchive.offsetHeight) Form1.unicodeArchive.scrollTop = Form1.unicodeArchive.scrollTop + 10;
    }
    prevLast30Chars = curr30Chars;
}

function isAllUnicode(s) {
    var iaui;
    for (iaui = 0; iaui < s.length; iaui++) {
        if (s.charCodeAt(iaui) < 2300) return false;
    }
    return true;
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var _tr = input.createTextRange();
        _tr.collapse(true);
        _tr.moveEnd('character', selectionEnd);
        _tr.moveStart('character', selectionStart);
        _tr.select();
    }
}

function moveUp(withNewln) {
    asciiArchiveClick();
    Form1.unicodeArchive.value += Form1.unicode.value;
    if (!eval(Form1.htmlEncode.value)) Form1.asciiArchive.value += getAscii(Form1.unicode.value);
    else Form1.asciiArchive.value += Form1.ascii.value;
    if (withNewln) {
        Form1.asciiArchive.value += "\n";
        Form1.unicodeArchive.value += "\n";
    }
    Form1.ascii.value = "";
    Form1.unicode.value = "";
    while (Form1.unicodeArchive.scrollTop < Form1.unicodeArchive.scrollHeight - Form1.unicodeArchive.offsetHeight) Form1.unicodeArchive.scrollTop = Form1.unicodeArchive.scrollTop + 10;
    while (Form1.asciiArchive.style.display != "none" && Form1.asciiArchive.scrollTop < Form1.asciiArchive.scrollHeight - Form1.asciiArchive.offsetHeight) Form1.asciiArchive.scrollTop = Form1.asciiArchive.scrollTop + 10;
}

function doConvert(withNewln) { }

function convert() {
    if (Form1.ascii.value == smartConverterMsg) return;
    if ((Form1.ascii.value.length > 60 && Form1.ascii.value.charCodeAt(Form1.ascii.value.length - 1) == 32)) {
        moveUp();
        return;
    }
    var paddedAD = Form1.ascii.value;
    if (Form1.ascii.value.indexOf("{") >= 0 && Form1.ascii.value.indexOf("}", Form1.ascii.value.indexOf("{")) > 0);
    else if (Form1.ascii.value.indexOf("{") >= 0 && Form1.ascii.value.indexOf("}", Form1.ascii.value.indexOf("{")) < 0) {
        paddedAD = paddedAD + "}";
    } else if (Form1.ascii.value.indexOf("}") >= 0) {
        paddedAD = "{" + paddedAD;
    } else if (isCurlyOn) {
        paddedAD = "{" + paddedAD + "}";
    }
    if (Form1.smartConverter_.checked) {
        if (Form1.ascii.value.indexOf("[") >= 0 && Form1.ascii.value.indexOf("]", Form1.ascii.value.indexOf("[")) > 0);
        else if (Form1.ascii.value.indexOf("[") >= 0 && Form1.ascii.value.indexOf("]", Form1.ascii.value.indexOf("[")) < 0) {
            paddedAD = paddedAD + "]";
        } else if (Form1.ascii.value.indexOf("]") >= 0) {
            paddedAD = "[" + paddedAD;
        } else if (isSquareOn) {
            paddedAD = "[" + paddedAD + "]";
        }
    }
    Form1.unicode.value = fts(paddedAD, eval(Form1.htmlEncode.value), Form1.smartConverter_.checked);
    while (Form1.unicode.scrollTop < Form1.unicode.scrollHeight - Form1.unicode.offsetHeight) Form1.unicode.scrollTop = Form1.unicode.scrollTop + 10;
    while (Form1.ascii.scrollTop < Form1.ascii.scrollHeight - Form1.ascii.offsetHeight) Form1.ascii.scrollTop = Form1.ascii.scrollTop + 10;
}

function smartConverterHelp() {
    window.alert("Smart Converter is like a spelling checker. It detects commonly misspelled roman words and automatically produces the correct Nepali. \n\nPut the words you don't want it to correct inside square brackets. Example: ramro ra [raamro] ekai kura ho. ");
    return false;
}

function selectAll(txtbox) {
    if (txtbox.createTextRange) /*IE*/ {
        t = txtbox.createTextRange();
        if (t.select) t.select();
        if (t.execCommand) t.execCommand('copy');
    }
    if (txtbox.setSelectionRange) /*Mozilla*/ {
        txtbox.setSelectionRange(0, txtbox.value.length);
    } else if (txtbox.createTextRange) /*Opera 8*/ {
        var r = txtbox.createTextRange();
        r.select();
    }
    if (txtbox.focus) txtbox.focus();
}

function suggestAWord() {
    window.open('http://www.ravikandel.com.np/contactme.php' + Form1.txtSuggestAWord.value, 'suggestaword', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=200,height=150,left=526,top=382');
    Form1.txtSuggestAWord.value = "";
    return false;
}