import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';

// import routes
import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import Prices from './components/pages/Prices/PricesPage';
import Order from './components/pages/Order/OrderPage.js';

class App extends React.Component {

  render() {
    return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/order-a-ticket" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    );
  }

}

export default App;
