"use client";

import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isUserAuthenticated } from "../../../utils/auth";
import LoginRegistrationBackdrop from "./LoginRegistrationBackdrop";

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const getIsAuthenticated = async () => {
            let res = await isUserAuthenticated();
            setIsAuthenticated(res);
        };
        getIsAuthenticated();
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "white",
                    color: "black",
                    height: "73px",
                    marginBottom: "12px",
                    boxShadow:
                        "rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="xl" disableGutters>
                    <Toolbar sx={{ paddingX: { md: "24px", xs: "3px" } }} disableGutters>
                        {/* navbar icon */}
                        <Box
                            component="a"
                            href="/"
                            sx={{
                                display: { xs: "none", sm: "flex" },
                            }}
                        >
                            <img style={{ height: "56px" }} src={"/logo.png"} alt="logo"></img>
                        </Box>

                        {/* navbar content that displayed when width breakpoint smaller than sm */}
                        <Box sx={{ flexGrow: 1, alignItems: "center", display: { xs: "flex", sm: "none" } }}>
                            <Box sx={{ display: "flex", flexGrow: 1 }}>
                                <IconButton
                                    size="large"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    sx={{ padding: "10px" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    keepMounted
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{ display: { xs: "block", md: "none" } }}
                                >
                                    <Link
                                        href={isAuthenticated === true ? "/profile" : "#"}
                                        onClick={() => {
                                            if (isAuthenticated === false) {
                                                setOpen(true);
                                            }
                                        }}
                                    >
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: "center" }}>Профіль</Typography>
                                        </MenuItem>
                                    </Link>

                                    <Link href="#">
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: "center" }}>Обране</Typography>
                                        </MenuItem>
                                    </Link>
                                </Menu>

                                <Box
                                    component="a"
                                    href="/"
                                    sx={{
                                        display: { xs: "flex", md: "none" },
                                    }}
                                >
                                    <img
                                        style={{ height: "44px", marginLeft: "10px", marginRight: "10px" }}
                                        src={"/logo.png"}
                                        alt="logo"
                                    ></img>
                                </Box>

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#5fb022",
                                                borderWidth: "2px",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#5fb022",
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#5fb022",
                                            },
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                height: 42,
                                            },
                                        },
                                    }}
                                    placeholder="Пошук"
                                    type="search"
                                />
                            </Box>
                            <IconButton
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "16px",
                                    marginLeft: "8px",
                                    width: "65px",
                                }}
                            >
                                <ShoppingCartIcon />
                                <Typography>Кошик</Typography>
                            </IconButton>
                        </Box>

                        {/* search input that displayed when width breakpoint larger than sm */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "flex" },
                                justifyContent: "center",
                                alignItems: "center",
                                width: "20%",
                            }}
                        >
                            <TextField
                                sx={{
                                    width: { sm: "50%", md: "70%" },
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#5fb022",
                                            borderWidth: "2px",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#5fb022",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#5fb022",
                                        },
                                    },
                                }}
                                slotProps={{
                                    input: {
                                        sx: {
                                            height: 42,
                                            borderTopRightRadius: "0",
                                            borderEndEndRadius: "0",
                                        },
                                    },
                                }}
                                placeholder="Пошук"
                                type="search"
                            />
                            <Button
                                sx={{
                                    borderTopLeftRadius: "0",
                                    borderEndStartRadius: "0",
                                    height: 43,
                                    color: "white",
                                    fontWeight: "bold",
                                    boxShadow: "0",
                                }}
                                variant="contained"
                                color="main"
                                startIcon={<SearchIcon />}
                            >
                                Пошук
                            </Button>
                        </Box>
                        {/* icons that displayed when width breakpoint larger than sm */}
                        <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "flex" } }}>
                            <IconButton
                                href={isAuthenticated === true ? "/profile" : "#"}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "16px",
                                    marginX: { sm: "0px", md: "8px" },
                                    width: "80px",
                                }}
                                onClick={() => {
                                    if (isAuthenticated === false) {
                                        setOpen(true);
                                    }
                                }}
                            >
                                <PersonIcon />
                                <Typography>Профіль</Typography>
                            </IconButton>

                            <IconButton
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "16px",
                                    marginX: { sm: "0px", md: "8px" },
                                    width: "80px",
                                }}
                            >
                                <FavoriteIcon />
                                <Typography>Обране</Typography>
                            </IconButton>

                            <IconButton
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "16px",
                                    marginX: { sm: "0px", md: "8px" },
                                    width: "80px",
                                }}
                            >
                                <ShoppingCartIcon />
                                <Typography>Кошик</Typography>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginRegistrationBackdrop open={open} setOpen={setOpen} setIsAuthenticated={setIsAuthenticated} />
        </>
    );
}

export default Navbar;
