import React from 'react';

// import Dashboard from '../components/contents/Dashboard/Dashboard';
// import Master from '../components/contents/Master/Master';

const Dashboard =  React.lazy(() => import('../components/contents/Dashboard/Dashboard'));
const Master =  React.lazy(() => import('../components/contents/Master/Master'));
const ExamplePage =  React.lazy(() => import('../components/contents/ExamplePage'));

const routes = [
    { link: '/dashboard', name: 'dashboard', label: 'Dashboard', component: Dashboard },
    { link: '/master', name: 'master', label: 'Master', component: Master },
    { link: '/example', name: 'example', label: 'Example', component: ExamplePage, isCollapse: false, child:[
        { link: '/example', name: 'example', label: 'Example', component: ExamplePage }
    ]},
];

export default routes;