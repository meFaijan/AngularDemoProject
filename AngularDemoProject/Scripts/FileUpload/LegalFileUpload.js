
function loadUploadedFiles() {
    var leg05uin = $("#leg01uin").val();
   // alert(_CurrentControllerName1);


    //var url1 = _CurrentControllerName1 + "?id=" + leg01uin + "&_t=" + (new Date().getTime());
    //var url2 = _CurrentControllerName2 + "?id=" + leg01uin + "&_t=" + (new Date().getTime());
    var url1 = _CurrentControllerName1;
    var url2 = _CurrentControllerName2;

    $('#uploadedFiles').load(url1, function (response, status, xhr) {
        if (status == "error") {
            $.toaster("Error While Loading: " + url1);
            //console.log("" + response);
        }
    });
    $('#allFileListing').load(url2, function (response, status, xhr) {
        if (status == "error") {
            $.toaster("Error While Loading: " + url2);
          //console.log(response);
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
       
        var $leg01uin = $("#leg01uin").val();

        console.log($leg01uin);
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
            $formData.append('id', $leg01uin);

            //$('#image-file').on('change', function () {
            //    console.log($(this)[0].files[0].name + ' file size is: ' + $(this)[0].files[0].size / 1024 / 1024 + 'Mb');
            //});
            $.ajax({
                url: _CurrentControllerName3,//string variable
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

//$(document).ready(function () {
//    //var RemoveFile = ("RemoveFile", "url1");
//    $('.RemoveButton').on('click', function () {
//        console.log("Click");
//        var value = $('.RemoveButton').val();
//        console.log("check" + value);
//        console.log("check333" + Removess(value));
//        var parent = $(this).closest('.TopResetdiv');
//        Removess(value, parent);
//    });

//    function Removess(value, val) {
//        var abc = false;
//        console.log('Error' + val);
//        $.ajax({
//            type: 'Get',
//            url: _CurrentControllerName,
//            data: {
//                id: value
//            },
//            success: function (result) {
//                abc = true;
//                // val.remove();
//                // alert('SuccessFully Deleted File');

//                location.reload();
//            },
//            error: function (result) {
//                alert('Error Occured Unable to Delete File');
//                abc = false;
//            }

//        });
//        return abc;
//    }
//});
