import { create } from "zustand";
import { nanoid } from "nanoid";
import { createTheme } from "@mui/material/styles";
import Audimat3000 from "../assets/fonts/Audimat3000-Regulier.woff2";
import SohneBuch from "../assets/fonts/Sohne-Buch.woff2";
import SohneKraftig from "../assets/fonts/Sohne-Kraftig.woff2";

const themeDefinition = {
  palette: {
    mode: "dark",
    primary: {
      main: "#405BFF",
    },
    secondary: {
      main: "#EBFF38",
    },
    neutral: {
      main: "#64748B",
    },
  },
  typography: {
    h2: {
      fontFamily: "Audimat",
    },
    h5: {
      fontFamily: "Kraftig",
    },
    h6: {
      fontFamily: "Kraftig",
      fontWeight: "bold",
      fontSize: "24px",
    },
    body1: {
      fontFamily: "Buch",
      color: "#e6e6e6",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
				@font-face {
					font-family: "Audimat";
					src: url(${Audimat3000}) format('woff2');
					font-weight: bold;
				}

				@font-face {
					font-family: 'Kraftig';
					src: url(${SohneKraftig}) format('woff2');
				}

				@font-face {
					font-family: 'Buch';
					src: local('Buch'), url(${SohneBuch}) format('woff2');
					font-weight: normal;
				}
			`,
    },
  },
};

const darkTheme = createTheme(themeDefinition);

const lightTheme = createTheme({
  ...themeDefinition,
  palette: {
    mode: "light",
    primary: {
      main: "#405BFF",
    },
    secondary: {
      main: "#EBFF38",
    },
    neutral: {
      main: "#64748B",
    },
  },
  typography: {
    h2: {
      fontFamily: "Audimat",
    },
    h5: {
      fontFamily: "Kraftig",
    },
    h6: {
      fontFamily: "Kraftig",
      fontWeight: "bold",
      fontSize: "24px",
    },
    body1: {
      fontFamily: "Buch",
    },
  },
});

export const useAppStore = create((set, get) => ({
  user: null,
  login({ username: _username }) {
    set({
      user: {
        username: _username,
      },
    });
  },
  logout() {
    set({ user: null });
  },
  addBrowserInfo(browserInfo) {
    const { browser, engine, ua, os, device, cpu } = browserInfo;
    set({
      browser,
      engine,
      userAgent: ua,
      operatingSystem: os,
      device,
      cpu,
    });
  },
  browser: null,
  engine: null,
  operatingSystem: null,
  device: null,
  cpu: null,
  userAgent: null,
  debugAllowList: [],
  updateAllowList(_allowList) {
    set({ debugAllowList: _allowList });
  },
  theme: darkTheme,
  themeName: "dark",
  allState() {
    const state = get();
    const stateEntries = Object.entries(state);
    const debugAllowList = get().debugAllowList;
    const entries = stateEntries
      .filter((entry) => {
        const [key, value] = entry;
        return (
          debugAllowList.includes(key) &&
          typeof value !== "function" &&
          key.match(/^[a-z\d]/i) &&
          !key.startsWith("allState")
        );
      })
      .map((entry) => {
        const [key, value] = entry;
        return {
          key,
          value,
        };
      });
    return entries;
  },
  toggleTheme() {
    set(() => {
      const currentTheme = get().themeName;

      if (currentTheme === "dark") {
        return {
          theme: lightTheme,
          themeName: "light",
        };
      }

      return {
        theme: darkTheme,
        themeName: "dark",
      };
    });
  },
}));
