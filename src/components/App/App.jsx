import s from './App.module.css';
import Spinner from 'components/Spinner';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductsListView from 'views/ProductsListView';
import ProductView from 'views/ProductView';

const App = () => {
  return (
    <div className={s.app}>
      <main>
        <Suspense fallback={<Spinner size={40} />}>
          <Switch>
            <Route exact path={'/products'}>
              <ProductsListView />
            </Route>
            <Route path={'/products/:id'}>
              <ProductView />
            </Route>
            <Redirect to={'/products'} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
