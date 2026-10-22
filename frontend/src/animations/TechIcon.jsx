// import React from "react";
// import {
//   Code,
//   Database,
//   Server,
//   Layers,
//   Cpu,
//   Globe,
//   Terminal,
//   Cloud,
//   Box,
//   GitBranch,
//   Shield,
//   FileCode,
//   Layout,
//   Workflow,
//   Sparkles,
// } from "lucide-react";

// export const TechIcon = ({ name = "", className = "w-5 h-5", size = 20 }) => {
//   const normalized = (name || "").toLowerCase().trim();

//   // Custom high quality SVG paths for MySQL
//   // if (normalized.includes("mysql")) {
//   //   return (
//   //     <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
//   //       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#00758F" />
//   //       <path d="M7 15.5c1.5-2 3.5-3 5-3s3.5 1 5 3" stroke="#F29111" strokeWidth="2" strokeLinecap="round" />
//   //       <circle cx="9" cy="10" r="1.2" fill="white" />
//   //       <circle cx="15" cy="10" r="1.2" fill="white" />
//   //     </svg>
//   //   );
//   // }
//   if (normalized.includes("mysql")) {
//   return (
//     <svg
//       className={className}
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* MySQL dolphin-inspired body */}
//       <path
//         d="M4.2 14.8c1.1-3.9 4.2-6.7 8.2-6.7 2.8 0 4.7 1.2 6.1 2.8"
//         stroke="#00758F"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />

//       <path
//         d="M5 15.2c1.8 1.8 4.1 2.7 6.7 2.7 2.8 0 4.8-1.1 6.4-3"
//         stroke="#00758F"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />

//       {/* Dolphin tail */}
//       <path
//         d="M17.1 10.9c1.2-.8 2.6-.7 3.7.2-1.1.2-1.8.8-2.2 1.6"
//         stroke="#00758F"
//         strokeWidth="1.7"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       {/* Dolphin head / snout */}
//       <path
//         d="M4.2 14.8c-.7-1.2-.6-2.5.2-3.5"
//         stroke="#00758F"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//       />

//       {/* Eye */}
//       <circle cx="8.8" cy="10.7" r="0.8" fill="#00758F" />

//       {/* MySQL accent */}
//       <path
//         d="M6.2 18.7c2.1.8 4.3 1 6.4.6"
//         stroke="#F29111"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

//   // Custom high quality SVG paths for major technologies
//   if (normalized.includes("react")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
//         <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
//         <g stroke="#61DAFB" strokeWidth="1" fill="none">
//           <ellipse rx="11" ry="4.2" />
//           <ellipse rx="11" ry="4.2" transform="rotate(60)" />
//           <ellipse rx="11" ry="4.2" transform="rotate(120)" />
//         </g>
//       </svg>
//     );
//   }

//   if (normalized.includes("node")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.7 13.9L12 19.8l-6.7-3.9V7.9L12 4.1l6.7 3.8v8z" fill="#68A063"/>
//         <path d="M12 7.5L7.5 10v4l4.5 2.5 4.5-2.5v-4L12 7.5z" fill="#3C873A"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("javascript") || normalized === "js") {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
//         <rect width="24" height="24" rx="4" fill="#F7DF1E" />
//         <path d="M7 16.5c.5.8 1.2 1.3 2.2 1.3 1.2 0 2-.8 2-2.3V8h2v7.5c0 2.5-1.5 3.8-3.8 3.8-1.7 0-3-.9-3.7-2.3l1.3-.5zm8.5-.2c.6.9 1.5 1.5 2.7 1.5 1.3 0 2.1-.7 2.1-1.7 0-1.2-.9-1.6-2.5-2.3-2.1-.9-3.2-1.8-3.2-3.8 0-2 1.6-3.5 3.7-3.5 1.6 0 2.8.6 3.6 2.1l-1.6 1c-.5-.9-1.1-1.3-2-1.3-1 0-1.7.6-1.7 1.5 0 .9.6 1.3 2.1 2 2.3 1 3.7 2 3.7 4.1 0 2.4-1.8 3.8-4.2 3.8-2.2 0-3.6-1.1-4.3-2.6l1.6-.8z" fill="#000000" />
//       </svg>
//     );
//   }

//   if (normalized.includes("docker")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm6 3h2v2h-2V8zm3.5 4.5c-.3 0-.6.1-.8.2-.5-.8-1.3-1.4-2.3-1.6l-.4-.1-.2.4c-.5 1-1.4 1.6-2.5 1.6H2.8C2.3 13 2 13.3 2 13.8c0 3.7 2.7 6.7 6.8 6.7 5.1 0 8.7-3.4 9.6-8.2.7-.2 1.5-.7 1.8-1.5-.6.2-1.2.2-1.7.2zM4.1 14.5h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" fill="#2496ED"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("git")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l3.3 3.3c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l3.1 3.1c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.3-2.1l-2.9-2.9v4.2c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.8.5-1.1V9.9c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.5-1.1L7.7 4.6 2.4 9.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z" fill="#F05032"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("tailwind")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1.1.2 1.9 1 2.7 1.9C14.8 11.8 16.3 13.5 20 13.5c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1.1-.2-1.9-1-2.7-1.9C17.2 7.7 15.7 6 12 6zm-8 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1.1.2 1.9 1 2.7 1.9C6.8 17.8 8.3 19.5 12 19.5c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1.1-.2-1.9-1-2.7-1.9C9.2 13.7 7.7 12 4 12z" fill="#06B6D4"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("python")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M11.9 2c-3.1 0-5 .7-5 2.8v2.2h5v.8H4.6C2.6 7.8 2 9.6 2 12.3c0 2.8 1.4 4.3 3.9 4.3h1.8v-2.5c0-1.7 1.4-3.1 3.1-3.1h5V9.7c0-2.4-1.9-3.9-4.9-3.9h-1V4.5c0-.9.7-1.7 1.7-1.7h.3V2zm-2.4 2.2c.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7z" fill="#3776AB"/>
//         <path d="M12.1 22c3.1 0 5-.7 5-2.8V17h-5v-.8h7.3c2 0 2.6-1.8 2.6-4.5 0-2.8-1.4-4.3-3.9-4.3h-1.8v2.5c0 1.7-1.4 3.1-3.1 3.1h-5v1.3c0 2.4 1.9 3.9 4.9 3.9h1v1.3c0 .9-.7 1.7-1.7 1.7h-.3V22zm2.4-2.2c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z" fill="#FFD43B"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("redis")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M21 7.2L12 3 3 7.2l9 4.2 9-4.2zm-9 6.3L3.8 9.7v4.6l8.2 4.2 8.2-4.2V9.7L12 13.5zm0 5.8l-8.2-4.2v2.4L12 21.7l8.2-4.2v-2.4L12 19.3z" fill="#DC382D"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("graphql")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 2l8.7 5v10L12 22 3.3 17V7L12 2zm0 2.3L5.3 8.3v7.4L12 19.7l6.7-4V8.3L12 4.3z" fill="#E10098"/>
//         <circle cx="12" cy="2" r="1.8" fill="#E10098"/>
//         <circle cx="20.7" cy="7" r="1.8" fill="#E10098"/>
//         <circle cx="20.7" cy="17" r="1.8" fill="#E10098"/>
//         <circle cx="12" cy="22" r="1.8" fill="#E10098"/>
//         <circle cx="3.3" cy="17" r="1.8" fill="#E10098"/>
//         <circle cx="3.3" cy="7" r="1.8" fill="#E10098"/>
//       </svg>
//     );
//   }

//   if (normalized.includes("express")) {
//     return (
//       <span className="font-mono font-bold text-xs tracking-tighter text-neutral-800 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700">
//         ex
//       </span>
//     );
//   }

//   if (normalized.includes("next")) {
//     return (
//       <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <circle cx="12" cy="12" r="10" fill="black" />
//         <path d="M15.5 17.5L8.5 7.5h2l5 7V7.5h1.5v10h-1.5z" fill="white" />
//       </svg>
//     );
//   }

//   if (normalized.includes("html")) {
//     return <FileCode className={`${className} text-orange-500`} size={size} />;
//   }

//   if (normalized.includes("css")) {
//     return <Layout className={`${className} text-blue-500`} size={size} />;
//   }

//   if (normalized.includes("aws") || normalized.includes("cloud")) {
//     return <Cloud className={`${className} text-amber-500`} size={size} />;
//   }

//   if (normalized.includes("linux")) {
//     return <Terminal className={`${className} text-amber-600`} size={size} />;
//   }

//   if (normalized.includes("sql") || normalized.includes("database") || normalized.includes("data") || normalized.includes("postgres")) {
//     return <Database className={`${className} text-emerald-500`} size={size} />;
//   }

//   if (normalized.includes("api") || normalized.includes("rest")) {
//     return <Workflow className={`${className} text-indigo-500`} size={size} />;
//   }

//   if (normalized.includes("architecture") || normalized.includes("system")) {
//     return <Layers className={`${className} text-violet-500`} size={size} />;
//   }

//   // General Fallback Lucide Icon
//   return <Code className={`${className} text-neutral-600 dark:text-neutral-300`} size={size} />;
// };


import React from "react";
import {
  Code,
  Database,
  Layers,
  Terminal,
  Cloud,
  Workflow,
} from "lucide-react";

export const TechIcon = ({
  name = "",
  className = "w-5 h-5",
  size = 20,
}) => {
  const normalized = (name || "")
    .toLowerCase()
    .trim()
    .replace(/[.#]/g, "")
    .replace(/[\s_-]+/g, "");

  // =========================================================
  // DEVICON ICONS
  // =========================================================

  const icons = {
    // -------------------------
    // Programming Languages
    // -------------------------
    javascript: "devicon-javascript-plain colored",
    js: "devicon-javascript-plain colored",

    typescript: "devicon-typescript-plain colored",
    ts: "devicon-typescript-plain colored",

    python: "devicon-python-plain colored",
    py: "devicon-python-plain colored",

    java: "devicon-java-plain colored",

    c: "devicon-c-plain colored",

    cpp: "devicon-cplusplus-plain colored",
    cplusplus: "devicon-cplusplus-plain colored",

    csharp: "devicon-csharp-plain colored",

    go: "devicon-go-original-wordmark colored",
    golang: "devicon-go-original-wordmark colored",

    rust: "devicon-rust-original colored",

    php: "devicon-php-plain colored",

    ruby: "devicon-ruby-plain colored",

    kotlin: "devicon-kotlin-plain colored",

    swift: "devicon-swift-plain colored",

    dart: "devicon-dart-plain colored",

    scala: "devicon-scala-plain colored",

    perl: "devicon-perl-plain colored",

    lua: "devicon-lua-plain colored",

    r: "devicon-r-original colored",

    matlab: "devicon-matlab-plain colored",

    // -------------------------
    // Web Technologies
    // -------------------------
    html: "devicon-html5-plain colored",
    html5: "devicon-html5-plain colored",

    css: "devicon-css3-plain colored",
    css3: "devicon-css3-plain colored",

    sass: "devicon-sass-original colored",
    scss: "devicon-sass-original colored",

    less: "devicon-less-plain-wordmark colored",

    // -------------------------
    // Frontend
    // -------------------------
    react: "devicon-react-original colored",
    reactjs: "devicon-react-original colored",

    next: "devicon-nextjs-original-wordmark",
    nextjs: "devicon-nextjs-original-wordmark",

    vue: "devicon-vuejs-plain colored",
    vuejs: "devicon-vuejs-plain colored",

    angular: "devicon-angularjs-plain colored",
    angularjs: "devicon-angularjs-plain colored",

    svelte: "devicon-svelte-plain colored",

    jquery: "devicon-jquery-plain colored",

    bootstrap: "devicon-bootstrap-plain colored",

    tailwind: "devicon-tailwindcss-original colored",
    tailwindcss: "devicon-tailwindcss-original colored",

    materialui: "devicon-materialui-plain colored",
    mui: "devicon-materialui-plain colored",

    redux: "devicon-redux-original colored",

    webpack: "devicon-webpack-plain colored",

    vite: "devicon-vitejs-plain colored",

    babel: "devicon-babel-plain colored",

    // -------------------------
    // Backend
    // -------------------------
    node: "devicon-nodejs-plain colored",
    nodejs: "devicon-nodejs-plain colored",

    express: "devicon-express-original",
    expressjs: "devicon-express-original",

    nest: "devicon-nestjs-plain colored",
    nestjs: "devicon-nestjs-plain colored",

    django: "devicon-django-plain colored",

    flask: "devicon-flask-original",

    spring: "devicon-spring-original colored",
    springboot: "devicon-spring-original colored",

    laravel: "devicon-laravel-original colored",

    dotnet: "devicon-dotnetcore-plain colored",

    // -------------------------
    // Databases
    // -------------------------
    mysql: "devicon-mysql-original colored",

    mongodb: "devicon-mongodb-plain colored",
    mongo: "devicon-mongodb-plain colored",

    postgresql: "devicon-postgresql-plain colored",
    postgres: "devicon-postgresql-plain colored",

    sqlite: "devicon-sqlite-plain colored",

    mariadb: "devicon-mariadb-original colored",

    redis: "devicon-redis-plain colored",

    oracle: "devicon-oracle-original colored",

    cassandra: "devicon-apachecassandra-plain colored",

    firebase: "devicon-firebase-plain colored",

    supabase: "devicon-supabase-plain colored",

    // -------------------------
    // Cloud
    // -------------------------
    aws: "devicon-amazonwebservices-plain-wordmark",

    azure: "devicon-azure-plain colored",

    gcp: "devicon-googlecloud-plain colored",
    googlecloud: "devicon-googlecloud-plain colored",

    // -------------------------
    // DevOps
    // -------------------------
    docker: "devicon-docker-plain colored",

    kubernetes: "devicon-kubernetes-plain colored",
    k8s: "devicon-kubernetes-plain colored",

    jenkins: "devicon-jenkins-line colored",

    terraform: "devicon-terraform-plain colored",

    ansible: "devicon-ansible-plain colored",

    nginx: "devicon-nginx-original colored",

    apache: "devicon-apache-plain colored",

    // -------------------------
    // Version Control
    // -------------------------
    git: "devicon-git-plain colored",

    github: "devicon-github-original",

    gitlab: "devicon-gitlab-plain colored",

    bitbucket: "devicon-bitbucket-original colored",

    // -------------------------
    // Package Managers
    // -------------------------
    npm: "devicon-npm-original-wordmark colored",

    yarn: "devicon-yarn-plain colored",

    pnpm: "devicon-pnpm-plain colored",

    bun: "devicon-bun-plain",

    // -------------------------
    // Development Tools
    // -------------------------
    vscode: "devicon-vscode-plain colored",
    visualstudiocode: "devicon-vscode-plain colored",

    visualstudio: "devicon-visualstudio-plain colored",

    intellij: "devicon-intellij-plain colored",

    pycharm: "devicon-pycharm-plain colored",

    androidstudio: "devicon-androidstudio-plain colored",

    // -------------------------
    // API / Testing
    // -------------------------
    postman: "devicon-postman-plain colored",

    // -------------------------
    // Data / AI
    // -------------------------
    pandas: "devicon-pandas-plain colored",

    numpy: "devicon-numpy-plain colored",

    tensorflow: "devicon-tensorflow-original colored",

    pytorch: "devicon-pytorch-original colored",

    keras: "devicon-keras-plain colored",

    opencv: "devicon-opencv-plain colored",

    // -------------------------
    // Mobile
    // -------------------------
    flutter: "devicon-flutter-plain colored",

    android: "devicon-android-plain colored",

    ios: "devicon-apple-original",

    // -------------------------
    // Design
    // -------------------------
    figma: "devicon-figma-plain colored",

    photoshop: "devicon-photoshop-plain colored",

    illustrator: "devicon-illustrator-plain colored",

    // -------------------------
    // Operating Systems
    // -------------------------
    linux: "devicon-linux-plain",

    ubuntu: "devicon-ubuntu-plain colored",

    windows: "devicon-windows11-original colored",

    // -------------------------
    // Shell
    // -------------------------
    bash: "devicon-bash-plain",

    powershell: "devicon-powershell-plain colored",

    markdown: "devicon-markdown-original",
  };

  const iconClass = icons[normalized];

  // =========================================================
  // DEVICON RESULT
  // =========================================================

  if (iconClass) {
    return (
      <i
        className={`${iconClass} ${className}`}
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
        }}
        title={name}
        aria-label={name}
      />
    );
  }

  // =========================================================
  // GENERIC FALLBACKS
  // =========================================================

  if (
    normalized.includes("database") ||
    normalized.includes("sql") ||
    normalized.includes("data")
  ) {
    return (
      <Database
        className={className}
        size={size}
        aria-label={name}
      />
    );
  }

  if (
    normalized.includes("api") ||
    normalized.includes("rest") ||
    normalized.includes("graphql")
  ) {
    return (
      <Workflow
        className={className}
        size={size}
        aria-label={name}
      />
    );
  }

  if (
    normalized.includes("architecture") ||
    normalized.includes("system") ||
    normalized.includes("framework")
  ) {
    return (
      <Layers
        className={className}
        size={size}
        aria-label={name}
      />
    );
  }

  if (
    normalized.includes("cloud") ||
    normalized.includes("server")
  ) {
    return (
      <Cloud
        className={className}
        size={size}
        aria-label={name}
      />
    );
  }

  if (
    normalized.includes("terminal") ||
    normalized.includes("shell") ||
    normalized.includes("commandline")
  ) {
    return (
      <Terminal
        className={className}
        size={size}
        aria-label={name}
      />
    );
  }

  // =========================================================
  // FINAL FALLBACK
  // =========================================================

  return (
    <Code
      className={className}
      size={size}
      aria-label={name}
    />
  );
};
