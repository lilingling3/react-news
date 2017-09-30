import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';

// 组件
import App from './components/app';
import NewContainer from './components/new_container';
import NewUser from './components/new_user';
import NewDetail from './components/new_detail';

import '../node_modules/antd/dist/antd.min.css'
//定义根路由
render((<div>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
        <IndexRoute component={NewContainer}></IndexRoute>
        <Route path='/newDetail/:uniquekey/:type' component={NewDetail}></Route>
        <Route path='/newUser' component={NewUser}></Route>
    </Route>
  </Router>
  </div>),document.getElementById('root'))
