import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { AssuredWorkload } from '@mui/icons-material'; // Import AssuredWorkload icon from @mui/icons-material
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <AppBar sx={{ backgroundColor: 'maroon' }} position='sticky'>
        <Toolbar>
          <AssuredWorkload /> {/* Use AssuredWorkload icon */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel Management System
          </Typography>
          <Tabs textColor='inherit' indicatorColor='primary' value={value} onChange={(e, val) => setValue(val)}>
            <Tab component={NavLink} to='/signup' label='Signup' />
            <Tab component={NavLink} to='/Signin' label='Signin'/> 
            <Tab component={NavLink} to='/Admin' label='Admin'/> 
            <Tab component={NavLink} to='/FeedbackForm' label='Feedback'/>
           <Tab component={NavLink} to='/' label='Home'/> 
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
