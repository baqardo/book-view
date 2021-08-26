import { addAsyncError, startLoading, endLoading } from '../store/actions/app';

const catchAsync = fn => {
  return async dispatch => {
    dispatch(startLoading());
    await fn(dispatch).catch(err => {
      dispatch(addAsyncError(err));
    });
    dispatch(endLoading());
  };
};

export default catchAsync;
