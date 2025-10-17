import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavbarAvatar() {
  return (
    <Tooltip title="Login / Register">
      <IconButton color="inherit">
        <AccountCircleIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}
