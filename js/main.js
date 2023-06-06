class App {
  api;
  switcher;

  constructor() {
    this.api = new API("../data/data.json");
    this.switcher = new Switcher(this);
  }
}

class API {
  url = "";
  data = null;

  constructor(newURL) {
    this.url = newURL;
  }

  async getData() {
    if (this.data === null) {
      await fetch(this.url)
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          this.data = data;
        });
    }
    return this.data;
  }
}

class Switcher {
  app;
  yubtub;
  cleaner;

  constructor(app) {
    this.app = app;
    this.yubtub = new YubTub(this.app);
    this.cleaner = new Cleaner();
  }
}

class Cleaner {
  constructor() {}
}

class YubTub {
  app;
  header;
  main;
  aside;
  renderer;

  constructor(app) {
    this.app = app;
    this.header = new Header();
    this.main = new Main(this);
    this.renderer = new Renderer();
    this.aside = new Aside(this);
  }
}

class Renderer {
  render(whereToRender, whatToRender) {
    document.querySelector(whereToRender).appendChild(whatToRender);
  }
}

class Header {
  constructor() {}
}

class Main {
  yubtub;
  comments;
  video;

  constructor(yubtub) {
    this.yubtub = yubtub;
    this.comments = new Comments(this);
    this.video = new Video();
  }
}

class Video {
  constructor() {}
}

class Comments {
  main;
  comment;

  constructor(main) {
    this.main = main;
    this.comment = new Comment(this.main);
  }
}

class Comment {
  comments;

  constructor(comments) {
    this.comments = comments;
  }
}

class Aside {
  yubtub;
  nextVideo;

  constructor(yubtub) {
    this.yubtub = yubtub;

    this.yubtub.app.api.getData().then((data) => {
      this.data = data.videos[1].video;
      this.nextVideo = new NextVideo(this, this.data);
    });

    const htmlElement = document.createElement("aside");
    this.yubtub.renderer.render("body", htmlElement);
  }
}

class NextVideo {
  aside;
  htmlElement;

  constructor(aside, data) {
    this.aside = aside;
    this.data = data;

    this.htmlElement = document.createElement("video");
    console.log(this.htmlElement);
    this.htmlElement.src = "../videos/" + this.data;
    this.aside.yubtub.renderer.render("aside", this.htmlElement);
  }
}

yubtub = new App();
console.log(yubtub);
