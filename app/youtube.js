import {Component, If, Template, bootstrap, Foreach} from 'angular2/angular2';
import {YouTubeApi} from 'lib/YouTubeApi';

@Component({
  selector: 'youtube-app',
  componentServices: [
    YouTubeApi
  ]
})
@Template({
  url: 'app/youtube.html',
  directives: [Foreach, If]
})
class YouTubeApp {
  results: Array = [];
  yt: YouTubeApi;
  previewVideo;

  constructor(yt: YouTubeApi) {
    this.yt = yt;
    this.search('javascript');
  }

  search(q) {
    this.hideVideo();
    this.yt.search(q).then(this.setResults.bind(this));
  }

  preview(video) {
    window.scrollTo(0,0);
    this.previewVideo = video;
  }

  hideVideo() {
    this.previewVideo = null;
  }

  setResults(results) {
    this.results = results;
  }
}

export function main() {
  bootstrap(YouTubeApp);
}
