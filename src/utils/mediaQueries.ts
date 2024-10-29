import facepaint from "facepaint";

const DESKTOP_WIDTH = 1280;
const TABLET_WIDTH = 740;
export const mq = facepaint([`@media(min-width: ${DESKTOP_WIDTH}px)`]);

// mobile / tablet / desktop
export const mqe = facepaint([
  `@media(min-width: ${TABLET_WIDTH}px)`,
  `@media(min-width: ${DESKTOP_WIDTH}px)`,
]);
