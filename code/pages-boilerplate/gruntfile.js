const sass = require("node-sass");
const browserSync = require('browser-sync').create()

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

module.exports = (grunt) => {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    //清除
    clean: ["temp/**", "dist/**"],

    //scss编译任务
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      temp: {
        files: {
          "temp/assets/styles/main.css": "src/assets/styles/main.scss",
        },
      },
    },

    //脚本编译任务
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "temp/assets/scripts/main.js": "src/assets/scripts/main.js",
        },
      },
    },

    //页面编译任务
    swigtemplates: {
      options: {
        templatesDir: "src/",
        defaults: { cache: false },
        defaultContext: {
          pkg: data.pkg,
          menus: data.menus,
          date: data.date,
        },
      },
      production: {
        dest: "temp",
        src: ["src/*.html"],
      },
    },

    //图片压缩
    imagemin: {
      image: {
        files: [
          {
            expand: true,
            cwd:'src',
            src: ["assets/images/*.{png,jpg.gif,svg}"],
            dest: "dist",
          },
        ],
      },
    },

    //字体压缩
    copy: {
      font: {
        files: [
          {
            expand: true,
            cwd:'src',
            src: ["assets/fonts/**"],
            dest: "dist",
            filter: "isFile",
          },
        ],
      },
      public: {
        files: [
          {
            expand: true,
            cwd:'public',
            src: "**",
            dest: "dist",
            filter: "isFile",
          },
        ],
      },
    },

    watch:{
      styles:{
        options: {
          interrupt: true,
        },
          files:['src/assets/styles/*.scss'],//监视文件路径
          tasks:['sass'] //监视文件发生改变时需要执行的任务
      },
      scripts:{
        options: {
          interrupt: true,
        },
          files:['src/assets/scripts/*.js'],
          tasks:['babel']
      },
      pages:{
        options: {
          interrupt: true,
        },
        files:['src/**/*.html'],
        tasks:['swigtemplates']
      }
    },

    useref:{
      html:'temp/*.html',
      temp:'dist'
    },
    //js压缩
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'dist/assets/scripts/vendor.js': ['node_modules/jquery/dist/jquery.js', 'node_modules/popper.js/dist/umd/popper.js','node_modules/bootstrap/dist/js/bootstrap.js']
        }
      },
      my_script:{
        files:{
          'dist/assets/scripts/main.js':'temp/assets/scripts/main.js'
        }
      }
    },
    //css压缩
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/assets/styles/vendor.css': ['node_modules/bootstrap/dist/css/bootstrap.css']
        }
      },
      dev:{
        files:{
          'dist/assets/styles/main.css':'temp/assets/styles/main.css'
        }
      }
    },

    //页面压缩
    htmlmin:{
      pages:{
        options: {          
          removeComments: true,
          collapseWhitespace: true
        },
      files: [{
        expand: true,
        cwd: 'temp',
        src: ['temp/**/*.html', '*.html'],
        dest: 'dist'
    }]
  }
    }
  });
  
  //服务器
  grunt.registerTask("server", function(){
    const done = this.async()
    browserSync.init({
      notify: false,
      port: 2080,
      server: {
        baseDir: ["temp", "src", "public"],
        routes: {
          "/node_modules": "node_modules",
        },
      },
    });
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-swigtemplates");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-webfont");

  grunt.registerTask("compile", ["sass", "babel", "swigtemplates"]);

  grunt.registerTask('develop',['clean',"compile","server"]);

  grunt.registerTask('build', [ 'clean','compile','useref', 'htmlmin', 'uglify', 'cssmin','imagemin','copy']);
};