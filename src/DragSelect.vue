<template>
  <div
    id="container"
    ref="container"
    style="position: relative; user-select: none; overflow: hidden; touch-action: none;"
  >
    <slot v-bind="{ selected: intersected }" />
  </div>
</template>

<script>
const getDimensions = (p1, p2) => ({
  width: Math.abs(p1.x - p2.x),
  height: Math.abs(p1.y - p2.y)
});
const collisionCheck = (node1, node2) =>
  node1.left < node2.left + node2.width &&
  node1.left + node1.width > node2.left &&
  node1.top < node2.top + node2.height &&
  node1.top + node1.height > node2.top;

export default {
  props: {
    attribute: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "#4299E1"
    },
    opacity: {
      type: Number,
      default: 0.7
    }
  },
  data() {
    return {
      intersected: []
    };
  },
  watch: {
    intersected(i) {
      this.$emit("change", i);
    }
  },
  mounted() {
    const { container } = this.$refs;
    const self = this;

    let containerRect = container.getBoundingClientRect();

    const getCoords = e => ({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top
    });

    let children;

    let box = document.createElement("div");
    box.setAttribute("data-drag-box-component", "");
    box.style.position = "absolute";
    box.style.backgroundColor = this.color;
    box.style.opacity = this.opacity;

    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };

    function intersection() {
      const rect = box.getBoundingClientRect();
      const intersected = children
        .filter((c) => collisionCheck(rect, c.getBoundingClientRect()))
        .map((c) => c.getAttribute(self.attribute));

      if (
        intersected.length !== self.intersected.length ||
        intersected.some((i) => !self.intersected.includes(i))
      )
        self.intersected = intersected;
    }

    function touchStart(e) {
      e.preventDefault();
      startDrag(e.touches[0]);
    }
    function touchMove(e) {
      e.preventDefault();
      drag(e.touches[0]);
    }

    function startDrag(e) {
      containerRect = container.getBoundingClientRect();
      children = Array.from(container.querySelectorAll(`[${self.attribute}]`));
      start = getCoords(e);
      end = start;
      document.addEventListener("mousemove", drag);
      document.addEventListener("touchmove", touchMove);

      box.style.top = start.y + "px";
      box.style.left = start.x + "px";

      container.prepend(box);
      intersection();
    }

    function drag(e) {
      end = getCoords(e);
      const dimensions = getDimensions(start, end);

      if (end.x < start.x) {
        box.style.left = end.x + "px";
      }
      if (end.y < start.y) {
        box.style.top = end.y + "px";
      }
      box.style.width = dimensions.width + "px";
      box.style.height = dimensions.height + "px";

      intersection();
    }

    function endDrag() {
      start = { x: 0, y: 0 };
      end = { x: 0, y: 0 };

      box.style.width = 0;
      box.style.height = 0;

      document.removeEventListener("mousemove", drag);
      document.removeEventListener("touchmove", touchMove);
      box.remove();
    }

    container.addEventListener("mousedown", startDrag);
    container.addEventListener("touchstart", touchStart);

    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);

    this.$once("on:destroy", () => {
      container.removeEventListener("mousedown", startDrag);
      container.removeEventListener("touchstart", touchStart);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
    });
  }
};
</script>
