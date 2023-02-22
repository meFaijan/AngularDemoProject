//validation check
$(document).ready(function () {
    $xyz = false;
    $abc = $("#Facility").validate({
        onfocusout: function (element) {
            this.element(element);
        },
        rules: {
            set02code: {
                required: true,


            },
            set02title: {
                required: true,

            },
            set02remarks: {
                required: true,
                //email: true,
            },
            //mobile_no: {
            //    required: true,

            //},
            //recurring_account_percent: {
            //    required: true,
            //    range: [0, 100]
            //},
            //loan_account_percent: {
            //    required: true,
            //    range: [0, 100]
            //},
            //general_deposit_percent: {
            //    required: true,
            //    range: [0, 100]
            //},
            //fixed_deposit_account_percent: {
            //    required: true,
            //    range: [0, 100]
            //},
            //father_name: {
            //    required: true,
            //},
            //grand_father: {
            //    required: true,
            //},
            //citizen_no: {
            //    required: true,
            //},
            //contact_person_no: {
            //    required: true,
            //},
            //collection_area: {
            //    required: true,

            //},
            //cap_collector: {
            //    number: true,
            //},
        },

        messages: {
            
            set02title: "Title Is Required",
            set02remarks: "Remarks Is Required",
      
        },
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();

            $xyz = false;
        },
        success: function (label, element) {
            label.parent().removeClass('error');
            label.remove();
        },
        submitHandler: function (form) {
            if ($(form).valid())
                form.submit();
            return false; // prevent normal form posting
        }
    });

    console.log($xyz + 'p');
});