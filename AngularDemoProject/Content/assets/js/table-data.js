
"use strict";

function dynAddRow($tableSelector)
{
    //alert("add-row click3");
   
    this.parentTable = $tableSelector;
    this.tempate = $(this.parentTable).data('template');
   // alert(this.tempate);
    this.evt = this.parentTable + '.add-row';
  
    this.addRow = function (e) {
       // alert("add-row click");
        if (e) { e.preventDefault(); }
        var $temp = $('#' + self.tempate).val();
        if ($temp == undefined) { return;}
        var totalRow = $(self.parentTable + ' tbody tr').length;
        $temp = $temp.replace(/{i}/g, totalRow);
        $temp = $temp.replace(/textareains/g, 'textarea');


        var $table = $(self.parentTable + ' tbody').append('<tr>' + $temp + '</tr>');

        applySelect();

        //focus on first input
        console.log($(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0));
        $(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0).focus();


    };
    this.removeRow = function (e) {
        if (e) { e.preventDefault(); }
        $(this).closest("tr").remove(); // remove row
        return false;
    };

    
    var self = this;

    $(document).on('click', self.parentTable + " .add-row", self.addRow);
    $(document).on('click', self.parentTable + ' .remove-row', self.removeRow);
    
}




"use strict";

function dynAddRow1($tableSelector) {
    this.parentTable = $tableSelector;
    this.tempate = $(this.parentTable).data('template');

    this.evt = this.parentTable + '.add-row1';
    this.addRow = function (e) {
        // alert("add-row click");

        if (e) { e.preventDefault(); }
        var $temp = $('#' + self.tempate).val();
        if ($temp == undefined) { return; }
        var totalRow = $(self.parentTable + ' tbody tr').length;
        $temp = $temp.replace(/{i}/g, totalRow);
        var $table = $(self.parentTable + ' tbody').append('<tr>' + $temp + '</tr>');

        applySelect();

        //focus on first input
        console.log($(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0));
        $(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0).focus();


    };
    this.removeRow = function (e) {
        if (e) { e.preventDefault(); }
        $(this).closest("tr").remove(); // remove row
        return false;
    };


    var self = this;

    $(document).on('click', self.parentTable + " .add-row1", self.addRow);
    $(document).on('click', self.parentTable + ' .remove-row1', self.removeRow);

}

"use strict";

function dynAddRow2($tableSelector) {
    this.parentTable = $tableSelector;
    this.tempate = $(this.parentTable).data('template');

    this.evt = this.parentTable + '.add-row2';
    this.addRow = function (e) {
        // alert("add-row click");

        if (e) { e.preventDefault(); }
        var $temp = $('#' + self.tempate).val();
        if ($temp == undefined) { return; }
        var totalRow = $(self.parentTable + ' tbody tr').length;
        $temp = $temp.replace(/{i}/g, totalRow);
        var $table = $(self.parentTable + ' tbody').append('<tr>' + $temp + '</tr>');

        applySelect();

        //focus on first input
        console.log($(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0));
        $(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0).focus();


    };
    this.removeRow = function (e) {
        if (e) { e.preventDefault(); }
        $(this).closest("tr").remove(); // remove row
        return false;
    };


    var self = this;

    $(document).on('click', self.parentTable + " .add-row2", self.addRow);
    $(document).on('click', self.parentTable + ' .remove-row2', self.removeRow);

}

"use strict";

function dynAddRowBuild($tableSelector) {
    this.parentTable = $tableSelector;
    this.tempate = $(this.parentTable).data('template');

    this.evt = this.parentTable + '.build_add-row';
    this.addRow = function (e) {
        // alert("add-row click");

        if (e) { e.preventDefault(); }
        var $temp = $('#' + self.tempate).val();
        if ($temp == undefined) { return; }
        var totalRow = $(self.parentTable + ' tbody tr').length;
        $temp = $temp.replace(/{i}/g, totalRow);
        var $table = $(self.parentTable + ' tbody').append('<tr>' + $temp + '</tr>');

        applySelect();

        //focus on first input
        console.log($(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0));
        $(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0).focus();


    };
    this.removeRow = function (e) {
        if (e) { e.preventDefault(); }
        $(this).closest("tr").remove(); // remove row
        return false;
    };


    var self = this;

    $(document).on('click', self.parentTable + " .build_add-row", self.addRow);
    $(document).on('click', self.parentTable + ' .build_remove-row', self.removeRow);

}
// Handler for .ready() called.

"use strict";

function dynAddRowWaiv($tableSelector) {
    //alert("add-row click3");

    this.parentTable = $tableSelector;
    this.tempate = $(this.parentTable).data('template');
    // alert(this.tempate);
    this.evt = this.parentTable + '.add-row-waiv';

    this.addRow = function (e) {
        // alert("add-row click");

        if (e) { e.preventDefault(); }
        var $temp = $('#' + self.tempate).val();
        if ($temp == undefined) { return; }
        var totalRow = $(self.parentTable + ' tbody tr').length;
        $temp = $temp.replace(/{i}/g, totalRow);


        var $table = $(self.parentTable + ' tbody').append('<tr>' + $temp + '</tr>');

        applySelect();

        //focus on first input
        console.log($(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0));
        $(self.parentTable + ' tbody tr:last-child').find('.search-select').eq(0).focus();


    };
    this.removeRow = function (e) {
        if (e) { e.preventDefault(); }
        $(this).closest("tr").remove(); // remove row
        return false;
    };


    var self = this;

    $(document).on('click', self.parentTable + " .add-row-waiv", self.addRow);
    $(document).on('click', self.parentTable + ' .remove-row-waiv', self.removeRow);

}
// Handler for .ready() called.
