$(function() {

    $('#menuSettings').on('click', function() {

        let $html = $('html');
        let isLight = $html.attr('data-bs-theme') === 'light';

        $('#designModeSelection').prop('checked', isLight);

        $('#settingsModal').each(function(){
            var modal = new bootstrap.Modal(this);
            modal.show();
        });
    });

    $('#designModeSelection').on('change', function() {
        let $html = $('html');

        if(this.checked) {
            $html.attr('data-bs-theme', 'light');
        } else {
            $html.attr('data-bs-theme', 'dark');
        }

        window.setDisplayColor();
    });

    $('#menuOpen').on('click', function() {

        $('#openModal').each(function(){
            var modal = new bootstrap.Modal(this);
            modal.show();
        });
    });
});