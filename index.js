/*jshint jquery:true,browser:true,curly: false */
/* global $ */

var styles = [
    [".row", "{height: {{height}}; width: 100%;}"],
    [".flip-container", "{ width: {{width}}; height: 100%; background-color: {{bgcolour}}; perspective: 1000; float: left;}"],
    [".full", "{height: 100%; width: 100%;}"],
    [".icon", "{background-size: auto 60%; background-repeat: no-repeat; background-position: center;}"],
    [".image", "{background-size: cover;}"],
    [".flip-container:hover .flipper", "{transform: rotateY(180deg);}"],
    [".flip-container.hover .flipper", "{transform: rotateY(180deg);}"],
    [".flipper", "{transition: 0.6s; transform-style: preserve-3d; position: relative;}"],
    [".front", "{transform: rotateY(0deg); z-index: 2; backface-visibility: hidden; position: absolute; top: 0; left: 0;}"],
    [".back", "{transform: rotateY(180deg); backface-visibility: hidden; position: absolute; top: 0; left: 0;}"]
];

function bBoard (opts) {
    if (!opts.size) throw new Error('No size given!');
    else if (!opts.selector) throw new Error('No selector given');
    else if (opts.content.length !== opts.size[0] * opts.size[1]) throw new Error('Size is bigger than content given');
    if (!opts.bgcolour) opts.bgcolour = "#fff";

    var style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);

    styles.forEach(function(style) {
        style[1] = style[1].replace('{{width}}', 100/opts.size[0] + "%");
        style[1] = style[1].replace('{{height}}', 100/opts.size[1] + "%");
        style[1] = style[1].replace('{{bgcolour}}', opts.bgcolour);
        insertStyle(opts.selector + " " + style[0], style[1]);
    });

    var html = '<div class="row">';
    for (var i = 0; i < opts.content.length; i++) {
        if (opts.content[i].front.img && opts.content[i].front.icon) throw new Error("Can't have icon and img [front]");
        if (opts.content[i].back.img && opts.content[i].back.icon) throw new Error("Can't have icon and img [back]");

        var tmpBlock = block;
        ['front', 'back'].forEach(function(s){
            var style = "";
            if (opts.content[i][s].bgcolour) style = style + "background-color: " + opts.content[i][s].bgcolour + ";";

            if (opts.content[i][s].img) {
                style = style + "background-image: url('" + opts.content[i][s].img + "');";
                tmpBlock = tmpBlock.replace('{{' + s + 'Class}}', 'img');
            }

            if (opts.content[i][s].icon) {
                style = style + "background-image: url('" + opts.content[i][s].icon + "');";
                tmpBlock = tmpBlock.replace('{{' + s + 'Class}}', 'icon');
            }

            if (opts.content[i][s].text) {
                tmpBlock = tmpBlock.replace(
                    '{{' + s + 'Text}}',
                    '<div class="full" style="display: table;"><div class="full" style="vertical-align: middle; text-align: center;  font-size: 7vw; display: table-cell; vertical-align: middle;">' + opts.content[i][s].text + '</div></div>');
            } else tmpBlock = tmpBlock.replace('{{' + s + 'Text}}', '');

            tmpBlock = tmpBlock.replace('{{' + s + 'Style}}', style);
        });

        html = html + tmpBlock;
        if (i % opts.size[0]) html = html + '</div>';
        if (i === opts.content.length - 1) html = html + '<div class="row">';
    }

    $(opts.selector).html(html);
}

function insertStyle(sel, rule) {
    var stylesheet = document.styleSheets[0];
    if (stylesheet.insertRule) stylesheet.insertRule(sel + rule, stylesheet.cssRules.length);
    else if (stylesheet.addRule) stylesheet.addRule(sel, rule, -1);
}

/** Assets **/
var block = '<div class="flip-container" ontouchstart="this.classList.toggle(\'hover\');"><div class="full flipper"><div style="{{frontStyle}}" class="{{frontClass}} full front">{{frontText}}</div><div style="{{backStyle}}" class="{{backClass}} full back">{{backText}}</div></div></div>';