import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // app.passport.mount('github');
  router.get('/oauth2.0/show', controller.oauth2.show);
  router.all('/oauth2.0/access_token', app.oAuth2Server.authorize(), controller.oauth2.accessToken);
  router.all('/oauth2.0/authorize', app.oAuth2Server.authorize());
  router.get('/', controller.home.index);
};
