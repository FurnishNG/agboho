import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    name: 'Home',
    meta: {
      label: 'Home',
      icon: 'home',
      requiresAuth: true,
      //canViewOrganisations: true,
    },
    children: [
      { path: '', component: () => import('../pages/Index.vue') },
      {
        path: 'customers',
        component: () => import('../pages/customers/index.vue'),
        meta: {
          label: 'Customers',
          icon: 'people',
          //canViewOrganisations: true,
        },
        children: [
          {
            path: '',
            component: () => import('../pages/customers/AllCustomers.vue'),
            name: 'customers',
            meta: {
              label: 'All Customers',
              icon: 'people',
              //canViewOrganisations: true,
            },
          },
          {
            path: ':customerId',
            component: () => import('../pages/customers/customer.vue'),
            props: true,
            name: 'view_customer',
            meta: {
              label: 'View Customer',
              //canViewOrganisations: true,
            },
          },
          {
            path: 'new',
            component: () => import('../pages/customers/CreateCustomer.vue'),
            name: 'create_customer',
            meta: {
              label: 'New Customer',
              //canViewOrganisations: true,
            },
          },
        ],
      },
      {
        path: 'quotations',
        name: 'quotations',
        component: () => import('../pages/quotations/index.vue'),
        meta: {
          label: 'All Quotations',
          icon: 'request_page',
          //canViewOrganisations: true,
        },
      },
      {
        path: '/quotations/new',
        component: () => import('../pages/quotations/CreateQuotation.vue'),
        name: 'create_quotation',
        meta: {
          label: 'New Quotation',
          //canViewOrganisations: true,
        },
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('../pages/invoices/index.vue'),
        meta: {
          label: 'All Invoices',
          icon: 'list_alt',
          //canViewOrganisations: true,
        },
      },
      {
        path: '/invoices/new',
        component: () => import('../pages/invoices/CreateInvoice.vue'),
        name: 'create_invoice',
        meta: {
          label: 'New Invoice',
          //canViewOrganisations: true,
        },
      },
      {
        path: 'receipts',
        name: 'receipts',
        component: () => import('../pages/receipts/index.vue'),
        meta: {
          label: 'All Receipts',
          icon: 'receipt',
          //canViewOrganisations: true,
        },
      },
      {
        path: '/receipts/new',
        component: () => import('../pages/receipts/CreateReceipt.vue'),
        name: 'create_receipt',
        meta: {
          label: 'New Receipt',
          //canViewOrganisations: true,
        },
      },
      {
        path: 'settings',
        component: () => import('../pages/settings/Index.vue'),
        meta: {
          label: 'Settings',
          icon: 'settings',
          //canViewOrganisations: true,
        },
        children: [
          {
            path: '',
            component: () => import('../pages/settings/AllSettings.vue'),
            name: 'all_settings',
            meta: {
              label: 'All Settings',
              icon: 'settings',
              //canViewOrganisations: true,
            },
          },
          {
            path: 'users',
            component: () => import('../pages/settings/users/Index.vue'),
            meta: {
              label: 'Users',
              //canViewOrganisations: true,
            },
            children: [
              {
                path: '',
                component: () => import('../pages/settings/users/AllUsers.vue'),
                name: 'all_users',
                meta: {
                  label: 'All Users',
                  //canViewOrganisations: true,
                },
              },
              {
                path: ':userId/view',
                props: true,
                component: () => import('../pages/settings/users/User.vue'),
                name: 'view_user',
                meta: {
                  label: 'View User',
                  //canViewOrganisations: true,
                },
              },
              {
                path: ':userId/edit',
                props: true,
                component: () => import('../pages/settings/users/EditUser.vue'),
                name: 'edit_user',
                meta: {
                  label: 'Edit User',
                  //canViewOrganisations: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
    name: 'Login',
    meta: {
      label: 'Login',
      //canViewOrganisations: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/Error404.vue'),
  },
];

export default routes;
