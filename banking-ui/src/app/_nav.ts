import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];

export const navTikiItems: INavData[] = [
  {
    name: 'Điện Thoại - Máy Tính Bảng',
    url: 'https://tiki.vn/dien-thoai-may-tinh-bang/c1789?src=c.1789.hamburger_menu_fly_out_banner',
    icon: 'icon-main-menu-cellphone'
  },
  {
    name: 'Điện Tử - Điện Lạnh',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-tv'
  },
  {
    name: 'Phụ Kiện - Thiết Bị Số',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-headphone'
  },
  {
    name: 'Laptop - Thiết bị IT',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-laptop'
  },
  {
    name: 'Máy Ảnh - Quay Phim',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-camera'
  },
  {
    name: 'Điện Gia Dụng',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-electronic'
  },
  {
    name: 'Nhà Cửa Đời Sống',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-pan'
  },
  {
    name: 'Hàng Tiêu Dùng - Thực Phẩm',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-sprayer'
  },
  {
    name: 'Đồ chơi, Mẹ & Bé',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-bottle'
  },
  {
    name: 'Làm Đẹp - Sức Khỏe',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-lipsticks'
  },
  {
    name: 'Thời trang - Phụ kiện',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-tshirt'
  },
  {
    name: 'Thể Thao - Dã Ngoại',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-sport'
  },
  {
    name: 'Xe Máy, Ô tô, Xe Đạp',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-bike'
  },
  {
    name: 'Hàng quốc tế',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-global',
    label: {
      variant: 'new'
    }
  },
  {
    name: 'Sách, VPP & Quà Tặng',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-book'
  },
  {
    name: 'Voucher - Dịch Vụ - Thẻ Cào',
    url: 'https://tiki.vn',
    icon: 'icon-main-menu-voucher',
    label: {
      variant: 'hot'
    }
  },
];
