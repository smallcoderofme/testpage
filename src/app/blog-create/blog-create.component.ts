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
  cancelHandler() {}
  confirmHandler() {}
}
