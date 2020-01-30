import React from 'react';
import { faTachometerAlt, faFile, faDatabase, faTools } from '@fortawesome/free-solid-svg-icons';

const Dashboard =  React.lazy(() => import('../components/contents/Dashboard/Dashboard'));
const Master =  React.lazy(() => import('../components/contents/Master/Master'));
const ExamplePage =  React.lazy(() => import('../components/contents/ExamplePage'));
const Users = React.lazy(() => import('../components/contents/Master/Users/Users'));
const ProductTypes = React.lazy(() => import('../components/contents/Master/ProductTypes/ProductTypes'));

const routes = [
    { link: '/dashboard', name: 'dashboard', label: 'Dashboard', component: Dashboard, icon: faTachometerAlt },
    { link: '/master', name: 'master', label: 'Master', component: Master, isCollapse: false, icon: faDatabase, child:[
        { link: '/master/product-types', name: 'productTypes', label: 'Product Types', component: ProductTypes, exact:'/example' }
    ]},
    { link: '/config', name: 'config', label: 'Config', component: Master, isCollapse: false, icon: faTools, child:[
        { link: '/config/users', name: 'users', label: 'Users', component: Users, exact:'/config' },
    ]},
    { link: '/example/page', name: 'example', label: 'Blank Page', component: ExamplePage, icon: faFile }
];

export default routes;