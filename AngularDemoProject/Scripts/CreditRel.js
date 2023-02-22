//validation check
$(document).ready(function () {
    $xyz = false;
    $abc = $("#SaveCreditRelationshipI").validate({
        onfocusout: function (element) {
            this.element(element);
        },
        rules: {
            lon24int_rate_revised_from: {
                required: true,
                range: [0, 100]
            },
            lon24int_rate_revised_to: {
                required: true,
                range: [0, 100]
            },
            //set02code: {
            //    required: true,


            //},
            //set02title: {
            //    required: true,

            //},
            //set02remarks: {
            //    email: true,
            //},
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
            
            lon24int_rate_revised_from: "Title Is Required",
            lon24int_rate_revised_to: "Remarks Is Required",
      
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