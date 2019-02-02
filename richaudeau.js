/*!
 * Richaudeau: Lisibility Utility (c) Denis Rebaud 2018 onwards
 * https://github.com/drebaud/richaudeau.js
 * License GNU General Public License v3.0
 */
(function(name, context, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(definition)
    else context[name] = definition()
})('richaudeau', this, function() {

    // Add css classes in the page.
    var style = document.createElement("style");

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")

    style.appendChild(document.createTextNode("p.richaudeau::first-letter,li.richaudeau::first-letter,span.richaudeau {font-weight: 600}"));
    document.head.appendChild(style);

    // Preparing regular expressions.
    var reNumbers = /(\d)\s+(\d|\w)/gim;
    var reAttribute = /(\w=")([^"]+)(")/gim;
    var reSemicolon = /;/gm;
    var reProtectedSemicolon = /²²/gm;
    var reColon = /:/gm;
    var reProtectedColon = /³³/gm;
    var reDot = /\./gm;
    var reProtectedDot = /²³/gm;
    var reEndOfSentence = /([\?!:…\.]|\s;|&nbsp;;|\.\.\.|&hellip;)([\s\n\r]|&nbsp;)*(<[^>]+>|<\/span>)*(\s|&nbsp;)+(\w)/gim;
    var reStartParenthesis = /([\(\[])(\s|&nbsp;)*(\w|\d)(.+\s[^\)])/gim;
    var reTypoSigns = /\s+([:;!\?])/gim;

    /**
     * Apply Richaudeau's rules and some typographic enhancements.
     * @param {String} tag Tag name concerned
     */
    function applyRichaudeau(tag) {
        var x = document.getElementsByTagName(tag);
        var i;

        for (i = 0; i < x.length; i++) {
            var oldHTML = x[i].innerHTML;

            // Modify the font weight of the first character.
            x[i].className += " richaudeau";

            // In attributes, protect characters concerned by Richaudeau's rules.
            var newHTML = oldHTML.replace(reAttribute, function(matches, p1, p2, p3) {
                p2 = p2.replace(reDot, "²³");
                p2 = p2.replace(reSemicolon, "²²");
                return p1 + p2.replace(reColon, "³³") + p3;
            });

            newHTML = newHTML.replace(
                reEndOfSentence,
                '$1$2$3&#8194;<span class="richaudeau">$5</span>'
            );
            newHTML = newHTML.replace(reStartParenthesis, '$1$2<span class="richaudeau">$3</span>$4');

            // Add unbreackable space between numbers.
            newHTML = newHTML.replace(reNumbers, "$1&nbsp;$2");

            // Add unbreackable space before some typographic signs.
            newHTML = newHTML.replace(reTypoSigns, "&nbsp;$1");

            // Restore protected characters in attributes.
            newHTML = newHTML.replace(reProtectedColon, ":");
            newHTML = newHTML.replace(reProtectedSemicolon, ";");
            newHTML = newHTML.replace(reProtectedDot, ".");

            // Update the page if something has changed.
            if (oldHTML !== newHTML) {
                x[i].innerHTML = newHTML;
            }
        }
    }

    window.onload = function() {
        // Modify some tags.
        applyRichaudeau('P');
        applyRichaudeau('LI');
        applyRichaudeau('TD');
    };
});
