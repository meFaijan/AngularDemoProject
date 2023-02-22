
function loadUploadedFiles() {
    var rec01uin = $("#rec01uin").val();
    var url1 = getUrl(_CurrentControllerName + '.uploadedFiles') + "?id=" + rec01uin + "&_t=" + (new Date().getTime());
    var url2 = getUrl(_CurrentControllerName + '.allFiles') + "?id=" + rec01uin + "&_t=" + (new Date().getTime());
    console.log("_CurrentControllerName=" + _CurrentControllerName, url1, url2);
    $('#uploadedFiles').load(url1, function (response, status, xhr) {
        if (status == "error") {
            $.toaster("Error While Loading: " + url1);
            console.log("" + response);
        }
    });
    $('#allFileListing').load(url2, function (response, status, xhr) {
        if (status == "error") {
            $.toaster("Error While Loading: " + url2);
            console.log(response);
        }
    });
}

$(document).ready(function () {
    $('.cmdPrint1').on('click', function () {
        console.log("click!!!!");

        $('#recommendation_panel').addClass('in');
        window.print();
    });

    // console.log("_CurrentControllerName=" + _CurrentControllerName);
    loadUploadedFiles();
    $("#FileSubmit").on('click', function () {
        //if (!canContinueNegativeList()) { return; }
        var doc02uin = Number($("#doc02uin").val());
        var rec01uin = $("#rec01uin").val();
       // alert("_CurrentControllerName", _CurrentControllerName);
        
        var countFiles = $("#MainFile")[0].files.length;

        if (countFiles == 0) {
            return alert("Please Select the file for Upload.");
        }
        $("#FileSubmit").prop("disabled", true);
        showLoading();

        var uploadCount = 0;
        jQuery.each(jQuery('#MainFile')[0].files, function (i, file) {
            var fileSize = file.size / 1024 / 1024;
            if (fileSize > 3) {
                $.toaster("File Size for File <b>" + file.name + "</b> is greater than upload limit for file . Max Size :3mb ", "Error", "danger");
                jQuery('#MainFile').val('');
                $("#FileSubmit").prop("disabled", false);

                return false;
            }
        });
        jQuery.each(jQuery('#MainFile')[0].files, function (i, file) {
            $formData = new FormData();
            $formData.append('File', file);
            $formData.append('doc02uin', doc02uin);
            $formData.append('id', rec01uin);

            //$('#image-file').on('change', function () {
            //    console.log($(this)[0].files[0].name + ' file size is: ' + $(this)[0].files[0].size / 1024 / 1024 + 'Mb');
            //});
            $.ajax({
                url: getUrl(_CurrentControllerName + '.uploadFile'),//string variable
                type: 'POST',
                data: $formData,
                contentType: false,
                processData: false,
                success: function (Data) {
                    if (Data.Status) {
                        loadUploadedFiles();
                    } else {
                        $.toaster(Data.ErrorMsg);
                    }
                    uploadCount++;
                    if (uploadCount >= countFiles) {
                        $("#MainFile").val("");
                        $("#FileSubmit").removeAttr("disabled");
                        hideLoading();
                    }
                }, error: function ($err) {
                    console.log($err);
                    $.toaster($err);
                    uploadCount++;
                    if (uploadCount >= countFiles) {
                        $("#FileSubmit").removeAttr("disabled");
                        hideLoading();
                    }
                }
            });

        });
    });



    $(document).on('click', '.ajaxRemoveFile', function (e) {
        //trigger ajax and refresh the files
        e.preventDefault();
        showLoading();
        $.ajax({
            url: $(this).attr('href'),//string variable
            type: 'GET',
            //data: $formData,
            contentType: false,
            processData: false,
            success: function (Data) {
                if (Data.Status) {
                    loadUploadedFiles();
                } else {
                    $.toaster(Data.msg);
                }
                hideLoading();
            }, error: function ($err) {
                hideLoading();
                console.log($err);
                $.toaster($err);
            }
        });
    });
});

//-Approve Section
function setValueAndSubmit($val) {
    $('#rec03rec00uin_approval').val($val);
    //todo: show confirmation dialog box
    $('#frmApprove').submit();
}
$(document).ready(function () {
    $('#btnApprove').on('click', function (e) {
        $('.req').each(function () {
            $(this).addClass("required");
        });
        e.preventDefault();
        $(this).prop('disabled', 'disabled');
        setValueAndSubmit(5); //todo: use some constant from config file
        // $(this).removeAttr('disabled');

    });
    $('#btnReject').on('click', function (e) {
        $('.req').each(function () {
            $(this).removeClass("required");
        });
        e.preventDefault();
        $(this).prop('disabled', 'disabled');
        setValueAndSubmit(6); //todo: use some constant from config file
    });
    $('#btnReturn').on('click', function (e) {
        $('.req').each(function () {
            $(this).removeClass("required");
        });
        e.preventDefault();
        $(this).prop('disabled', 'disabled');
        setValueAndSubmit(4); //todo: use some constant from config file
    });
    var SelectedRecmmenders = [];
    $('#addRecommender').on('click', function (e) {
        var selectedVal = $('#rec02doc01uin_alt').val();
        if (selectedVal <= 0 || isNaN(selectedVal)) {
            alert("Please Select Recommender");
            return;
        }
        var selectedText = $('#rec02doc01uin_alt').text();
        var data = { id: selectedVal, display: selectedText };


        SelectedRecmmenders.pushIfNotExist(element, function (e) {
            return e.id === element.id;//&& e.text === element.text;
        });
        const temp1 = `
        <div>
            ${SelectedRecmmenders.map(row => `
                <label class ="label label-primary">
                    <input type="hidden" name="rec02doc01uin" value="${row.id}" />
                    <span>${row.display}</span>
                    <span class ="pull-right fa fa-remove removeRecommender"></span>
                </label>
            `)}
        </div>
        `;
        document.getElementById('SelectedRecmmenders').innerHTML = temp1;
    });
});
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
    for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
    }
    return false;
};

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

//var array = [{ name: "tom", text: "tasty" }];
//var element = { name: "tom", text: "tasty" };
//array.pushIfNotExist(element, function (e) {
//    return e.name === element.name && e.text === element.text;
//});

$(document).ready(function () {
    //var RemoveFile = ("RemoveFile", "url1");
    $('.RemoveButton').on('click', function () {
        console.log("Click");
        var value = $('.RemoveButton').val();
        console.log("check" + value);
        console.log("check333" + Removess(value));
        var parent = $(this).closest('.TopResetdiv');
        Removess(value, parent);
    });

    function Removess(value, val) {
        var abc = false;
        console.log('Error' + val);
        $.ajax({
            type: 'Get',
            url: _CurrentControllerName,
            data: {
                id: value
            },
            success: function (result) {
                abc = true;
                // val.remove();
                // alert('SuccessFully Deleted File');

                location.reload();
            },
            error: function (result) {
                alert('Error Occured Unable to Delete File');
                abc = false;
            }

        });
        return abc;
    }
});
