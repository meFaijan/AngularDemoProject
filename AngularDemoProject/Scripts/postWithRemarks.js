$(document).ready(function () {
    $(document).on('click', '.postWithRemarks', function (e) {
        e.preventDefault();
        let $tUrl = $(this).attr('href');
        if ($tUrl == '') {
            $tUrl = $(this).data('url');
        }
        $('#postWithRemarks form').attr('action', $tUrl);
        $('#postWithRemarks').modal('show');
    });

    $(document).on('click', '.postWithoutRemarks', function (e) {
        e.preventDefault();
        let $tUrl = $(this).attr('href');
        if ($tUrl == '') {
            $tUrl = $(this).data('url');
        }
        $('#postWithoutRemarks form').attr('action', $tUrl);
        $('#postWithoutRemarks').modal('show');
    });

    $(document).on('click', '.ajaxPostWithoutRemarks', function (e) {
        e.preventDefault();
        let $tUrl = $(this).attr('href');
        let $callback = $(this).data('callback');
        if ($tUrl == '') {
            $tUrl = $(this).data('url');
        }
        $('#ajaxPostWithoutRemarks form').attr('action', $tUrl);
        $('#ajaxPostWithoutRemarks form').attr('data-callback', $callback);
        $('#ajaxPostWithoutRemarks').modal('show');
    });

    $(document).on('click', '.ajaxPostWithRemarks', function (e) {
        e.preventDefault();
        let $tUrl = $(this).attr('href');
        let $callback = $(this).data('callback');
        if ($tUrl == '') {
            $tUrl = $(this).data('url');
        }
        $('#ajaxPostWithRemarks form').attr('action', $tUrl);
        $('#ajaxPostWithRemarks form').attr('data-callback', $callback);
        $('#ajaxPostWithRemarks').modal('show');
    });
});