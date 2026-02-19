import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './header.css';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = Cookies.get("jwtToken");
    const adminToken = localStorage.getItem("adminJwtToken");

    useEffect(() => {
        setIsAdmin(!!adminToken);
    }, [adminToken]);

    const navigate = useNavigate();

    const onLogout = () => {
        const res = window.confirm("Are you sure you want to log out?");
        if (res) {
            localStorage.clear();
            Cookies.remove("jwtToken");
            Cookies.remove("adminJwtToken");
            navigate('/login');
        }
    };

    return (
        <Navbar
            fixed="top"
            expand="lg"
            className={`custom-navbar ${isAdmin ? 'admin-navbar' : ''}`}
        >
            <Navbar.Brand
                as={Link}
                to={isAdmin ? "/admin/dashboard" : "/"}
                className="brand-logo"
            >
                🛒 G-Mart
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto nav-links">

                    {isAdmin ? (
                        <>
                            <NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
                            <NavLink to="/admin/all-products" className="nav-link">Products</NavLink>
                            <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
                            <NavLink to="/admin/users" className="nav-link">Users</NavLink>

                            <NavDropdown title="More" id="admin-dropdown">
                                <NavDropdown.Item>Reports</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/my-cart" className="nav-link">MyCart</NavLink>
                            <NavLink to="/my-orders" className="nav-link">Orders</NavLink>
                            <NavLink to="/my-history" className="nav-link">History</NavLink>

                            {!token ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        className="nav-link login-btn"
                                    >
                                        User Login
                                    </NavLink>

                                    <NavLink
                                        to="/alogin"
                                        className="nav-link admin-btn"
                                    >
                                        Admin Login
                                    </NavLink>
                                </>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="nav-link logout-btn"
                                    onClick={onLogout}
                                >
                                    Logout
                                </NavLink>
                            )}
                        </>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
