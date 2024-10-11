import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
// import { useQuery } from "@tanstack/react-query";
// import { getCurrent } from "../../Pages/Home/api";
export const Layout: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
