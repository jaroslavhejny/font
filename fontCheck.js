let pixi = new PIXI.Application({
    width: 720,
    height: 450,
    antialias: true,
    clearBeforeRender: true,
    backgroundColor: 0x000000
})

let text;

let textCounte;


document.body.appendChild(pixi.view);


let name = "";
let bgImg = "";
let sampleText = "";
let textToShow = "";
let defaultSize = $("#fontSize").val();
let result = ""

PIXI.ticker.shared.start();
$(function () {
    $('#okFont').on('click', function () {
        if ($('#font').val() === "") {
            return alert("No font!!!!")
        }
        let loader = new PIXI.loaders.Loader();
        name = $('#font').val();
        // let xml = $('#fontXML').val();
        // let png = $('#fontPNG').val();
        loader.add(`font/${name}.png`).add(`font/${name}.xml`);
        loader.load(font)
    });

    $('#okText').on('click', function () {
        text.text = "";
        text.text = numberWithSpaces($('#text').val(), false);
        text2.text = numberWithSpaces($('#from').val());
        text3.text = decimalPlaces($('#text').val())
        text4.text = decimalPlaces($('#from').val())
    })

    $('#okFS').on('click', function () {
        defaultSize = $("#fontSize").val() * 1;
        text.font["size"] = $('#fontSize').val() * 1;
        text.text = "";
        text.text = numberWithSpaces($('#text').val(), false);
        text2.font["size"] = $('#fontSize').val() * 1;
        text2.text = "";
        text2.text = numberWithSpaces($('#from').val());
        text3.font["size"] = $('#fontSize').val() * 1;
        text3.text = "";
        text3.text = decimalPlaces($('#text').val());

        text4.font["size"] = $('#fontSize').val() * 1;
        text4.text = "";
        text4.text = decimalPlaces($('#from').val());

    })

    $('#okColor').on('click', function () {
        pixi.renderer.backgroundColor = parseInt($("#color").val().replace("#", "0x"));
    })


    $('#reload').on('click', function () {
        pixi.stage.removeChildren();
        pixi.stage.addChild(text);
    })

    $('#start').on('click', function () {

        let startNum = $("#from").val() * 1;
        let endNum = $("#to").val() * 1;
        let time = $("#time").val() * 1;
        let obj = {
            val: startNum
        };

        createjs.Tween.get(obj).to({
            val: endNum
        }, time).addEventListener("change", (event) => {
            text2.text = numberWithSpaces(Math.round(obj.val));
            text4.text = decimalPlaces(Math.round(obj.val).toString());

        })
    })
});


function font() {
    $("#okFS").removeAttr("disabled");
    $("#okColor").removeAttr("disabled");
    $("#okText").removeAttr("disabled");
    $("#start").removeAttr("disabled");
    $("#okFont").addClass("btn-success")
    text = new PIXI.extras.BitmapText(numberWithSpaces($('#text').val(), false), {
        font: `${defaultSize}px ${name}`
    });
    //console.log(pixi)
    text.position.x = 360;
    text.position.y = 56;
    text.anchor.set(0.5, 0.5);

    text3 = new PIXI.extras.BitmapText($('#text').val(), {
        font: `${defaultSize}px ${name}`
    });
    //console.log(pixi)
    text3.position.x = 360;
    text3.position.y = 169;
    text3.anchor.set(0.5, 0.5);

    text2 = new PIXI.extras.BitmapText(numberWithSpaces($('#from').val()), {
        font: `${defaultSize}px ${name}`
    });

    text4 = new PIXI.extras.BitmapText($('#from').val(), {
        font: `${defaultSize}px ${name}`
    });
    //console.log(pixi)
    text2.position.x = 360;
    text2.position.y = 282;
    text2.anchor.set(0.5, 0.5);

    text4.position.x = 360;
    text4.position.y = 395;
    text4.anchor.set(0.5, 0.5);
    text3.text = decimalPlaces(text3.text)
    text4.text = decimalPlaces(text4.text)

    pixi.stage.removeChildren();
    pixi.stage.addChild(text);
    pixi.stage.addChild(text2);
    pixi.stage.addChild(text3);
    pixi.stage.addChild(text4);
}


function numberWithSpaces(number, round = true) {
    if (round) {
        return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    } else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

}

function decimalPlaces(text) {
    let teext = text;
    switch (teext.length) {
        case 1:
            teext = "00" + teext
            break;
        case 2:
            teext = "0" + teext
            break;
        default:
            teext
    }


    let a = teext.substring(0, teext.length - 2)
    let b = teext.substring(teext.length - 2, teext.length);

    return numberWithSpaces(a) + changeToSmall(b);
}

function changeToSmall(string) {
    let jedna = string.substring(0, 1);
    let dva = string.substring(1, 2);
    result = change(jedna) + change(dva);
    return result;
}

function change(a) {
    b = parseInt(a);
    switch (b) {
        case 0:
            return "a"
            break;
        case 1:
            return "b"
            break;
        case 2:
            return "c"
            break;
        case 3:
            return "d"
            break;
        case 4:
            return "e"
            break;
        case 5:
            return "f"
            break;
        case 6:
            return "g"
            break;
        case 7:
            return "h"
        case 8:
            return "i"
        case 9:
            return "j"
            break;
    }
}