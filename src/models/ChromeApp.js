import { Record, Seq } from 'immutable';

export default class ChromeApp extends Record({
  id: null,
  title: null,
  icons: Seq(),
}) {
  setTitle = () => this
  setUrl = () => this

  constructor(record) {
    super(record);
    this.url = this.id;
    this.icon = Seq(this.icons).maxBy(icon => icon.size).url;
  }

  open() {
    window.chrome.management.launchApp(this.id);
  }
}
