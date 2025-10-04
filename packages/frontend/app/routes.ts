import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "layouts/SiteLayout.tsx", [
    index("pages/index.tsx"),
    route("/about", "pages/site/about.tsx"),
    route("/events", "pages/site/events/events.tsx"),
    route("/upcoming-events", "pages/site/events/upcoming.tsx"),
    route("/past-events", "pages/site/events/past.tsx"),
    route("/special-programs", "pages/site/events/special-programs.tsx"),
    route("/special-program/:id", "pages/site/special-program-detail.tsx"),
    route("/event/:id", "pages/site/event-detail.tsx"),
    route('/our-schedule', "pages/site/schedule.tsx"),
    route("/commissions", "pages/site/commissions.tsx"),
    route("/support-us", "pages/site/support-us.tsx"),
    route("/contact-us", "pages/site/contact.tsx")
  ]),
  // Auth routes
  route("/login", "pages/auth/login.tsx"),
  route("/register", "pages/auth/register.tsx"),
  route("/forgot-password", "pages/auth/forgot-password.tsx"),
  // Dashboard routes
  route("/dashboard", "layouts/DashboardLayout.tsx", [
    index("pages/dashboard/index.tsx"),
    route("/dashboard/events", "pages/dashboard/events.tsx"),
    route("/dashboard/members", "pages/dashboard/members.tsx"),
    route("/dashboard/videos", "pages/dashboard/videos.tsx"),
    route("/dashboard/analytics", "pages/dashboard/analytics.tsx"),
    route("/dashboard/settings", "pages/dashboard/settings.tsx"),
    route("/dashboard/special-programs", "pages/dashboard/special-programs.tsx"),
    route("/dashboard/commissions", "pages/dashboard/commissions.tsx"),
    route("/dashboard/contacts", "pages/dashboard/contacts.tsx")
  ])
] satisfies RouteConfig;
