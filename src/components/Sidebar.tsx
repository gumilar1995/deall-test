import { Drawer, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import utilityStyle from "@/styles/Utility.module.css";
import { useRouter } from "next/router";
import cn from "classnames";
import { GridMenuIcon } from "@mui/x-data-grid";

export default function Sidebar() {
  const drawerDirections = ["left"];
  const router = useRouter();
  const matchesMobile = useMediaQuery("(max-width: 1200px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!matchesMobile);
  }, [matchesMobile]);

  return (
    <div
      className={`${utilityStyle.sideBar} ${cn({
        [utilityStyle.hide]: matchesMobile,
      })}`}
    >
      {drawerDirections.map((anchor) => (
        <React.Fragment key={anchor}>
          {matchesMobile && (
            <div
              className={utilityStyle.menu}
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              <GridMenuIcon />
            </div>
          )}
          <Drawer
            open={open}
            variant={matchesMobile ? "temporary" : "permanent"}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Box component={"div"} sx={{ width: 250 }} role="presentation">
              <List className={utilityStyle.sideBarItems}>
                {["products", "carts"].map((text) => (
                  <ListItem
                    className={`${utilityStyle.sideBarItem} ${cn({
                      [utilityStyle.active]:
                        (text === "products" &&
                          !router.pathname.startsWith("/carts")) ||
                        (text === "carts" &&
                          router.pathname.startsWith("/carts")),
                    })}`}
                    key={text}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={(e) => {
                        e.preventDefault();
                        let path = "/";
                        if (text === "carts") {
                          path = "/carts";
                        }
                        router.push(path);
                      }}
                    >
                      <ListItemText
                        primary={`${text[0].toUpperCase()}${text.substring(1)}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
