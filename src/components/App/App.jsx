import s from './App.module.css';
import Spinner from 'components/Spinner';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ProductsListView = lazy(() => import('views/ProductsListView'));
const ProductView = lazy(() => import('views/ProductView'));

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
