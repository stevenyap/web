import {
  CSSInterpolation,
  CSSObject,
  keyframes as keyframes_,
} from "@emotion/css"

export const colors = {
  // main colors
  primary: "#00205C", // blue500
  secondary: "#00A7E1", // cyan500
  transparent: "transparent",
  // all colors
  blue50: "#EAF1FF",
  blue100: "#D5DBE8",
  blue200: "#8A98B4",
  blue300: "#546A92",
  blue400: "#334D7D",
  blue500: "#00205C",
  cyan50: "#E6F6FC",
  cyan100: "#B0E4F6",
  cyan200: "#8AD7F1",
  cyan300: "#54C4EB",
  cyan400: "#33B9E7",
  cyan500: "#00A7E1",
  neutral50: "#FFFFFF",
  neutral100: "#FBFBFB",
  neutral200: "#F2F2F2",
  neutral300: "#E8E8E8",
  neutral400: "#DCDCDC",
  neutral500: "#B0B0B0",
  neutral600: "#8C8C8C",
  neutral700: "#6E6E6E",
  neutral800: "#4D4D4D",
  neutral900: "#000000",
  orange50: "#FFF6E8",
  orange100: "#FEE4BA",
  orange500: "#FAA61A",
  green50: "#E6FAEC",
  green500: "#00CC40",
  lime500: "#CBDB2A",
  silver500: "#465669",
  pink50: "#FDE9F1",
  pink500: "#E82370",
  purple50: "#F2EAF7",
  purple500: "#782EB1",
  red50: "#FEE9E6",
  red500: "#F22000",
  yellow500: "#F9EB00",
  violet500: "#DB00FF",
}

// Use css filter to change color of an image to reuse svg file.
// https://codepen.io/sosuke/pen/Pjoqqp
export const colorFilters = {
  reset: "brightness(0) saturate(100%)",
  primary:
    "invert(8%) sepia(100%) saturate(2994%) hue-rotate(210deg) brightness(97%) contrast(108%)",
  blue200:
    "invert(61%) sepia(19%) saturate(445%) hue-rotate(182deg) brightness(97%) contrast(81%)",
  blue300:
    "invert(43%) sepia(36%) saturate(527%) hue-rotate(180deg) brightness(86%) contrast(85%)",
  cyan500:
    "invert(51%) sepia(26%) saturate(7001%) hue-rotate(165deg) brightness(99%) contrast(101%)",
  green500:
    "invert(59%) sepia(17%) saturate(6220%) hue-rotate(97deg) brightness(97%) contrast(102%)",
  neutral50:
    "invert(100%) sepia(100%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)",
  neutral300:
    "invert(98%) sepia(87%) saturate(1%) hue-rotate(205deg) brightness(110%) contrast(82%)",
  neutral400:
    "invert(99%) sepia(1%) saturate(1093%) hue-rotate(245deg) brightness(106%) contrast(73%)",
  neutral800:
    "invert(25%) sepia(0%) saturate(0%) hue-rotate(115deg) brightness(104%) contrast(83%)",
}

export const breakpoint = {
  sm: (a: CSSInterpolation) => ({
    "@media (min-width: 640px)": a,
  }),
  md: (a: CSSInterpolation) => ({
    "@media (min-width: 768px)": a,
  }),
  lg: (a: CSSInterpolation) => ({
    "@media (min-width: 1024px)": a,
  }),
  xl: (a: CSSInterpolation) => ({
    "@media (min-width: 1280px)": a,
  }),
}

export const darkmode = (a: CSSObject) => ({
  "@media (prefers-color-scheme: dark)": a,
})

export const capability = {
  mouse: (a: CSSObject) => ({
    "@media (pointer: fine)": a,
  }),
}

export const theme = {
  // spaces
  s0: "0",
  s0_25: "1px",
  s0_5: "2px",
  s1: "4px",
  s2: "8px",
  s3: "12px",
  s4: "16px",
  s5: "20px",
  s6: "24px",
  s7: "28px",
  s8: "32px",
  s9: "36px",
  s10: "40px",
  s11: "44px",
  s12: "48px",
  s13: "52px",
  s14: "56px",
  s15: "60px",
  s16: "64px",
  s17: "68px",
  s18: "72px",
  s19: "76px",
  s20: "80px",
  s21: "84px",
  s22: "88px",
  s23: "92px",
  s24: "96px",
  s30: "120px",
  s31: "124px",
  s32: "128px",
  s34: "136px",
  s36: "144px",
  s38: "152px",
  s39: "156px",
  s40: "160px",
  s43: "172px",
  s44: "176px",
  s45: "180px",
  s47: "188px",
  s50: "200px",
  s75: "300px",
  s82: "328px",
  s90: "360px",
  s120: "480px",
  s150: "600px",
  s160: "640px",
  s200: "800px",
  // border-radius
  br0: "0px",
  br0_5: "2px",
  br1: "4px",
  br2: "8px",
  br3: "12px",
  br4: "16px",
  br5: "20px",
  br6: "24px",
  brFull: "999px",
  // Elevation
  elevation: {
    small: "0px 2px 8px 0px rgba(0, 32, 92, 0.06)",
    medium: "0px 4px 16px 0px rgba(0, 32, 92, 0.08)",
    large:
      "0px 8px 8px -4px rgba(0, 32, 92, 0.03), 0px 8px 24px -4px rgba(0, 32, 92, 0.08)",
  },
  // Background opacity eg. `background: theme.opacity4`
  opacity1: "rgba(0, 0, 0, 0.1)",
  opacity4: "rgba(0, 0, 0, 0.4)",
  opacity5: "rgba(0, 0, 0, 0.5)",
  opacity7: "rgba(0, 0, 0, 0.7)",
  opacity8: "rgba(0, 0, 0, 0.8)",
}

const _body = {
  fontFamily: "ubuntu",
  // Force developer to always care about color in text
  color: colors.red500,
}
const _bodyXSmall = {
  ..._body,
  fontSize: "12px",
  lineHeight: "14px",
}
const _bodySmall = {
  ..._body,
  fontSize: "14px",
  lineHeight: "18px",
}
const _bodyMedium = {
  ..._body,
  fontSize: "16px",
  lineHeight: "20px",
}
const _bodyLarge = {
  ..._body,
  fontSize: "18px",
  lineHeight: "20px",
}
const _bodyXLarge = {
  ..._body,
  fontSize: "20px",
  lineHeight: "24px",
}

/** Text sizes */
export const heading = {
  h4: {
    ..._body,
    margin: 0,
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "36px",
  },
  h5: {
    ..._body,
    margin: 0,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "28px",
  },
  h6: {
    ..._body,
    margin: 0,
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "24px",
  },
}

export const body = {
  xxxsmall: {
    ..._body,
    fontSize: "10px",
    lineHeight: "10px",
    fontWeight: 400,
  },
  xsmall: {
    bold: {
      ..._bodyXSmall,
      fontWeight: 700,
    },
    medium: {
      ..._bodyXSmall,
      fontWeight: 500,
    },
    regular: {
      ..._bodyXSmall,
      fontWeight: 400,
    },
    link: {
      ..._bodyXSmall,
      fontWeight: 400,
    },
  },
  small: {
    bold: {
      ..._bodySmall,
      fontWeight: 700,
    },
    medium: {
      ..._bodySmall,
      fontWeight: 500,
    },
    regular: {
      ..._bodySmall,
      fontWeight: 400,
    },
    link: {
      ..._bodySmall,
      fontWeight: 400,
    },
  },
  medium: {
    bold: {
      ..._bodyMedium,
      fontWeight: 700,
    },
    medium: {
      ..._bodyMedium,
      fontWeight: 500,
    },
    regular: {
      ..._bodyMedium,
      fontWeight: 400,
    },
    link: {
      ..._bodyMedium,
      fontWeight: 400,
    },
  },
  large: {
    bold: {
      ..._bodyLarge,
      fontWeight: 700,
    },
    medium: {
      ..._bodyLarge,
      fontWeight: 500,
    },
    regular: {
      ..._bodyLarge,
      fontWeight: 400,
    },
    link: {
      ..._bodyLarge,
      fontWeight: 400,
    },
  },
  xlarge: {
    bold: {
      ..._bodyXLarge,
      fontWeight: 700,
    },
    medium: {
      ..._bodyXLarge,
      fontWeight: 500,
    },
    regular: {
      ..._bodyXLarge,
      fontWeight: 400,
    },
    link: {
      ..._bodyXLarge,
      fontWeight: 400,
    },
  },
}

const loading = keyframes_`
  0% {
    box-shadow: -38px 0 0 -2px, -14px 0 0 -2px, 14px 0 0 -2px;
  }
  25% {
    box-shadow: -38px 0 0 2px, -14px 0 0 -2px, 14px 0 0 -2px;
  }
  50% {
    box-shadow: -38px 0 0 -2px, -14px 0 0 2px, 14px 0 0 -2px;
  }
  75% {
    box-shadow: -38px 0 0 -2px, -14px 0 0 -2px, 14px 0 0 2px;
  }
  100% {
    box-shadow: -38px 0 0 -2px, -14px 0 0 -2px, 14px 0 0 -2px;
  }
`

const fadeIn = keyframes_`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeIn50 = keyframes_`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

const lightBlueFade = keyframes_`
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`

const slideInUp = keyframes_`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`

const slideInLeft = keyframes_`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const slideInRight = keyframes_`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`

const spin = keyframes_`
  100% {
    transform: rotate(360deg);
  }
`

const shake = keyframes_`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(25deg);
  }
  40% {
    transform: rotate(-25deg);
  }
  60% {
    transform: rotate(35deg);
  }
  80% {
    transform: rotate(-35deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const zoom2 = keyframes_`
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1.2, 1.2);
  }
`

const animateCurrentDot = keyframes_`
  0% {
    padding: 0;
  }
  100% {
    padding: 0 ${theme.s2};
  }
`

export const keyframes = {
  loading,
  fadeIn,
  lightBlueFade,
  slideInUp,
  slideInLeft,
  slideInRight,
  spin,
  shake,
  fadeIn50,
  zoom2,
  animateCurrentDot,
}

const button = {
  border: "none",
  borderRadius: theme.brFull,
  cursor: "pointer",
  "&:disabled": {
    opacity: 0.5,
    cursor: "initial",
  },
}

export const buttons = {
  link: {
    textDecoration: "none",
    cursor: "pointer",
  },
  empty: {
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.5,
      cursor: "initial",
    },
  },
  primary: {
    s2: {
      ...button,
      ...body.small.regular,
      background: colors.blue500,
      color: colors.neutral50,
      padding: theme.s2,
    },
    s5: {
      ...button,
      ...body.large.medium,
      background: colors.blue500,
      color: colors.neutral50,
      padding: theme.s5,
    },
  },
  white: {
    s2: {
      ...button,
      ...body.small.regular,
      background: colors.neutral50,
      color: colors.blue500,
      padding: theme.s2,
    },
    s5: {
      ...button,
      ...body.large.medium,
      background: colors.neutral50,
      color: colors.blue500,
      padding: theme.s5,
    },
  },
}

export const hideScrollbar: CSSObject = {
  msOverflowStyle: "none", // Edge
  scrollbarWidth: "none", // Firefox
  "::-webkit-scrollbar": {
    display: "none", // Chrome and Safari
  },
}

export const layoutSize = {
  menuHeight: theme.s13,
  subMenuHeight: theme.s13,
  sidebarWidth: theme.s47,
  mainPadding: theme.s4,
  mainContainerMaxWidth: "844px",
  footerHeight: theme.s12,
}
export const mainContainerWidth = `calc(100dvw - ${layoutSize.sidebarWidth} - ${layoutSize.mainPadding})`

export function getAvatarColor(name: string): string {
  const colors_ = ["#EAF1FF", "#E6FAEC"]
  return colors_[name.length % colors_.length]
}

export function getBannerGradient(name: string): string {
  const colors_ = [
    `radial-gradient(circle farthest-side at 65% 200%,${colors.cyan500}, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,${colors.green500}, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,${colors.yellow500}, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,${colors.pink500}, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,${colors.violet500}, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,#0059FF, ${colors.blue500})`,
    `radial-gradient(circle farthest-side at 65% 200%,${colors.blue200}, ${colors.blue500})`,
  ]
  return colors_[name.length % colors_.length]
}

export function scrollPositionHandler(
  containerID: string,
  loadMoreFn: () => void,
  scrollPositionFn: (v: number) => void,
): void {
  const scroller = document.getElementById(containerID)
  if (scroller) {
    const { scrollHeight, scrollTop, clientHeight } = scroller
    const gap = 200
    if (scrollHeight - gap < scrollTop + clientHeight) {
      loadMoreFn()
    }

    scrollPositionFn(scrollTop)
  }
}

export function scrollBottomHandler(
  containerID: string,
  scrollBottomFn: () => void,
): void {
  const scroller = document.getElementById(containerID)
  if (scroller) {
    const { scrollHeight, scrollTop, clientHeight } = scroller
    const gap = 0.2 * clientHeight

    if (scrollHeight - gap < scrollTop + clientHeight) scrollBottomFn()
  }
}

export function setBrowserThemeColor(
  theme: "Blue" | "White" | "Purple" | "Pink",
): void {
  const metaThemeColor = document.querySelector("meta[name='theme-color']")

  switch (theme) {
    case "Blue":
      return metaThemeColor?.setAttribute("content", colors.primary)
    case "White":
      return metaThemeColor?.setAttribute("content", "#FFFFFF")
    case "Purple":
      return metaThemeColor?.setAttribute("content", colors.purple500)
    case "Pink":
      return metaThemeColor?.setAttribute("content", colors.pink500)
  }
}
