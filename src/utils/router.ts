import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "../router";
import Cookies from "js-cookie";

NProgress.configure({
  showSpinner: false,
});

const whiteRoutes: string[] = ["/login"];

function isTokenExpired(): boolean {
  const token = Cookies.get("admin-token");
  return !!token;
}
router.beforeEach((to, from) => {
  NProgress.start();
  if (whiteRoutes.includes(to.path)) {
    NProgress.done();
    return true;
  } else {
    if (!isTokenExpired()) {
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      };
    }
    return true;
  }
});

router.afterEach(() => {
  NProgress.done();
});
