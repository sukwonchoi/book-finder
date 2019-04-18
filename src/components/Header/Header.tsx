import React from 'react';
import { Typography, AppBar, Toolbar, InputBase, withStyles } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import { styles } from './Header.theme';

type Props = {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value?: string;
  classes: any;
};

export const Header = (props: Props) => {
  const { classes } = props;
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Book Finder
        </Typography>
        <span style={{ flex: 1 }} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            value={props.value}
            onChange={props.onChange}
            placeholder="Search Title"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles as any)(Header);
