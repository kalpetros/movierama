import 'normalize.css';
import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { ConfigurationStateProvider } from './store/ConfigurationContext';
import { GenreStateProvider } from './store/GenreContext';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Movies } from './movies/main';
import { MoviesStateProvider } from './store/MoviesContext';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const App = () => {
  return (
    <ConfigurationStateProvider>
      <GenreStateProvider>
        <MoviesStateProvider>
          <nav className="nav">
            <div>
              <a href="/">MovieRama</a>
            </div>
          </nav>
          <Header />
          <Layout>
            <Movies />
          </Layout>
        </MoviesStateProvider>
      </GenreStateProvider>
    </ConfigurationStateProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
