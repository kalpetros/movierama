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

const App = () => {
  return (
    <ConfigurationStateProvider>
      <MoviesStateProvider>
        <GenreStateProvider>
          <nav className="nav">
            <div>
              <a href="/">MovieRama</a>
            </div>
          </nav>
          <Header />
          <Layout>
            <main>
              <section>
                <Movies />
              </section>
            </main>
          </Layout>
        </GenreStateProvider>
      </MoviesStateProvider>
    </ConfigurationStateProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
