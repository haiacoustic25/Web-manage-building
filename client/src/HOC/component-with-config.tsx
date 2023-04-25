import React from 'react';
import { RootState, store, useAppSelector } from '../redux/store';
import '../assets/styles/layoutWrapper.scss';

const renderComponentWithConfig = (WrappedComponent: any) => {
  const access_token = store.getState().dataUser.access_token;
  const user = store.getState().dataUser.user;
  // const user = useAppSelector((state: RootState) => state.dataUser.user);
  // console.log({ user });
  const ComponentWithConfig = (props: any) => {
    return <WrappedComponent {...props} access_token={access_token} user={user} />;
  };
  return ComponentWithConfig;
};

export default renderComponentWithConfig;
