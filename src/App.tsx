import { Navbar } from "./common/components/Navbar.component";
import { AppI18nProvider } from "./common/i18n/I18nProvider.context";
import { allLanguages } from "./common/i18n/messages/messages.constants";
import { AppThemeProvider } from "./common/themes/Theme.context";
import { themeOptions } from "./common/themes/themes/themes.constants";
import { AppRouter } from "./common/routers/routers";
import { Provider } from "react-redux";
import { reduxStore } from "./common/stores";
import ramBg from "./assets/images/ram-bg.png"

function App() {
  return (
    <div>
      <Provider store={reduxStore}>
        <AppI18nProvider allLanguages={allLanguages}>
          <AppThemeProvider themes={themeOptions}>
            <div className="fixed flex h-full w-full justify-center">
              <img className="opacity-80 -z-10" src={ramBg} alt="ram-bg" />
            </div>
            <Navbar />
            <AppRouter />
          </AppThemeProvider>
        </AppI18nProvider>
      </Provider>
    </div>
  );
}

export default App;
