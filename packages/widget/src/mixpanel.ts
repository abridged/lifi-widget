// import mixpanel from 'mixpanel-browser';

// const env = process.env.NEXT_PUBLIC_NODE_ENV;
// const api_url = process.env.NEXT_PUBLIC_API_URL;
// const MIXPANEL_ENABLED = process.env.NEXT_PUBLIC_MIXPANEL_ENABLED ?? false;
// const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID ?? '';
// mixpanel.init(MIXPANEL_ID, {
//   debug: env === 'development' ? true : false,
//   track_pageview: true,
//   persistence: 'localStorage',
//   ignore_dnt: true,
//   api_host: `${api_url}/mixpanel/proxy`,
// });

// export const Mixpanel = {
//   identify: (id: string) => {
//     if (MIXPANEL_ENABLED) mixpanel.identify(id);
//   },
//   alias: (id: string) => {
//     if (MIXPANEL_ENABLED) mixpanel.alias(id);
//   },
//   track: (name: string, props?: { [key: string]: any }) => {
//     if (MIXPANEL_ENABLED) mixpanel.track(name, props);
//   },
//   register: (props: { [key: string]: any }) => {
//     if (MIXPANEL_ENABLED) mixpanel.register(props);
//   },
//   people: {
//     set: (props: { [key: string]: any }) => {
//       if (MIXPANEL_ENABLED) mixpanel.people.set(props);
//     },
//     set_once: (props: { [key: string]: any }) => {
//       if (MIXPANEL_ENABLED) mixpanel.people.set_once(props);
//     },
//     append: (props: { [key: string]: any }) => {
//       if (MIXPANEL_ENABLED) mixpanel.people.append(props);
//     },
//     union: (props: { [key: string]: any }) => {
//       if (MIXPANEL_ENABLED) mixpanel.people.union(props);
//     },
//   },
//   reset: () => {
//     if (MIXPANEL_ENABLED) mixpanel.reset();
//   },
//   get_distinct_id: () => {
//     if (MIXPANEL_ENABLED) return mixpanel.get_distinct_id();
//   },
//   // people: {
//   //   set: (props: {[key:string]: any}) => {
//   //     mixpanel.people.set(props);
//   //   },
//   //   increment: (props: string | { [key:string]: number }, count?: number) => {
//   //     if (env_check) mixpanel.people.set(props, count);
//   //   }
//   // },
// };

// // export let Mixpanel = actions;
