import Header from "./components/Header";
import AppRoute from "./Routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import Footer from "./components/Footer";

const App = () => {
  return (
    <DefaultLayout>
      <Header />
      <AppRoute />
      <Footer />
    </DefaultLayout>
  );
};

export default App;
