$(function() {

    window.showMessage = function (text, style = 'danger') {
        $('#messageText').text(text);
        $('#displayMessage').removeClass('d-none');
        $('#displayAlert').addClass('alert-' + style);
    }

    window.closeMessage = function(style= 'danger') {
        $('#messageText').text('');
        $('#displayMessage').addClass('d-none');
        $('#displayAlert').removeClass('alert-' + style);
        $('#displayAlert').removeClass('alert-danger');
        $('#displayAlert').removeClass('alert-sucess');
    }

    $('#messageClose').on('click', closeMessage);
});