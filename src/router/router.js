import { Router } from '@vaadin/router';

/**
 * Initializes the router.
 *
 * @param {Object} outlet
 */
function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'landing-page',
      action: () => {
        import('../components/landing-page/landing-page');
      },
    },
    {
      path: '/',
      component: 'landing-page',
      children: [
        {
          path: '/',
          redirect: '/post',
        },
        {
          path: '/post',
          component: 'post-list',
          action: async () => {
            await import(
              /* webpackChunkName: "pp-home" */ '../components/posts/post-list.js'
            );
          },
        },
        {
          path: '/home',
          component: 'home-page',
          action: () => {
            import('../components/home-page/home-page');
          },
        },
      ],
    },
  ]);
}

export default initRouter;
