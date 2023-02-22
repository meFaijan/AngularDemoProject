function setVal($sel, $val) {
    if ($($sel).is('input')) {
        $($sel).val($val);
    } else {
        $($sel).text($val);
    }
    //console.log( $val );    
}

function getVal($sel) {
    $val = $($sel).val();
    if ($val == '') {
        $val = $($sel).html().trim();
    }
    return $val;
}

function getAmountVal($sel) {
    var ret = 0;
    $amt = $($sel).val();
    if (isNaN($amt) || $amt == 0) { return ret; }
    $amt = $amt.toString().replace(/,/g, '');
    return parseFloat($amt);
}

function calcSum(){
    $src = $(this).data('sum');
    //console.log($src);
    $sum = 0;
    $($src).each(function(){
        $val = getAmountVal(this);
        $sum += $val;
    });
    $total = $sum.toFixed(2);
    setVal( this, $total);
}
//function calcDiff() {
//    $src = $(this).data('sum');
//    console.log($src);
//    $diff = 0;
//    $($src).each(function () {
//        $val = getVal(this);
//        $diff -= parseFloat($val);

//    });
//    $total = $diff.toFixed(2);
//    setVal(this, $total);
//}
function cntAvg(){
    $src = $(this).data('cnt');
    setVal( this, $($src).length);
}
function calcAvg(){
    $src = $(this).data('agv');
    $sum = 0;
    $cnt = 0;
    $($src).each(function(){
        $val = getVal( this );
        $sum += parseFloat( $val );
        $cnt ++;
    });
    setVal( this, $sum / $cnt);    
}
function calcDiv(){
    $src = parseFloat( getVal( $(this).data('numerator') ) );
    $dem = parseFloat( getVal( $(this).data('denominator') ) );
    if( $dem <= 0 ){
        setVal( this, 0 );
    }else{
        $v = $src / $dem;
        setVal( this, $v);
    }
}

function calcMulti(){
    $src = parseFloat( getVal( $(this).data('numfirst') ) );
    $dem = parseFloat( getVal( $(this).data('numsecond') ) );
        $v = $src * $dem;
        setVal( this, $v);
         if(($dem == 0) || ($src == 0)){
        setVal( this, 0 );
        }else{
            $v = ($src * $dem).toFixed(2);
            setVal( this, $v);
        }
        
}
function calcPerc(){
    $src = parseFloat( getVal( $(this).data('numerator') ) );
    $dem = parseFloat( getVal( $(this).data('denominator') ) );
    //console.log('num'.$src);
    //console.log($dem);
    if( $dem <= 0 ){
        setVal( this, 0 );
    }else{
        $v = (($src / $dem) * 100).toFixed(2);
        setVal( this, $v);
    }
}
function calcFulePerc(){
    $src = parseFloat( getVal( $(this).data('numerator') ) );
    $in_perc = parseFloat( getVal( $(this).data('percent') ) );
    //console.log($src);
    //console.log($in_perc);
    if( $in_perc <= 0 ){
        setVal( this, 0 );
    }else{
        $v = (($src * $in_perc) / 100).toFixed(2);
        setVal( this, $v);
    }
}
function reCalc(){
    $('.sumCalc').each(calcSum);
    $('.cntCalc').each(cntAvg);
    $('.avgCalc').each(calcAvg);
    $('.divCalc').each(calcDiv);
    $('.calcPerc').each(calcPerc);
    $('.calcMulti').each(calcMulti);
    $('.calcFulePerc').each(calcFulePerc);
}
$(document).ready(function(){
    reCalc();
    reCalc();
});


    //parse then toFixed coz only works for no. 
$(document).ready(function () {
    var x = $(".fixed2zero").text();
    value = parseFloat(x).toFixed(2);
    $('.fixed2zero').html(value);
});

