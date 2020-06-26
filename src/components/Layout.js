import React from 'react';
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <main className="layout">
      <section>{children}</section>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
