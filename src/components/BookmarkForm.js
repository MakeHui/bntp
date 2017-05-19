import React, { PropTypes } from 'react';

import { Bookmark, Link } from '../models';

import './BookmarkForm.css';

export class BookmarkEditorForm extends React.Component {
  static propTypes = {
    bookmark: PropTypes.instanceOf(Bookmark).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.getEditingBookmark());
  }

  onWrapClick(e) {
    e.preventDefault();
    this.props.onCancel(this.getEditingBookmark());
  }

  onInputChange(e) {
    this.props.onChange(this.getEditingBookmark());
  }

  getEditingBookmark() {
    return new Bookmark({
      id: this.props.bookmark.id,
      title: this.refs.title.value,
      link: new Link({url: this.refs.url.value}),
    });
  }

  render() {
    const { bookmark } = this.props;
    return (
      <div className="BookmarkEditorForm__Wrap" onClick={e => this.onWrapClick(e)}>
        <form className="BookmarkEditorForm" onClick={e => e.stopPropagation()} onSubmit={e => this.onSubmit(e)}>
          <div>
            <input type="text" ref="title" defaultValue={bookmark.title}
              className="BookmarkEditorForm__TextInput"
              onChange={e => this.onInputChange(e)}/>
          </div>
          <div>
            <input type="text" ref="url" defaultValue={bookmark.link.url}
              className="BookmarkEditorForm__UrlInput"
              style={{backgroundImage: `url(${bookmark.link.getIcon()})`}}
              onChange={e => this.onInputChange(e)}/>
          </div>
          <div>
            <input type="submit" value="Update" className="BookmarkEditorForm__Submit"/>
          </div>
        </form>
      </div>
    );
  }
}