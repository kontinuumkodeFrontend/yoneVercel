import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { modalVisible, popupVisible } from "../redux/actions/commonAction";
import { MODAL_TYPE, POPUP_TYPE } from "../services/Constants";
import { useDispatch } from "react-redux";
import Link from 'next/link';
import { useContext } from "react";
import UserContext from "../context/userContextAPI";

export default function MenuDrawer({ listItem, anchor }) {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
  };

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.SIGN_UP));
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(popupVisible?.popupOpen(POPUP_TYPE?.LOGOUT));
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Link href="/">
            <img src={'/images/innerPages/whiteLogo.png'} alt="img" />
          </Link>
        </ListItem>
        {listItem?.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link href={text?.url}>
                <ListItemText primary={text?.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {ctx.isLogin ? (
          <>
            <ListItem>
              <ListItemButton>
                <Link href="/triplist">
                  <ListItemText primary={"Book Now"} />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <button className="btn-design ms-3 mt-2" onClick={logoutHandler}>
                Logout
              </button>
            </ListItem>
          </>
        ) : (
          <ListItem className='d-flex flex-column align-items-start gap-2' >
            <button className="btn-design ms-3 mt-2" onClick={loginHandler}>
              Sign in
            </button>
            <button className="btn-design ms-3 mt-2" onClick={signupHandler}>
              Sign up
            </button>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)} className="bar-btn">
        <img src={'/images/menu.png'} alt="img" />
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        className="drawer-bx"
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
