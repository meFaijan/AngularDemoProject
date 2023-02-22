
function ShowHideColumn(target, colIndex) {
    var mTable = '#' + target;
    var myDataTable = $(mTable).DataTable();
    // Get the column API object
    var column = myDataTable.column(colIndex);

    // Toggle the visibility
    column.visible(!column.visible());
}
$(document).on('click', 'a.toggle-vis', function (e) {
    e.preventDefault();
    ShowHideColumn($(this).data('target'), $(this).attr('data-column'));
});
$(document).on('change', '.toggle-vis', function (e) {
    e.preventDefault();
    ShowHideColumn($(this).data('target'), $(this).attr('data-column'));
});
var runApplyShowHideColumns = function () {
    $('.showHideColumns').each(function (item, index) {
        if ($(this).hasClass('toggleApplied')) { return; }
        var t = $(this).data('target');
        var thDrop = $(this).find('.dropdown-menu');
        thDrop.html('');
        $(this).addClass('toggleApplied');
        if ($('#' + t).length >= 1) {
            $('#' + t).find('thead th').each(function (index) {
                var isVisible = $(this).hasClass('hide');
                thDrop.append('<li><a href="#"><input type="checkbox" ' + (isVisible ? "checked" : "") + ' class="toggle-vis" data-column="' + index + '" data-target="' + t + '" />' + $(this).text() + '</a></li>');
            });
        }
        $('.dataTable')
            .floatThead({
                top: 0,
                position: 'absolute'
            });
        $('.dataTable')
            .tableHeadFixer({
                'head': true,
                'left': 0
            });

    });
}
function ReApplyDataTable($selector) {
    $selector = $selector || '.dataTable';
    oTable = $($selector).dataTable({
        select: true,
        "aoColumnDefs": [{
            "aTargets": [0]
        }],
        "oLanguage": {
            "sLengthMenu": "Show _MENU_ Rows",
            "sSearch": "",
            "oPaginate": {
                "sPrevious": "",
                "sNext": ""
            }
        },
        "aaSorting": [[0, 'asc']],
        // set the initial value
        "lengthMenu": [
            [5, 10, 25, 50, 100, 500, 1000, -1],
            [5, 10, 25, 50, 100, 500, 1000, "All"]
        ],
        "iDisplayLength": 100,
        //scrollX: true,
        //responsive: true,
        dom: 'Blfrtpi',
        //fixedHeader: true,
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });
    $('.dataTables_wrapper .dataTables_filter input').addClass("form-control input-sm").attr("placeholder", "Search");


    runApplyShowHideColumns();
}
var oTable;

var runToggle = function () {
    $("[data-toggle='toggle']").bootstrapToggle('destroy')
    $("[data-toggle='toggle']").bootstrapToggle();
}



function ReApplyMajorJSComponents() {

    //ReApplyDataTable();
    $("[data-toggle=tooltip]").tooltip();

    $('.nepali-calendar').nepaliDatePicker({

        format: "yyyy-mm-dd",
        npdMonth: true,
        npdYear: true,
        npdYearCount: 50
    });

    $('.nepali-calendar').attr('placeholder', 'yyyy-mm-dd');
    $('.nepali-calendar').removeAttr('readonly');

    $('.datepicker').attr('placeholder', 'yyyy-mm-dd');
    $('.date-picker').attr('placeholder', 'yyyy-mm-dd');

    $(document).on('keydown', '.nepali-calendar', function () {
        hideCalendarBox(!1);
    });

    //$(".add-row").on("click", function () {
    //    console.log("remove re remove");
    //    var GroupDepositAdd = new dynAddRow('#sample_11');
    //});


    //$(".remove-row").on("click", function () {
    //    console.log("remove re remove");
    //    var GroupDepositRemove = new dynAddRow('#sample_11');
    //});

    applySelect();

    //$('.summernote').summernote('fontName', 'Times New Roman');
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        // "setDate": new Date(),
        "autoclose": true
    });//.datepicker("setDate", new Date());

    $('.date-picker').datepicker({
        format: 'yyyy-mm-dd',
        // "setDate": new Date(),
        "autoclose": true
    });//.datepicker("setDate", new Date());

    runToggle();

    $('.ajaxLoad').each(function (index, item) {
        if (!$(this).hasClass('loaded')) {
            $(this).addClass('loaded');
            $(this).load($(this).data('url'));
        }
    });

    Refreshsummernote();

}
$(document).ready(function () {
    //Main.init();
    TableExport.init();
    //Calendar.init();
    //UIModals.init();
    // console.log('init...');

    $('#cmdPrint, .cmdPrint').on('click', function (e) {
        e.preventDefault();
        window.print();
    });

    ReApplyMajorJSComponents();
});

$('form:not(.ajaxSubmit)').on('submit', function (e) {
    if ($(this).hasClass('noModal')) {
        return true;
    }
    console.log('checking....', $(this).valid());
    if (!$(this).valid()) {
        //validation failed
        return false;
    }

    const fi = $(this).find('.selected_file')[0];
    // Check if any file is selected.
    if (fi != undefined && fi.files.length > 0) {
        var i = 0;
        var total_size = 0;
        for (i = 0; i <= fi.files.length - 1; i++) {
            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            total_size = total_size + file;
        }
        if (total_size >= 3072) {
            alert("File too Big, Please select a file less than 3mb");
            return false;
        }
    }

    console.log('has Class: ', $(this).hasClass('showingConfirmation'));
    if ($(this).hasClass('showingConfirmation')) {
        $(this).addClass('Submitting');
        return true;
    }

    $(this).addClass('showingConfirmation');
    //console.log('showing modal');
    $('#myModal').modal("show");
    e.preventDefault();
    return false;
});

$(document).on('submit', 'form.ajaxSubmit', function (e) {
    if ($(this).hasClass('noModal')) {
        return true;
    }
    //console.log('checking....', $(this).valid());
    if (!$(this).valid()) {
        //validation failed
        return false;
    }
    //debugger;
    //var files = $("#filedoc").val();
    //var files2 = $("#filedoc").files;
    //for (var i = 0; i < files.length; i++) {
    //    var file = this.files[i];
    //    size = file.size;
    //    if (size > 2048) {
    //        $.toaster("Maximum File Size Exceeded.");
    //        return false;
    //    }
    //}

    const all_files = $(this).find('.selected_file');
    var total_size = 0;
    var j = 0;
    if (all_files != undefined && all_files.length > 0) {
        for (j = 0; j <= all_files.length - 1; j++) {
            var fi = all_files[j];
            // Check if any file is selected.
            if (fi != undefined && fi.files.length > 0) {
                var i = 0;
                for (i = 0; i <= fi.files.length - 1; i++) {
                    const fsize = fi.files.item(i).size;
                    const file = Math.round((fsize / 1024));
                    // The size of the file.
                    total_size = total_size + file;
                }
            }
        }
    }
    if (total_size >= 3072) {
        alert("File too Big, Please select a file less than 3mb");
        return false;
    }

    //console.log('has Class: ', $(this).hasClass('showingConfirmation'));
    if ($(this).hasClass('showingConfirmation')) {
        $(this).addClass('Submitting');
        var callBack = window[$(this).data('callback')];
        //console.log("callback=" + typeof callBack);
        var form = $(this)[0];
        $postURL = $(this).attr('action');
        var data = new FormData(form);
        //data = $(this).serialize();
        console.log(data);
        if (jQuery('.upload_filedoc')[0] != null) {
            jQuery.each(jQuery('.upload_filedoc')[0].files, function (i, file) {
                var fileSize = file.size / 1024 / 1024;
                if (fileSize > 3) {
                    $.toaster("File Size for File <b>" + file.name + "</b> is greater than upload limit for file . Max Size :3mb ", "Error", "danger");
                    return false;
                }
            });
        }
        showLoading();
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: $postURL,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                hideLoading();
                //console.log(response);
                var stat = response.Status;
                //console.log("stat=" + stat);
                if (stat) {
                    //$(".ajaxSubmit")[0].reset();
                    //console.log("check");
                    //console.log("callback=" + typeof callBack);
                    $.toaster(response.msg);

                    if (typeof callBack == "function") {
                        callBack(response);
                    }
                }
                else {
                    $.toaster(response.msg);
                }
            }, error: function (err) {
                hideLoading();
                $.toaster(err);
                //console.log("error", err);
            }
        });
    }

    $(this).addClass('showingConfirmation');
    console.log('showing modal');
    $('#myModal').modal("show");
    e.preventDefault();
    return false;

});

$(document).on('submit', 'form.ajaxProcess', function (e) {
    debugger;
    console.log('checking....', $(this).valid());
    if (!$(this).valid()) {
        //validation failed
        return false;
    }
    const fi = $(this).find('.selected_file')[0];
    // Check if any file is selected.
    if (fi != undefined && fi.files.length > 0) {
        var i = 0;
        var total_size = 0;
        for (i = 0; i <= fi.files.length - 1; i++) {
            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            total_size = total_size + file;
        }
        if (total_size >= 3072) {
            alert("File too Big, Please select a file less than 3mb");
            return false;
        }
    }
    var callBack = window[$(this).attr('data-callback')];
    console.log("callback=" + typeof callBack);
    var form = $(this)[0];
    $postURL = $(this).attr('action');
    var data = new FormData(form);
    //data = $(this).serialize();
    showLoading();
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: $postURL,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
            hideLoading();
            console.log(response);
            var stat = response.Status;
            console.log("stat=" + stat);
            if (stat) {
                //$(".ajaxSubmit")[0].reset();
                console.log("check");
                console.log("callback=" + typeof callBack);
                $.toaster(response.msg);
                //$('#ajaxPostWithoutRemarks').modal('toggle');
                $('#ajaxPostWithoutRemarks form').removeAttr('data-callback');
                $('#ajaxPostWithoutRemarks').load($("#ajaxPostWithoutRemarks").data("url"));
                if ($("#ajaxPostWithoutRemarks").length) {
                    $('#ajaxPostWithoutRemarks').modal("hide");
                }
                $('#ajaxPostWithRemarks form').removeAttr('data-callback');
                $('#ajaxPostWithRemarks').load($("#ajaxPostWithRemarks").data("url"));
                if ($("#ajaxPostWithRemarks").length) {
                    $('#ajaxPostWithRemarks').modal("hide");
                }
                if (typeof callBack == "function") {
                    callBack(response);
                }
            }
        }, error: function (err) {
            hideLoading();
            $.toaster(err);
            console.log("error", err);
        }
    });
    console.log('showing modal');
    e.preventDefault();
    return false;

});


$(document).on('submit', 'form.ajaxGetPartialResult', function (e) {
    console.log('checking....', $(this).valid());
    if (!$(this).valid()) {
        //validation failed
        return false;
    }

    var data_target = $(this).data('target');
    var callBack = window[$(this).data('callback')];
    console.log("callback=" + typeof callBack);
    var form = $(this)[0];
    $postURL = $(this).attr('action');
    var data = new FormData(form);
    //data = $(this).serialize();
    showLoading();
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: $postURL,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
            hideLoading();
            if (data_target != undefined) {
                $("#" + data_target).html(response);
            }

            $.toaster("Success");
            if (typeof callBack == "function") {
                callBack(response);
            }

        }, error: function (err) {
            hideLoading();
            $.toaster(err);
            console.log("error", err);
        }
    });
    console.log('showing modal');
    e.preventDefault();
    return false;

});



$(document).ready(function () {
    $(document).on("click", "#ModalSubmitButton", function () {
        if ($("#modal_submit_button").length <= 0) {
            $("#modal_submit_button").unbind('click');
        }
        //$("#SubmitButton").prop("disabled", true);

        //$tUrl = $('a.withModal.showingConfirmation').attr('href');      
        //if ($tUrl.length > 1) {
        //   var  $callback = window[$('a.withModal.showingConfirmation').data('callback')];
        //    callUrlwithCallback($tUrl, $callback);
        //} else {

        //}
        $('form.showingConfirmation').addClass('confirmed').submit();



        if ($("#myModal").length) {
            $('#myModal').modal("hide");
        }
    });
    $('#myModal *[data-dismiss="modal"]').on('click', function () {
        $('form.showingConfirmation').removeClass('showingConfirmation');
    });
    $('#myModal').on('hidden.bs.modal', function () {
        $('form.showingConfirmation').removeClass('showingConfirmation');
    });
});
/////added new 11 jul 2019
//$('#myModal').modal({
//    backdrop: 'static',
//    keyboard: false
//})


function callUrlwithCallback($url, $callback) {
    console.log("Ready for call");
    showLoading();
    $.ajax({
        url: $url,
        success: function (response) {
            hideLoading();
            $.toaster(response.msg);
            console.log("typeof $callback", typeof $callback)
            if (typeof $callback == "function") {
                $callback(response);
            }
        }, error: function (error) {
            hideLoading();
            console.log(error);
        }
    });
}



//js to load target url in load
$(document).ready(function () {
    //$('.ajaxLoad').each(function (index, item) {
    //    $(this).load($(this).data('url'));
    //});
    $(document).on('click', '#myModal .No', function (e) {
        console.log("ab no");
        $('.showingConfirmation').removeClass('showingConfirmation');
    });
    $(document).on('click', 'a.ajaxCall', function (e) {
        var $url = $(this).attr('href');
        var hasModal = $(this).hasClass('withModal');
        var $callback = window[$(this).data('callback')];
        e.preventDefault();
        if (hasModal) {
            console.log("for call");
            if ($(this).hasClass('showingConfirmation')) {
                //callUrlwithCallback($url, $callback);
                return false;
            }
            $(this).addClass('showingConfirmation');
            $('#myModal').modal("show");
            e.preventDefault();
        } else {
            console.log("None bcl");
            callUrlwithCallback($url, $callback);
        }
        return false;
    });
    $('*[data-poload]').hover(function () {
        var e = $(this);
        e.off('hover');
        $.get(e.data('poload'), function (d) {
            e.popover({ content: d, trigger: 'hover' });//.popover('show');
        });
    });
});

function refreshLandBuilding(response) {
    $('#landAndBuildingBlock').load($('#landAndBuildingBlock').data('url'));
    $.toaster("Saved successfully");
}

function refreshFDRDetailsFile(response) {
    $('#UploadedFileModal').load($('#FDRLoanDetailsFileID').data('url'));
}

$(document).on('change', '.pg_birthdate', function () {
    $parentRow = $(this).closest('tr');
    console.log($(this).val());
    var d = new Date();
    var end = new Date($(this).val());
    var start = new Date(d);
    var diff = (start - end);
    console.log(diff);
    var days = diff / (1000 * 60 * 60 * 24);
    //assume 365.25 days per year
    var years = days / 365.25;
    try {
        $parentRow.find('.pg_age').val(parseInt(years));
    } catch (Exception) { }
    $('#Customer_Age').val(parseInt(years));
    console.log(years);
}).trigger('change');


//for old address
$(document).ready(function () {
    //$("#old_municipality").attr('disabled', 'disabled');
    //$("#old_district").attr('disabled', 'disabled');

    $(document).on('change', ".old_zone", function () {
        var zone = $(this).find(":selected").val();
        console.log("val=" + zone);
        OldDistrictSearch(zone, "#" + $(this).data("target"));
        $("#" + $(this).data("target")).removeAttr('disabled');
    });

    $(document).on('change', '.old_district', function () {
        old_district_value = $(this).find(":selected").val()
        var district = old_district_value;
        console.log("val=" + district);
        OldMunicipalityTypeSearch(district, "#" + $(this).data("target"));
        $("#" + $(this).data("target")).removeAttr('disabled');
        OldZoneByDist(district);
    });

    var old_district_value;

    $(document).on('change', ".old_mun_type", function () {
        var mun_type = $(this).find(":selected").val();
        var district = old_district_value;
        console.log("val=" + district);
        OldMunicipalitySearch(district, mun_type, "#" + $(this).data("target"));
        $("#" + $(this).data("target")).removeAttr('disabled');
    });

    function OldDistrictSearch(zone, dis_id) {
        $.ajax({
            dataType: 'json',
            data: { set38uin: zone },
            url: Config.Url.GetOldDistrict,

            success: function (districts) {
                console.log(districts);
                var rData = abc(districts);
                $(dis_id).html(rData);
            }
        });
    }

    function OldMunicipalitySearch(district, mun_type, mun_id) {
        $.ajax({
            dataType: 'json',
            data: { set39uin: district, set40type: mun_type },
            url: Config.Url.GetOldMunicipality,

            success: function (municipalities) {
                console.log(municipalities);
                var rData = OldMunicipal(municipalities);
                $(mun_id).html(rData);
            }
        });
    }

    function OldMunicipalityTypeSearch(district, mun_id) {
        $.ajax({
            dataType: 'json',
            data: { set39uin: district },
            url: Config.Url.GetOldMunicipalityTypesDetails,

            success: function (municipalities) {
                console.log(municipalities);
                var rData = OldMunicipalType(municipalities);
                $(mun_id).html(rData);
            }
        });
    }



    function OldZoneByDist(district) {
        $.ajax({
            dataType: 'json',
            data: { set39uin: district },
            url: Config.Url.GetZoneDetails,

            success: function (data) {
                console.log(data);
                $('#Old_Zone option[value="' + data.id + '"]').attr("selected", "selected");

            }
        });
    }


    function OldMunicipalType(Data) {
        var Result = '';
        if (Data.length > 0) {
            Result += '<option value="" readonly>--Select Municipality Type--</option>';
            for (var i = 0; i < Data.length; i++) {

                if (Data[i] != null) {
                    Result += '<option value="' + Data[i].set05uin + '">' +
                        Data[i].set05title +
                        '</option>';
                }
            }
            console.log(Result);
            return Result;
        }
        return Result;
    }

    function OldMunicipal(Data) {
        var Result = '';
        if (Data.length > 0) {
            Result += '<option value="" readonly>--Select Municipality--</option>';
            for (var i = 0; i < Data.length; i++) {

                if (Data[i] != null) {
                    Result += '<option value="' + Data[i].set40uin + '">' +
                        Data[i].set40title +
                        '</option>';
                }
            }
            console.log(Result);
            return Result;
        }
        return Result;
    }

    function abc(Data) {
        var Result = '';
        if (Data.length > 0) {
            Result += '<option value="" readonly>--Select District--</option>';
            for (var i = 0; i < Data.length; i++) {

                if (Data[i] != null) {
                    Result += '<option value="' + Data[i].set39uin + '">' +
                        Data[i].set39title +
                        '</option>';
                }
            }
            console.log(Result);
            return Result;
        }
        return Result;
    }
});


$(document).on('change', '.Municipality', function () {
    var municipality = $(this).find(":selected").val();
    GetNRBCode(municipality, "#" + $(this).data("target"));
});

function GetNRBCode(municipality, id) {
    $.ajax({
        dataType: 'json',
        data: { set05uin: municipality },
        url: "/Customer_Individual/GetNRBCode",
        success: function (response) {
            $(id).val(response.data);
        }
    });
}



$("input[type='text']").click(function () {
    $(this).select();
});


$(".CheckAllCheckBox").change(function () {
    var checked = $(this).is(':checked');
    if (checked) {
        $(this).closest('table').find('.checkbox').each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $(this).closest('table').find('.checkbox').each(function () {
            $(this).prop("checked", false);
        });
    }
});

// Changing state of CheckAll checkbox
$(".checkbox").click(function () {
    if ($(".checkbox").length == $(".checkbox:checked").length) {
        $(".CheckAllCheckBox").prop("checked", true);
    } else {
        $(".CheckAllCheckBox").removeAttr("checked");
    }

});

function RefreshCurrentChat(response) {
    $('.DisplayChatMessageHistory').load($('.RefreshCurrentChat').data('url'));
    if (response != null && response.Status) {
        $('.write_msg').val('');
    }
}

function CalculateEMI(amount, month, rate) {
    var I = (rate / 100) / 12;
    var v = Math.pow((1 + I), month);
    var t = (I * v) / (v - 1);
    var emi = amount * t;
    return emi;
}


function Refreshsummernote() {
    $('.summernote').summernote({
        height: 150,
        codeviewFilterRegex: /<\/*(?:b(?:ase|gsound|link)|ilayer|l(?:ayer|ink)|object|style|t(?:itle|extarea)|xml)[^>]*?>/gi,
        tabsize: 2,       
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            //['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']],
        ],
        oninit: function () {
            if (_thisNote.code() == "" || _thisNote.code().replace(/(<([^>]+)>)/ig, "") == "") {
                _thisNote.code(_thisNote.attr("placeholder"));
            }
        },
        onfocus: function (e) {
            if (_thisNote.code() == _thisNote.attr("placeholder")) {
                _thisNote.code("");
            }
        },
        onblur: function (e) {
            if (_thisNote.code() == "" || _thisNote.code().replace(/(<([^>]+)>)/ig, "") == "") {
                _thisNote.code(_thisNote.attr("placeholder"));
            }
        },

        cleaner: {
            action: 'both',
            newline: '<br>',
            icon: '<i class="note-icon">[Your Button]</i>',
            keepHtml: true,
            //keepOnlyTags: ['<p>', '<br>', '<ul>', '<li>', '<b>', '<strong>', '<i>', '<a>', '<table>', '<font>', '<span>', '<u>', '<th>', '<tr>', '<td>', '<img>', '<a>', '<html>', '<body>'], // If keepHtml is true, remove all tags except these
            keepClasses: false, //Remove Classes
            badTags: ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'], //'html'], //Remove full tags with contents
            badAttributes: [], //['style', 'start'], //Remove attributes from remaining tags
            limitChars: false,
            limitDisplay: 'both',
            limitStop: false
        }
    });
     
    $('.summernote').summernote('fontSize', '12');
}


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
    $('#menu-list li').each(function (index, item) {
        let ta = $(this).find('> a');
        let ti = $(this).find('> a i');
        //doesn't have a tag or has i tag then leave it
        if (ta.length == 0 || ti.length == 1) { return; }
        //let label = ta.text();
        //console.log(ta.attr('href'));
        if (ta.attr('href') == '#') {
            ta.prepend('<i class="fa fa-folder"></i> ');
        } else {
            ta.prepend('<i class="fa fa-list"></i> ');
        }
    });
});

function ReloadPage(response) {
    window.location.reload();
}

function RefreshMemoPendingList(response) {
    $('#MemoPendingList').load($('#MemoPendingList').data('url'));
}

function RefreshCADList(response) {
    $('#RefreshCADList').load($('#RefreshCADList').data('url'));
}

function RefreshCICRequestList(response) {
    $('#RefreshCICRequestList').load($('#RefreshCICRequestList').data('url'));
}

$(document).on('click', '.ViewDetails', function () {
    var target_id = $(this).data('target');
    if (target_id.indexOf("#") == -1) {
        target_id = "#" + target_id;
    }
    var url = $(this).data('url');
    $(target_id).load(url);
});


