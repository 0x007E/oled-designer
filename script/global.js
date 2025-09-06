window.onbeforeunload = function() {
    return "Are you sure you want to leave? Unsaved changes may be lost.";
};

$(function() {

    function setBootstrapThemeByPreference() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    }

    setBootstrapThemeByPreference();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setBootstrapThemeByPreference);

    let year = new Date().getFullYear();
    $('#copyrightDate').html('&copy; ' + year);

    // Standard Radix for Array
    $('#radioRadix16').prop( "checked", true);

    $('#buttonReset').prop('disabled', true);

    $('#menuDownload').addClass('disabled', true);
    $('#menuClear').addClass('disabled', true);

    $('#menuClear').on('click', function() {
        if(!($('#menuClear').hasClass('disabled'))) {
            $('#buttonReset').trigger('click');
        }
    });

    $('#pixelCopySymbol').on('click', function() {
        const textToCopy = $('#pixelArray').val();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                window.showMessage('Copied text to clipboard!', 'success');
            }).catch(err => {
                window.showMessage('Error while copying text to clipboard!');
            });
        } else {
            // Fallback for older browsers
            const $temp = $('<textarea>');
            $('body').append($temp);
            $temp.val(textToCopy).select();
            document.execCommand('copy');
            $temp.remove();
            window.showMessage('Copied text to clipboard!', 'success');
        }

        setTimeout(function() {
            $('#messageClose').trigger('click');
        }, 5000);
    });


    window.getCheckBoxArray = function(width, height) {
        let checkboxArray = [];

        for (let y = 0; y < height; y++) {

            let row = [];

            for (let x = 0; x < width; x++) {

                let checked = $('#pixel' + x + '_' + y).is(':checked');

                row.push(checked);
            }
            checkboxArray.push(row);
        }
        return checkboxArray;
    }

});