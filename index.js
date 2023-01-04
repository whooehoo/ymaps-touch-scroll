"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ymapsTouchScroll = function (map, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.preventScroll, preventScroll = _c === void 0 ? true : _c, _d = _b.preventTouch, preventTouch = _d === void 0 ? true : _d, _e = _b.textScroll, textScroll = _e === void 0 ? "Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl" : _e, _f = _b.textTouch, textTouch = _f === void 0 ? "Чтобы переместить карту проведите по ней двумя пальцами" : _f;
    if (typeof window === "undefined" ||
        typeof map !== "object" ||
        (!preventScroll && !preventTouch))
        return;
    var eventsPane = map.panes.get("events");
    if (!eventsPane)
        return;
    var eventsPaneEl = eventsPane.getElement();
    var isTouch = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
    var text = isTouch ? textTouch : textScroll;
    var styles = {
        alignItems: "center",
        boxSizing: "border-box",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center",
        transition: "background .2s",
        touchAction: "auto",
    };
    Object.keys(styles).forEach(function (key) {
        var name = key;
        eventsPaneEl.style[name] = styles[name];
    });
    var hintToggle = function (fl) {
        eventsPaneEl.style.background = "rgba(0, 0, 0, ".concat(fl ? ".6" : "0", ")");
        eventsPaneEl.textContent = fl ? text : "";
    };
    if (preventTouch && isTouch) {
        map.behaviors.disable("drag");
        eventsPaneEl.addEventListener("touchstart", function (e) {
            hintToggle(e.touches.length === 1);
        });
        eventsPaneEl.addEventListener("touchend", function (e) {
            hintToggle(false);
        });
    }
    if (preventScroll && !isTouch) {
        var scrollToggle_1 = function (fl) {
            map.behaviors[fl ? "enable" : "disable"]("scrollZoom");
        };
        var isMouseEnter_1 = false;
        var isCtrlPress_1 = false;
        scrollToggle_1(false);
        eventsPane.events.add("wheel", function () {
            if (!isMouseEnter_1)
                return;
            scrollToggle_1(isCtrlPress_1);
            hintToggle(!isCtrlPress_1);
        });
        eventsPane.events.add("mousedown", function () {
            hintToggle(false);
        });
        eventsPane.events.add("mouseenter", function () {
            isMouseEnter_1 = true;
        });
        eventsPane.events.add("mouseleave", function () {
            isMouseEnter_1 = false;
            hintToggle(false);
        });
        document.addEventListener("keydown", function (e) {
            isCtrlPress_1 = e.ctrlKey;
            if (isCtrlPress_1)
                hintToggle(false);
        });
        document.addEventListener("keyup", function () {
            isCtrlPress_1 = false;
        });
    }
};
exports.default = ymapsTouchScroll;
