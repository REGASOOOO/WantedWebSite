import "./styles/index.scss";
import Map from "./component/Map";
import Liste from "./component/liste";
import Criminal from "./component/Criminal";
import { BreadcrumbProvider, useBreadcrumb } from './component/BreadCrumb';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import { React } from 'react';
import { Footer } from "antd/es/layout/layout";


function App() {

  const location = useLocation();
  const { Header, Content } = Layout;
  const { breadcrumbItems } = useBreadcrumb();


  const appClassName = location.pathname === "/" ? "App flex-layout" : "App default-layout";

  return (
    <Layout>
      <Header>
        <img src="/src/assets/FBI.png" alt="Logo" className="header-image" />
        <Breadcrumb items={breadcrumbItems} />
      </Header>
      <Content>
        <div className={appClassName}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/:statesName/:uid" element={<Criminal />} />
            <Route path="/:statesName" element={<Liste />} />
          </Routes>
        </div>
      </Content>
      <Footer>
        <div className="footer">
          WantedWebSite all rights reserved © 2024-2025 <br />
          Give me 100 euro if you don't want to end up posted.
        </div>
      </Footer>
    </Layout >
  )

}

export default function AppWrapper() {
  return (
    <Router>
      <BreadcrumbProvider>
        <App />
      </BreadcrumbProvider>
    </Router>
  );
}