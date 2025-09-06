import { Display } from "./image/display.js";
import { Color } from "./element/color.js";
import { DisplayProperties } from "./image/properties.js";
import { Size } from "./element/size.js";
import { Array2Text } from "./array/array2text.js";
import { File2Array } from "./array/file2array.js";
import { Pixel2CheckBox } from "./pixel/pixel2checkbox.js";

$(document).ready(function() {

    let pixel2CheckBox;
    let openFileArray;

    let checkBoxArray;
    let displayProperties;
    let display;
    let textArray;

    window.setDisplayColor = function() {

        if (typeof displayProperties === 'undefined') {
            return;
        }

        if($('html').attr('data-bs-theme') === 'light') {
            displayProperties.ForeGround = new Color('#6a6a6a');
            displayProperties.BackGround = new Color('#ffffff');
        } else {
            displayProperties.ForeGround = new Color('#cacaca');
            displayProperties.BackGround = new Color('#000000');
        }
    }

    $('#buttonReset').on('click', function() {
        window.closeMessage();
        pixel2CheckBox = null;
        openFileArray = null;

        $('#pixelSelection').addClass('d-none');
        $('#pixelX, #pixelY').prop('disabled', false);

        $('#buttonReset').prop('disabled', true);
        $('#buttonStart').prop('disabled', false);

        $('#menuDownload').attr('href', '#');
        $('#menuDownload').addClass('disabled', true);
        $('#menuOpen').removeClass('disabled', true);
        $('#menuClear').addClass('disabled', true);

        $('#pixelSelection').addClass('d-none');
        $('#pixelImage').addClass('d-none');
        $('#pixelArrayBox').addClass('d-none');
    });

    $('#buttonStart').on('click', function() {

        $('#buttonReset').prop('disabled', false);
        $('#buttonStart').prop('disabled', true);

        $('#menuDownload').removeClass('disabled', true);
        $('#menuOpen').addClass('disabled', true);
        $('#menuClear').removeClass('disabled', true);

        $('#pixelX, #pixelY').prop('disabled', true);

        var $container = $('#pixelSelection');
        $container.empty();

        try
        {
            pixel2CheckBox = new Pixel2CheckBox(
                $('#pixelX').val() || $('#pixelX').attr('placeholder'),
                $('#pixelY').val() || $('#pixelY').attr('placeholder')
            );
            
            pixel2CheckBox
                .createCheckBoxArray(openFileArray)
                .forEach(row => $container.append(row));
        }
        catch(exception)
        {
            window.showMessage(exception);

            setTimeout(function() {
                $('#buttonReset').trigger('click');
            }, 5000);

            return;
        }
            
        displayProperties = new DisplayProperties(new Size(pixel2CheckBox.PixelX, pixel2CheckBox.PixelY));
        displayProperties.Border = 1;
        displayProperties.Pixel = 8;

        window.setDisplayColor();

        display = new Display(displayProperties);
        display.Canvas = $('#pixelCanvas')[0];

        textArray = new Array2Text();

        $('#pixelSelection input[type="checkbox"]')
            .first()
            .prop('checked', true)
            .trigger('click');

        $('#pixelSelection').removeClass('d-none');
        $('#pixelImage').removeClass('d-none');
        $('#pixelArrayBox').removeClass('d-none');

        $('#menuDownload')
            .attr('download', 'oled-image.array')
            .show();
    });

    $('input[name="radioRadix"]').on('change', function() {
        $('#pixelSelection input[type="checkbox"]').first().prop('checked', true).trigger('click');
    });

    $('#pixelSelection').on('click', function(event) {
        if ($(event.target).is(':checkbox')) {

            checkBoxArray = getCheckBoxArray(pixel2CheckBox.PixelX, pixel2CheckBox.PixelY);
            display.createImage(checkBoxArray);

            $('#pixelCanvas').show();

            
            const url = URL.createObjectURL(
                new File(
                    [ textArray.createString(checkBoxArray) ],
                    'oled-image.array',
                    { type: 'text/plain' }
            ));

            textArray.Notation = $("input[name='radioRadix']:checked").val();

            $('#pixelArray').val('');
            $('#pixelArray').val(textArray.createString(checkBoxArray));

            $('#pixelMemorySize').text(textArray.Bytes + ' Bytes');
            $('#menuDownload').attr('href', url);
        }
    });

    $('#designModeSelection').on('change', function() {
        window.setDisplayColor();

        $('#pixelSelection input[type="checkbox"]').first().prop('checked', true).trigger('click');
    });

    $('#openModalButtonRead').on('click', function() {
        try
        {
            new File2Array($('#inputImageFile')[0].files[0])
                .getArray()
                .then(arr => {
                    openFileArray = arr;
                    $('#buttonStart').trigger('click');
                });
        }
        catch(exception)
        {
            window.showMessage(exception);

            setTimeout(function() {
                $('#buttonReset').trigger('click');
            }, 5000);

            return;
        }
    });
});