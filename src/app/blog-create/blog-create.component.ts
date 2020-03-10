import { Component, OnInit } from '@angular/core';
// import { Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../UIEditor/upload-adapter';
@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  public Editor;
  public config: object;
  uplpadPlugin;
  isBrowser = false;
  model = {
    postTitle: '',
    postContent: ''
  };
  tags = [
    { name: 'art', id: 'djs3b423brwe' },
    { name: 'life', id: 'djs3as423brwe' },
    { name: 'view', id: 'djs3b42sad3brwe' } ];
  selectedTags = [];
  constructor() {
    this.Editor = ClassicEditor;
    this.uplpadPlugin = CustomUploadAdapterPlugin;
    this.isBrowser = true;
  }
  // constructor(@Inject(PLATFORM_ID) platformId: object) {
  //   this.isBrowser = isPlatformBrowser(platformId);
  //   if ( this.isBrowser ) {
  //     const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
  //     const CustomUploadAdapterPlugin = require('../UIEditor/upload-adapter').CustomUploadAdapterPlugin;
  //     this.Editor = ClassicEditor;
  //     this.uplpadPlugin = CustomUploadAdapterPlugin;
  //   }
  // }

  ngOnInit(): void {
    this.config = {
      language: 'zh-cn',
      toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'CKFinder'
        ]
      },
      image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
        ]
      },
      table: {
          contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells'
          ]
      },
      licenseKey: '',
      uploadContent: () => {},
      extraPlugins: [this.uplpadPlugin]
    };
  }
  selectedTag(tag) {
    this.selectedTags.push(tag);
    const count: number = this.tags.length;
    for (let i = 0; i < count; i++) {
      if (this.tags[i].id === tag.id) {
        this.tags.splice(i, 1);
        break;
      }
    }
  }
  unSelect(tag) {
    this.tags.push(tag);
    const count: number = this.selectedTags.length;
    for (let i = 0; i < count; i++) {
      if (this.selectedTags[i].id === tag.id) {
        this.selectedTags.splice(i, 1);
        break;
      }
    }
  }
  cancelHandler() {}
  confirmHandler() {
    console.log( this.model.postContent );
  }
}
