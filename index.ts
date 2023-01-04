const ymapsTouchScroll = (
  map: ymaps.Map,
  {
    preventScroll = true,
    preventTouch = true,
    textScroll = "Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl",
    textTouch = "Чтобы переместить карту проведите по ней двумя пальцами",
  }: {
    preventScroll?: boolean;
    preventTouch?: boolean;
    textScroll?: string;
    textTouch?: string;
  } = {}
) => {
  if (
    typeof window === "undefined" ||
    typeof map !== "object" ||
    (!preventScroll && !preventTouch)
  )
    return;

  const eventsPane = map.panes.get("events");

  if (!eventsPane) return;

  const eventsPaneEl = eventsPane.getElement();

  const isTouch =
    /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);

  const text = isTouch ? textTouch : textScroll;

  const styles = {
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

  Object.keys(styles).forEach((key) => {
    const name = key as keyof typeof styles;
    eventsPaneEl.style[name] = styles[name];
  });

  const hintToggle = (fl: boolean) => {
    eventsPaneEl.style.background = `rgba(0, 0, 0, ${fl ? ".6" : "0"})`;
    eventsPaneEl.textContent = fl ? text : "";
  };

  if (preventTouch && isTouch) {
    map.behaviors.disable("drag");

    eventsPaneEl.addEventListener("touchstart", (e) => {
      hintToggle(e.touches.length === 1);
    });

    eventsPaneEl.addEventListener("touchend", (e) => {
      hintToggle(false);
    });
  }

  if (preventScroll && !isTouch) {
    const scrollToggle = (fl: boolean) => {
      map.behaviors[fl ? "enable" : "disable"]("scrollZoom");
    };

    let isMouseEnter = false;
    let isCtrlPress = false;

    scrollToggle(false);

    eventsPane.events.add("wheel", () => {
      if (!isMouseEnter) return;

      scrollToggle(isCtrlPress);
      hintToggle(!isCtrlPress);
    });

    eventsPane.events.add("mousedown", () => {
      hintToggle(false);
    });

    eventsPane.events.add("mouseenter", () => {
      isMouseEnter = true;
    });

    eventsPane.events.add("mouseleave", () => {
      isMouseEnter = false;
      hintToggle(false);
    });

    document.addEventListener("keydown", (e) => {
      isCtrlPress = e.ctrlKey;
      if (isCtrlPress) hintToggle(false);
    });

    document.addEventListener("keyup", () => {
      isCtrlPress = false;
    });
  }
};

export default ymapsTouchScroll;
