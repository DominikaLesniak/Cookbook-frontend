import React from 'react';

const userContext = React.createContext(
  {
    user: {},
    login: () => {},
    logout: () => {}
});

export {
  userContext
};