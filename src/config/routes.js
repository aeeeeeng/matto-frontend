import React from 'react';

// import Dashboard from '../components/contents/Dashboard/Dashboard';
// import Master from '../components/contents/Master/Master';

const Dashboard =  React.lazy(() => import('../components/contents/Dashboard/Dashboard'));
const Master =  React.lazy(() => import('../components/contents/Master/Master'));
const ExamplePage =  React.lazy(() => import('../components/contents/ExamplePage'));
const Users = React.lazy(() => import('../components/contents/Master/Users/Users'));

const routes = [
    { link: '/dashboard', name: 'dashboard', label: 'Dashboard', component: Dashboard },
    { link: '/master', name: 'master', label: 'Master', component: Master, isCollapse: false, child:[
        { link: '/master/users', name: 'users', label: 'Users', component: Users, exact:'/example' }
    ]},
    { link: '/example', name: 'example', label: 'Example', component: ExamplePage, isCollapse: false, child:[
        { link: '/example/page', name: 'example', label: 'Example', component: ExamplePage },
    ]},
];

export default routes;