const effects = {
  put: action => ({ type: 'put', action }),
  take: pattern => ({ type: 'take', pattern }),
  call: (fn, ...args) => ({ type: 'call', fn, args }),
  select: (selector, ...args) => ({ type: 'select', selector, args })
};

const createSagaMiddleware = () => {
  const middleware = function({ getState, dispatch }) {
    middleware.run = saga => {
      const gen = saga();

      function sagaStep({ value, done }) {
        if (done) {
          return;
        }
        switch (value.type) {
          case 'put':
            dispatch(value.action);
            sagaStep(gen.next());
            break;

          case 'select':
            const selected = value.selector(getState(), ...value.args);
            sagaStep(gen.next(selected));
            break;
        }
      }
      sagaStep(gen.next());
    };

    return nextDispatch => {
      return action => {
        return nextDispatch(action);
      };
    };
  };

  return middleware;
};

module.exports = { effects, createSagaMiddleware };
