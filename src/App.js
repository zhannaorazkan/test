import './App.css';
import ConfigFilePage from "./components/configPage/ConfigPage";
import LoginPage from "./components/login/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./protectedRoutes/PrivateRoutes";
import CreateConfig from "./components/createConfig/CreateConfig";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {Layout} from "antd";
import Sidebar from "./components/sidebar/Sidebar";
import {Content} from "antd/es/layout/layout";

function App() {

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/*"
                        element={
                            <>
                                <Sidebar />
                                <Layout>
                                    <Content style={{ padding: '24px' }}>
                                        <Routes>
                                            <Route path="/" element={<PrivateRoutes/>}>
                                            <Route path="/config" element={<ConfigFilePage />} />
                                            <Route path="/create-config" element={<CreateConfig />} />
                                            </Route>
                                        </Routes>
                                    </Content>
                                </Layout>
                            </>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;
