const { createSagaMiddleware, effects } = require('./saga');
const { createStore, applyMiddleware } = require('redux');

const { select, put, take, call } = effects;

const reducer = (state, action) => {
  console.log('→ ', action);
  switch (action.type) {
    case 'SET_FOO':
      return { ...state, foo: action.payload };
  }
  return state;
};

const selectFoo = state => state.foo;

const rootSaga = function*() {
  console.log({ oldFoo: yield select(selectFoo) });

  yield put({ type: 'SET_FOO', payload: 'FOO' });

  console.log({ newFoo: yield select(selectFoo) });
};

const sagaMiddleware = createSagaMiddleware();
console.log(sagaMiddleware.run);

const store = createStore(
  reducer,
  { foo: 'foo' },
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: 'RANDOM_ACTION' });
