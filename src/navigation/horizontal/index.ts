// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Home',
      path: '/home/'
    },
    {
      icon: 'tabler:shopping-cart',
      title: 'e-Commerce',
      children: [
        {
          icon: 'tabler:brand-adobe-photoshop',
          title: 'Products',
          path: '/e-commerce/products'
        },
        {
          icon: 'tabler:checkup-list',
          title: 'Orders',
          path: '/e-commerce/orders'
        }
      ]
    },
    {
      icon: 'tabler:color-swatch',
      title: 'Management',
      children: [
        {
          title: 'Staff',
          icon: 'tabler:typography',
          path: '/ui/typography'
        },
        {
          title: 'Customer',
          path: '/ui/icons',
          icon: 'tabler:brand-tabler'
        },
        {
          title: 'Products',
          path: '/ui/icons',
          icon: 'tabler:brand-tabler'
        },
        {
          title: 'Categories',
          path: '/ui/icons',
          icon: 'tabler:brand-tabler'
        },
        {
          title: 'Orders',
          path: '/ui/icons',
          icon: 'tabler:brand-tabler'
        }
      ]
    },
    {
      icon: 'tabler:layout-grid-add',
      title: 'Apps',
      children: [
        {
          title: 'Email',
          icon: 'tabler:mail',
          path: '/apps/email_'
        },
        {
          title: 'Chat',
          icon: 'tabler:messages',
          path: '/apps/chat_'
        },
        {
          title: 'Calendar',
          icon: 'tabler:calendar',
          path: '/apps/calendar_'
        },

        {
          title: 'User',
          icon: 'tabler:user',
          children: [
            {
              title: 'List',
              path: '/apps/user/list_'
            },
            {
              title: 'View',
              children: [
                {
                  title: 'Account',
                  path: '/apps/user/view/account_'
                },
                {
                  title: 'Security',
                  path: '/apps/user/view/security_'
                }
              ]
            }
          ]
        },
        {
          title: 'Roles & Permissions',
          icon: 'tabler:settings',
          children: [
            {
              title: 'Roles',
              path: '/apps/roles'
            },
            {
              title: 'Permissions',
              path: '/apps/permissions'
            }
          ]
        }
      ]
    }
  ]
}

export default navigation
