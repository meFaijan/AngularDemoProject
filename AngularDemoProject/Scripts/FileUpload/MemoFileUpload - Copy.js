
function loadUploadedFiles() {
    var rec01uin = Number($("#rec01uin").val());


    var url1 = '/CreditMemo/AjaxFileList' + "?id=" + rec01uin + "&_t=" + (new Date().getTime());
    var url2 = '/CreditMemo/AllFileListing' + "?id=" + rec01uin + "&_t=" + (new Date().getTime());
   
  
    $('#uploadedFiles').load(url1, function (response, status, xhr) {
        if (status == "error") {
            $.toaster("Error While Loading: " + url1);
            console.log(response);
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
    $(document).on('click', "#FileSubmitsss", function () {
        //if (!canContinueNegativeList()) { return; }
        var doc02uin = Number($("#doc02uin").val());
        var rec01uin = Number($("#rec01uin").val());

        var countFiles = $("#MainFile")[0].files.length;

        if (countFiles == 0) {
            return alert("Please Select the file for Upload.");
        }
        $("#FileSubmitsss").prop("disabled", true);
        showLoading();

        var uploadCount = 0;
        jQuery.each(jQuery('#MainFile')[0].files, function (i, file) {
            $formData = new FormData();
            $formData.append('File', file);
            $formData.append('doc02uin', doc02uin);
            $formData.append('id', rec01uin);

            $.ajax({
                url: "/CreditMemo/UploadFile", //getUrl(_CurrentControllerName + '.uploadFile'),//string variable
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
                        $("#FileSubmitsss").prop("disabled", false);
                    }
                }, error: function ($err) {
                    console.log($err);
                    $.toaster($err);
                    uploadCount++;
                    if (uploadCount >= countFiles) {
                        $("#FileSubmit").removeAttr("disabled");
                        hideLoading();
                        $("#FileSubmitsss").prop("disabled", false);
                    }
                }
            });

        });
        $("#FileSubmitsss").prop("disabled", false);
    });



    $('document').on('click', 'a.ajaxRemoveFile', function (e) {
        //trigger ajax and refresh the files
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
        e.preventDefault();
        $(this).prop('disabled', 'disabled');
        setValueAndSubmit(5); //todo: use some constant from config file
    });
    $('#btnReject').on('click', function (e) {
        e.preventDefault();
        $(this).prop('disabled', 'disabled');
        setValueAndSubmit(6); //todo: use some constant from config file
    });
    $('#btnReturn').on('click', function (e) {
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