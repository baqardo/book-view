import { addInternalAsyncError, startLoading, endLoading } from '../store/actions/app';

const catchAsync = fn => {
  return async dispatch => {
    dispatch(startLoading());
    await fn(dispatch).catch(err => {
      console.log(err);
      dispatch(addInternalAsyncError(err));
    });
    dispatch(endLoading());
  };
};

export default catchAsync;
