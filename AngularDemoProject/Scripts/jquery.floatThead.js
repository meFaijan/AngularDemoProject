(function ($) {
    $.floatThead = $.floatThead || {}; $.floatThead.defaults = { headerCellSelector: 'tr:visible:first>*:visible', zIndex: 1001, position: 'auto', top: 0, bottom: 0, scrollContainer: function ($table) { return $([]); }, responsiveContainer: function ($table) { return $([]); }, getSizingRow: function ($table, $cols, $fthCells) { return $table.find('tbody tr:visible:first>*:visible'); }, floatTableClass: 'floatThead-table', floatWrapperClass: 'floatThead-wrapper', floatContainerClass: 'floatThead-container', copyTableClass: true, autoReflow: false, debug: false, support: { bootstrap: true, datatables: true, jqueryUI: true, perfectScrollbar: true }, floatContainerCss: { "overflow-x": "hidden" } }; var util = (function underscoreShim() {
        var that = {}; var hasOwnProperty = Object.prototype.hasOwnProperty, isThings = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp']; that.has = function (obj, key) { return hasOwnProperty.call(obj, key); }; that.keys = Object.keys || function (obj) { if (obj !== Object(obj)) throw new TypeError('Invalid object'); var keys = []; for (var key in obj) if (that.has(obj, key)) keys.push(key); return keys; }; var idCounter = 0; that.uniqueId = function (prefix) { var id = ++idCounter + ''; return prefix ? prefix + id : id; }; $.each(isThings, function () { var name = this; that['is' + name] = function (obj) { return Object.prototype.toString.call(obj) == '[object ' + name + ']'; }; }); that.debounce = function (func, wait, immediate) {
            var timeout, args, context, timestamp, result; return function () {
                context = this; args = arguments; timestamp = new Date(); var later = function () { var last = (new Date()) - timestamp; if (last < wait) { timeout = setTimeout(later, wait - last); } else { timeout = null; if (!immediate) result = func.apply(context, args); } }; var callNow = immediate && !timeout; if (!timeout) { timeout = setTimeout(later, wait); }
                if (callNow) result = func.apply(context, args); return result;
            };
        }; return that;
    })(); var canObserveMutations = typeof MutationObserver !== 'undefined'; var ieVersion = function () { for (var a = 3, b = document.createElement("b"), c = b.all || []; a = 1 + a, b.innerHTML = "<!--[if gt IE " + a + "]><i><![endif]-->", c[0];); return 4 < a ? a : document.documentMode }(); var isFF = /Gecko\//.test(navigator.userAgent); var isWebkit = /WebKit\//.test(navigator.userAgent); if (!(ieVersion || isFF || isWebkit)) { ieVersion = 11; }
    var isTableWidthBug = function () {
        if (isWebkit) { var $test = $('<div>').css('width', 0).append($('<table>').css('max-width', '100%').append($('<tr>').append($('<th>').append($('<div>').css('min-width', 100).text('X'))))); $("body").append($test); var ret = ($test.find("table").width() == 0); $test.remove(); return ret; }
        return false;
    }; var createElements = !isFF && !ieVersion; var $window = $(window); var buggyMatchMedia = isFF && window.matchMedia; if (!window.matchMedia || buggyMatchMedia) { var _beforePrint = window.onbeforeprint; var _afterPrint = window.onafterprint; window.onbeforeprint = function () { _beforePrint && _beforePrint(); $window.triggerHandler("fth-beforeprint"); }; window.onafterprint = function () { _afterPrint && _afterPrint(); $window.triggerHandler("fth-afterprint"); }; }
    function windowResize(eventName, cb) { if (ieVersion == 8) { var winWidth = $window.width(); var debouncedCb = util.debounce(function () { var winWidthNew = $window.width(); if (winWidth != winWidthNew) { winWidth = winWidthNew; cb(); } }, 1); $window.on(eventName, debouncedCb); } else { $window.on(eventName, util.debounce(cb, 1)); } }
    function getClosestScrollContainer($elem) {
        var elem = $elem[0]; var parent = elem.parentElement; do { var pos = window.getComputedStyle(parent).getPropertyValue('overflow'); if (pos != 'visible') break; } while (parent = parent.parentElement); if (parent == document.body) { return $([]); }
        return $(parent);
    }
    function debug(str) { window && window.console && window.console.error && window.console.error("jQuery.floatThead: " + str); }
    function getOffsetWidth(el) { var rect = el.getBoundingClientRect(); return rect.width || rect.right - rect.left; }
    function scrollbarWidth() { var d = document.createElement("scrolltester"); d.style.cssText = 'width:100px;height:100px;overflow:scroll!important;position:absolute;top:-9999px;display:block'; document.body.appendChild(d); var result = d.offsetWidth - d.clientWidth; document.body.removeChild(d); return result; }
    function isDatatable($table) {
        if ($table.dataTableSettings) { for (var i = 0; i < $table.dataTableSettings.length; i++) { var table = $table.dataTableSettings[i].nTable; if ($table[0] == table) { return true; } } }
        return false;
    }
    function tableWidth($table, $fthCells, isOuter) {
        var fn = isOuter ? "outerWidth" : "width"; if (isTableWidthBug && $table.css("max-width")) {
            var w = 0; if (isOuter) { w += parseInt($table.css("borderLeft"), 10); w += parseInt($table.css("borderRight"), 10); }
            for (var i = 0; i < $fthCells.length; i++) { w += getOffsetWidth($fthCells.get(i)); }
            return w;
        } else { return $table[fn](); }
    }
    $.fn.floatThead = function (map) {
        map = map || {}; if (ieVersion < 8) { return this; }
        var mObs = null; if (util.isFunction(isTableWidthBug)) { isTableWidthBug = isTableWidthBug(); }
        if (util.isString(map)) {
            var command = map; var args = Array.prototype.slice.call(arguments, 1); var ret = this; this.filter('table').each(function () {
                var $this = $(this); var opts = $this.data('floatThead-lazy'); if (opts) { $this.floatThead(opts); }
                var obj = $this.data('floatThead-attached'); if (obj && util.isFunction(obj[command])) { var r = obj[command].apply(this, args); if (r !== undefined) { ret = r; } }
            }); return ret;
        }
        var opts = $.extend({}, $.floatThead.defaults || {}, map); $.each(map, function (key, val) { if ((!(key in $.floatThead.defaults)) && opts.debug) { debug("Used [" + key + "] key to init plugin, but that param is not an option for the plugin. Valid options are: " + (util.keys($.floatThead.defaults)).join(', ')); } }); if (opts.debug) { var v = $.fn.jquery.split("."); if (parseInt(v[0], 10) == 1 && parseInt(v[1], 10) <= 7) { debug("jQuery version " + $.fn.jquery + " detected! This plugin supports 1.8 or better, or 1.7.x with jQuery UI 1.8.24 -> http://jqueryui.com/resources/download/jquery-ui-1.8.24.zip") } }
        this.filter(':not(.' + opts.floatTableClass + ')').each(function () {
            var floatTheadId = util.uniqueId(); var $table = $(this); if ($table.data('floatThead-attached')) { return true; }
            if (!$table.is('table')) { throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();'); }
            canObserveMutations = opts.autoReflow && canObserveMutations; var $header = $table.children('thead:first'); var $tbody = $table.children('tbody:first'); if ($header.length == 0 || $tbody.length == 0) {
                if (opts.debug) { if ($header.length == 0) { debug('The thead element is missing.'); } else { debug('The tbody element is missing.'); } }
                $table.data('floatThead-lazy', opts); $table.unbind("reflow").one('reflow', function () { $table.floatThead(opts); }); return;
            }
            if ($table.data('floatThead-lazy')) { $table.unbind("reflow"); }
            $table.data('floatThead-lazy', false); var headerFloated = true; var scrollingTop, scrollingBottom; var scrollbarOffset = { vertical: 0, horizontal: 0 }; if (util.isFunction(scrollbarWidth)) { scrollbarWidth = scrollbarWidth(); }
            var lastColumnCount = 0; if (opts.scrollContainer === true) { opts.scrollContainer = getClosestScrollContainer; }
            var $scrollContainer = opts.scrollContainer($table) || $([]); var locked = $scrollContainer.length > 0; var $responsiveContainer = locked ? $([]) : opts.responsiveContainer($table) || $([]); var responsive = isResponsiveContainerActive(); var useAbsolutePositioning = null; if (opts.position === 'auto') { useAbsolutePositioning = null; } else if (opts.position === 'fixed') { useAbsolutePositioning = false; } else if (opts.position === 'absolute') { useAbsolutePositioning = true; } else if (opts.debug) { debug('Invalid value given to "position" option, valid is "fixed", "absolute" and "auto". You passed: ', opts.position); }
            if (useAbsolutePositioning == null) { useAbsolutePositioning = locked; }
            var $caption = $table.find("caption"); var haveCaption = $caption.length == 1; if (haveCaption) { var captionAlignTop = ($caption.css("caption-side") || $caption.attr("align") || "top") === "top"; }
            var $fthGrp = $('<fthfoot>').css({ 'display': 'table-footer-group', 'border-spacing': 0, 'height': 0, 'border-collapse': 'collapse', 'visibility': 'hidden' }); var wrappedContainer = false; var $wrapper = $([]); var absoluteToFixedOnScroll = ieVersion <= 9 && !locked && useAbsolutePositioning; var $floatTable = $("<table/>"); var $floatColGroup = $("<colgroup/>"); var $tableColGroup = $table.children('colgroup:first'); var existingColGroup = true; if ($tableColGroup.length == 0) { $tableColGroup = $("<colgroup/>"); existingColGroup = false; }
            var $fthRow = $('<fthtr>').css({ 'display': 'table-row', 'border-spacing': 0, 'height': 0, 'border-collapse': 'collapse' }); var $floatContainer = $('<div>').css(opts.floatContainerCss).attr('aria-hidden', 'true'); var floatTableHidden = false; var $newHeader = $("<thead/>"); var $sizerRow = $('<tr class="size-row" aria-hidden="true"/>'); var $sizerCells = $([]); var $tableCells = $([]); var $headerCells = $([]); var $fthCells = $([]); $newHeader.append($sizerRow); $table.prepend($tableColGroup); if (createElements) { $fthGrp.append($fthRow); $table.append($fthGrp); }
            $floatTable.append($floatColGroup); $floatContainer.append($floatTable); if (opts.copyTableClass) { $floatTable.attr('class', $table.attr('class')); }
            $floatTable.attr({ 'cellpadding': $table.attr('cellpadding'), 'cellspacing': $table.attr('cellspacing'), 'border': $table.attr('border') }); var tableDisplayCss = $table.css('display'); $floatTable.css({ 'borderCollapse': $table.css('borderCollapse'), 'border': $table.css('border'), 'display': tableDisplayCss }); if (!locked) { $floatTable.css('width', 'auto'); }
            if (tableDisplayCss === 'none') { floatTableHidden = true; }
            $floatTable.addClass(opts.floatTableClass).css({ 'margin': 0, 'border-bottom-width': 0 }); if (useAbsolutePositioning) {
                var makeRelative = function ($container, alwaysWrap) {
                    var positionCss = $container.css('position'); var relativeToScrollContainer = (positionCss == "relative" || positionCss == "absolute"); var $containerWrap = $container; if (!relativeToScrollContainer || alwaysWrap) { var css = { "paddingLeft": $container.css('paddingLeft'), "paddingRight": $container.css('paddingRight') }; $floatContainer.css(css); $containerWrap = $container.data('floatThead-containerWrap') || $container.wrap($('<div>').addClass(opts.floatWrapperClass).css({ 'position': 'relative', 'clear': 'both' })).parent(); $container.data('floatThead-containerWrap', $containerWrap); wrappedContainer = true; }
                    return $containerWrap;
                }; if (locked) { $wrapper = makeRelative($scrollContainer, true); $wrapper.prepend($floatContainer); } else { $wrapper = makeRelative($table); $table.before($floatContainer); }
            } else { $table.before($floatContainer); }
            $floatContainer.css({ position: useAbsolutePositioning ? 'absolute' : 'fixed', marginTop: 0, top: useAbsolutePositioning ? 0 : 'auto', zIndex: opts.zIndex, willChange: 'transform' }); $floatContainer.addClass(opts.floatContainerClass); updateScrollingOffsets(); var layoutFixed = { 'table-layout': 'fixed' }; var layoutAuto = { 'table-layout': $table.css('tableLayout') || 'auto' }; var originalTableWidth = $table[0].style.width || ""; var originalTableMinWidth = $table.css('minWidth') || ""; function eventName(name) { return name + '.fth-' + floatTheadId + '.floatTHead' }
            function setHeaderHeight() {
                var headerHeight = 0; $header.children("tr:visible").each(function () { headerHeight += $(this).outerHeight(true); }); if ($table.css('border-collapse') == 'collapse') { var tableBorderTopHeight = parseInt($table.css('border-top-width'), 10); var cellBorderTopHeight = parseInt($table.find("thead tr:first").find(">*:first").css('border-top-width'), 10); if (tableBorderTopHeight > cellBorderTopHeight) { headerHeight -= (tableBorderTopHeight / 2); } }
                $sizerRow.outerHeight(headerHeight); $sizerCells.outerHeight(headerHeight);
            }
            function setFloatWidth() { var tw = tableWidth($table, $fthCells, true); var $container = responsive ? $responsiveContainer : $scrollContainer; var width = $container.length ? getOffsetWidth($container[0]) : tw; var floatContainerWidth = $container.css("overflow-y") != 'hidden' ? width - scrollbarOffset.vertical : width; $floatContainer.width(floatContainerWidth); if (locked) { var percent = 100 * tw / (floatContainerWidth); $floatTable.css('width', percent + '%'); } else { $floatTable.outerWidth(tw); } }
            function updateScrollingOffsets() { scrollingTop = (util.isFunction(opts.top) ? opts.top($table) : opts.top) || 0; scrollingBottom = (util.isFunction(opts.bottom) ? opts.bottom($table) : opts.bottom) || 0; }
            function columnNum() {
                var count; var $headerColumns = $header.find(opts.headerCellSelector); if (existingColGroup) { count = $tableColGroup.find('col').length; } else { count = 0; $headerColumns.each(function () { count += parseInt(($(this).attr('colspan') || 1), 10); }); }
                if (count !== lastColumnCount) {
                    lastColumnCount = count; var cells = [], cols = [], psuedo = [], content; for (var x = 0; x < count; x++) { content = $headerColumns.eq(x).text(); cells.push('<th class="floatThead-col" aria-label="' + content + '"/>'); cols.push('<col/>'); psuedo.push($('<fthtd>').css({ 'display': 'table-cell', 'height': 0, 'width': 'auto' })); }
                    cols = cols.join(''); cells = cells.join(''); if (createElements) { $fthRow.empty(); $fthRow.append(psuedo); $fthCells = $fthRow.find('fthtd'); }
                    $sizerRow.html(cells); $sizerCells = $sizerRow.find("th"); if (!existingColGroup) { $tableColGroup.html(cols); }
                    $tableCells = $tableColGroup.find('col'); $floatColGroup.html(cols); $headerCells = $floatColGroup.find("col");
                }
                return count;
            }
            function refloat() {
                if (!headerFloated) {
                    headerFloated = true; if (useAbsolutePositioning) { var tw = tableWidth($table, $fthCells, true); var wrapperWidth = $wrapper.width(); if (tw > wrapperWidth) { $table.css('minWidth', tw); } }
                    $table.css(layoutFixed); $floatTable.css(layoutFixed); $floatTable.append($header); $tbody.before($newHeader); setHeaderHeight();
                }
            }
            function unfloat() {
                if (headerFloated) {
                    headerFloated = false; if (useAbsolutePositioning) { $table.width(originalTableWidth); }
                    $newHeader.detach(); $table.prepend($header); $table.css(layoutAuto); $floatTable.css(layoutAuto); $table.css('minWidth', originalTableMinWidth); $table.css('minWidth', tableWidth($table, $fthCells));
                }
            }
            var isHeaderFloatingLogical = false; function triggerFloatEvent(isFloating) { if (isHeaderFloatingLogical != isFloating) { isHeaderFloatingLogical = isFloating; $table.triggerHandler("floatThead", [isFloating, $floatContainer]) } }
            function changePositioning(isAbsolute) { if (useAbsolutePositioning != isAbsolute) { useAbsolutePositioning = isAbsolute; $floatContainer.css({ position: useAbsolutePositioning ? 'absolute' : 'fixed' }); } }
            function getSizingRow($table, $cols, $fthCells, ieVersion) { if (createElements) { return $fthCells; } else if (ieVersion) { return opts.getSizingRow($table, $cols, $fthCells); } else { return $cols; } }
            function reflow() {
                var i; var numCols = columnNum(); return function () {
                    var scrollLeft = $floatContainer.scrollLeft(); $tableCells = $tableColGroup.find('col'); var $rowCells = getSizingRow($table, $tableCells, $fthCells, ieVersion); if ($rowCells.length == numCols && numCols > 0) {
                        if (!existingColGroup) { for (i = 0; i < numCols; i++) { $tableCells.eq(i).css('width', ''); } }
                        unfloat(); var widths = []; for (i = 0; i < numCols; i++) { widths[i] = getOffsetWidth($rowCells.get(i)); }
                        for (i = 0; i < numCols; i++) { $headerCells.eq(i).width(widths[i]); $tableCells.eq(i).width(widths[i]); }
                        refloat();
                    } else { $floatTable.append($header); $table.css(layoutAuto); $floatTable.css(layoutAuto); setHeaderHeight(); }
                    $floatContainer.scrollLeft(scrollLeft); $table.triggerHandler("reflowed", [$floatContainer]);
                };
            }
            function floatContainerBorderWidth(side) {
                var border = $scrollContainer.css("border-" + side + "-width"); var w = 0; if (border && ~border.indexOf('px')) { w = parseInt(border, 10); }
                return w;
            }
            function isResponsiveContainerActive() { return $responsiveContainer.css("overflow-x") == 'auto'; }
            function calculateFloatContainerPosFn() {
                var scrollingContainerTop = $scrollContainer.scrollTop(); var floatEnd; var tableContainerGap = 0; var captionHeight = haveCaption ? $caption.outerHeight(true) : 0; var captionScrollOffset = captionAlignTop ? captionHeight : -captionHeight; var floatContainerHeight = $floatContainer.height(); var tableOffset = $table.offset(); var tableLeftGap = 0; var tableTopGap = 0; if (locked) {
                    var containerOffset = $scrollContainer.offset(); tableContainerGap = tableOffset.top - containerOffset.top + scrollingContainerTop; if (haveCaption && captionAlignTop) { tableContainerGap += captionHeight; }
                    tableLeftGap = floatContainerBorderWidth('left'); tableTopGap = floatContainerBorderWidth('top'); tableContainerGap -= tableTopGap;
                } else { floatEnd = tableOffset.top - scrollingTop - floatContainerHeight + scrollingBottom + scrollbarOffset.horizontal; }
                var windowTop = $window.scrollTop(); var windowLeft = $window.scrollLeft(); var getScrollContainerLeft = function () { return (isResponsiveContainerActive() ? $responsiveContainer : $scrollContainer).scrollLeft() || 0; }; var scrollContainerLeft = getScrollContainerLeft(); return function (eventType) {
                    responsive = isResponsiveContainerActive(); var isTableHidden = $table[0].offsetWidth <= 0 && $table[0].offsetHeight <= 0; if (!isTableHidden && floatTableHidden) { floatTableHidden = false; setTimeout(function () { $table.triggerHandler("reflow"); }, 1); return null; }
                    if (isTableHidden) { floatTableHidden = true; if (!useAbsolutePositioning) { return null; } }
                    if (eventType == 'windowScroll') { windowTop = $window.scrollTop(); windowLeft = $window.scrollLeft(); } else if (eventType == 'containerScroll') {
                        if ($responsiveContainer.length) {
                            if (!responsive) { return; }
                            scrollContainerLeft = $responsiveContainer.scrollLeft();
                        } else { scrollingContainerTop = $scrollContainer.scrollTop(); scrollContainerLeft = $scrollContainer.scrollLeft(); }
                    } else if (eventType != 'init') { windowTop = $window.scrollTop(); windowLeft = $window.scrollLeft(); scrollingContainerTop = $scrollContainer.scrollTop(); scrollContainerLeft = getScrollContainerLeft(); }
                    if (isWebkit && (windowTop < 0 || windowLeft < 0)) { return; }
                    if (absoluteToFixedOnScroll) { if (eventType == 'windowScrollDone') { changePositioning(true); } else { changePositioning(false); } } else if (eventType == 'windowScrollDone') { return null; }
                    tableOffset = $table.offset(); if (haveCaption && captionAlignTop) { tableOffset.top += captionHeight; }
                    var top, left; var tableHeight = $table.outerHeight(); if (locked && useAbsolutePositioning) {
                        if (tableContainerGap >= scrollingContainerTop) { var gap = tableContainerGap - scrollingContainerTop + tableTopGap; top = gap > 0 ? gap : 0; triggerFloatEvent(false); } else if (scrollingContainerTop - tableContainerGap > tableHeight - floatContainerHeight) { top = tableHeight - floatContainerHeight - scrollingContainerTop - tableContainerGap; } else { top = wrappedContainer ? tableTopGap : scrollingContainerTop; triggerFloatEvent(true); }
                        left = tableLeftGap;
                    } else if (!locked && useAbsolutePositioning) {
                        if (windowTop > floatEnd + tableHeight + captionScrollOffset) { top = tableHeight - floatContainerHeight + captionScrollOffset + scrollingBottom; } else if (tableOffset.top >= windowTop + scrollingTop) { top = 0; unfloat(); triggerFloatEvent(false); } else { top = scrollingTop + windowTop - tableOffset.top + tableContainerGap + (captionAlignTop ? captionHeight : 0); refloat(); triggerFloatEvent(true); }
                        left = scrollContainerLeft;
                    } else if (locked && !useAbsolutePositioning) {
                        if (tableContainerGap > scrollingContainerTop || scrollingContainerTop - tableContainerGap > tableHeight) { top = tableOffset.top - windowTop; unfloat(); triggerFloatEvent(false); } else { top = tableOffset.top + scrollingContainerTop - windowTop - tableContainerGap; refloat(); triggerFloatEvent(true); }
                        left = tableOffset.left + scrollContainerLeft - windowLeft;
                    } else if (!locked && !useAbsolutePositioning) {
                        if (windowTop > floatEnd + tableHeight + captionScrollOffset) { top = tableHeight + scrollingTop - windowTop + floatEnd + captionScrollOffset; } else if (tableOffset.top > windowTop + scrollingTop) { top = tableOffset.top - windowTop; refloat(); triggerFloatEvent(false); } else { top = scrollingTop; triggerFloatEvent(true); }
                        left = tableOffset.left + scrollContainerLeft - windowLeft;
                    }
                    return { top: Math.round(top), left: Math.round(left) };
                };
            }
            function repositionFloatContainerFn() {
                var oldTop = null; var oldLeft = null; var oldScrollLeft = null; return function (pos, setWidth, setHeight) {
                    if (pos != null && (oldTop != pos.top || oldLeft != pos.left)) {
                        if (ieVersion === 8) { $floatContainer.css({ top: pos.top, left: pos.left }); } else { var transform = 'translateX(' + pos.left + 'px) translateY(' + pos.top + 'px)'; var cssObj = { '-webkit-transform': transform, '-moz-transform': transform, '-ms-transform': transform, '-o-transform': transform, 'transform': transform, 'top': 0, }; cssObj[/rtl/i.test(document.documentElement.dir || '') ? 'right' : 'left'] = 0; $floatContainer.css(cssObj); }
                        oldTop = pos.top; oldLeft = pos.left;
                    }
                    if (setWidth) { setFloatWidth(); }
                    if (setHeight) { setHeaderHeight(); }
                    var scrollLeft = (responsive ? $responsiveContainer : $scrollContainer).scrollLeft(); if (!useAbsolutePositioning || oldScrollLeft != scrollLeft) { $floatContainer.scrollLeft(scrollLeft); oldScrollLeft = scrollLeft; }
                }
            }
            function calculateScrollBarSize() {
                if ($scrollContainer.length) {
                    if (opts.support && opts.support.perfectScrollbar && $scrollContainer.data().perfectScrollbar) { scrollbarOffset = { horizontal: 0, vertical: 0 }; } else {
                        if ($scrollContainer.css('overflow-x') == 'scroll') { scrollbarOffset.horizontal = scrollbarWidth; } else { var sw = $scrollContainer.width(), tw = tableWidth($table, $fthCells); var offsetv = sh < th ? scrollbarWidth : 0; scrollbarOffset.horizontal = sw - offsetv < tw ? scrollbarWidth : 0; }
                        if ($scrollContainer.css('overflow-y') == 'scroll') { scrollbarOffset.vertical = scrollbarWidth; } else { var sh = $scrollContainer.height(), th = $table.height(); var offseth = sw < tw ? scrollbarWidth : 0; scrollbarOffset.vertical = sh - offseth < th ? scrollbarWidth : 0; }
                    }
                }
            }
            calculateScrollBarSize(); var flow; var ensureReflow = function () { flow = reflow(); flow(); }; ensureReflow(); var calculateFloatContainerPos = calculateFloatContainerPosFn(); var repositionFloatContainer = repositionFloatContainerFn(); repositionFloatContainer(calculateFloatContainerPos('init'), true); var windowScrollDoneEvent = util.debounce(function () { repositionFloatContainer(calculateFloatContainerPos('windowScrollDone'), false); }, 1); var windowScrollEvent = function () { repositionFloatContainer(calculateFloatContainerPos('windowScroll'), false); if (absoluteToFixedOnScroll) { windowScrollDoneEvent(); } }; var containerScrollEvent = function () { repositionFloatContainer(calculateFloatContainerPos('containerScroll'), false); }; var windowResizeEvent = function () {
                if ($table.is(":hidden")) { return; }
                updateScrollingOffsets(); calculateScrollBarSize(); ensureReflow(); calculateFloatContainerPos = calculateFloatContainerPosFn(); repositionFloatContainer = repositionFloatContainerFn(); repositionFloatContainer(calculateFloatContainerPos('resize'), true, true);
            }; var reflowEvent = util.debounce(function () {
                if ($table.is(":hidden")) { return; }
                calculateScrollBarSize(); updateScrollingOffsets(); ensureReflow(); calculateFloatContainerPos = calculateFloatContainerPosFn(); repositionFloatContainer(calculateFloatContainerPos('reflow'), true, true);
            }, 1); var beforePrint = function () { unfloat(); }; var afterPrint = function () { refloat(); }; var printEvent = function (mql) { if (mql.matches) { beforePrint(); } else { afterPrint(); } }; var matchMediaPrint = null; if (window.matchMedia && window.matchMedia('print').addListener && !buggyMatchMedia) { matchMediaPrint = window.matchMedia("print"); matchMediaPrint.addListener(printEvent); } else { $window.on('fth-beforeprint', beforePrint); $window.on('fth-afterprint', afterPrint); }
            if (locked) { if (useAbsolutePositioning) { $scrollContainer.on(eventName('scroll'), containerScrollEvent); } else { $scrollContainer.on(eventName('scroll'), containerScrollEvent); $window.on(eventName('scroll'), windowScrollEvent); } } else { $responsiveContainer.on(eventName('scroll'), containerScrollEvent); $window.on(eventName('scroll'), windowScrollEvent); }
            $window.on(eventName('load'), reflowEvent); windowResize(eventName('resize'), windowResizeEvent); $table.on('reflow', reflowEvent); if (opts.support && opts.support.datatables && isDatatable($table)) { $table.on('filter', reflowEvent).on('sort', reflowEvent).on('page', reflowEvent); }
            if (opts.support && opts.support.bootstrap) { $window.on(eventName('shown.bs.tab'), reflowEvent); }
            if (opts.support && opts.support.jqueryUI) { $window.on(eventName('tabsactivate'), reflowEvent); }
            if (canObserveMutations) {
                var mutationElement = null; if (util.isFunction(opts.autoReflow)) { mutationElement = opts.autoReflow($table, $scrollContainer) }
                if (!mutationElement) { mutationElement = $scrollContainer.length ? $scrollContainer[0] : $table[0] }
                mObs = new MutationObserver(function (e) { var wasTableRelated = function (nodes) { return nodes && nodes[0] && (nodes[0].nodeName == "THEAD" || nodes[0].nodeName == "TD" || nodes[0].nodeName == "TH"); }; for (var i = 0; i < e.length; i++) { if (!(wasTableRelated(e[i].addedNodes) || wasTableRelated(e[i].removedNodes))) { reflowEvent(); break; } } }); mObs.observe(mutationElement, { childList: true, subtree: true });
            }
            $table.data('floatThead-attached', {
                destroy: function () {
                    var ns = '.fth-' + floatTheadId; unfloat(); $table.css(layoutAuto); $tableColGroup.remove(); createElements && $fthGrp.remove(); if ($newHeader.parent().length) { $newHeader.replaceWith($header); }
                    triggerFloatEvent(false); if (canObserveMutations) { mObs.disconnect(); mObs = null; }
                    $table.off('reflow reflowed'); $scrollContainer.off(ns); $responsiveContainer.off(ns); if (wrappedContainer) {
                        if ($scrollContainer.length) { $scrollContainer.unwrap(); }
                        else { $table.unwrap(); }
                    }
                    if (locked) { $scrollContainer.data('floatThead-containerWrap', false); } else { $table.data('floatThead-containerWrap', false); }
                    $table.css('minWidth', originalTableMinWidth); $floatContainer.remove(); $table.data('floatThead-attached', false); $window.off(ns); $window.off('fth-beforeprint fth-afterprint'); if (matchMediaPrint) { matchMediaPrint.removeListener(printEvent); }
                    beforePrint = afterPrint = function () { }; return function reinit() { return $table.floatThead(opts); }
                }, reflow: function () { reflowEvent(); }, setHeaderHeight: function () { setHeaderHeight(); }, getFloatContainer: function () { return $floatContainer; }, getRowGroups: function () { if (headerFloated) { return $floatContainer.find('>table>thead').add($table.children("tbody,tfoot")); } else { return $table.children("thead,tbody,tfoot"); } }
            });
        }); return this;
    };
})((function () {
    var $ = window.jQuery; if (typeof module !== 'undefined' && module.exports && !$) { $ = require('jquery'); }
    return $;
})());