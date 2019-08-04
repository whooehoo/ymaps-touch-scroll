const ymapsTouchScroll = (
  map,
  {
    preventScroll = true,
    preventTouch = true,
    textScroll = "Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl",
    textTouch = "Чтобы переместить карту проведите по ней двумя пальцами"
  } = {}
) => {
  if (
    typeof window === "undefined" ||
    typeof map !== "object" ||
    (!preventScroll && !preventTouch) ||
    typeof textScroll !== "string" ||
    typeof textTouch !== "string"
  )
    return;

  const isTouch =
    /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);

  const eventsPane = map.panes.get("events");
  const eventsPaneEl = eventsPane.getElement();

  const text = isTouch ? textTouch : textScroll;

  const styles = {
    alignItems: "center",
    boxSizing: "border-box",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
    transition: "background .2s",
    touchAction: "auto"
  };

  Object.keys(styles).forEach(name => {
    eventsPaneEl.style[name] = styles[name];
  });

  const hintToggle = fl => {
    eventsPaneEl.style.background = `rgba(0, 0, 0, ${fl ? ".6" : "0"})`;
    eventsPaneEl.textContent = fl ? text : "";
  };

  if (preventTouch && isTouch) {
    map.behaviors.disable("drag");

    ymaps.domEvent.manager.add(eventsPaneEl, "touchmove", e => {
      hintToggle(e.get("touches").length === 1);
    });

    ymaps.domEvent.manager.add(eventsPaneEl, "touchend", () => {
      hintToggle(false);
    });
  }

  if (preventScroll && !isTouch) {
    const scrollToggle = fl => {
      const behavior = "scrollZoom";
      fl ? map.behaviors.enable(behavior) : map.behaviors.disable(behavior);
    };

    let isMouseEnter = false;
    let isCtrlPress = false;

    scrollToggle(false);

    eventsPane.events.add("wheel", () => {
      if (!isMouseEnter) return;

      scrollToggle(isCtrlPress);
      hintToggle(!isCtrlPress);
    });

    eventsPane.events.add("mouseenter", () => {
      isMouseEnter = true;
    });

    eventsPane.events.add("mouseleave", () => {
      isMouseEnter = false;
      hintToggle(false);
    });

    document.addEventListener("keydown", e => {
      isCtrlPress = e.ctrlKey;
      if (isCtrlPress) hintToggle(false);
    });

    document.addEventListener("keyup", () => {
      isCtrlPress = false;
    });
  }
};

export default ymapsTouchScroll;
