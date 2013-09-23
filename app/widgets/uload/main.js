/**
 * ## Upload
 *
 * Thes components allows the user of your applications to attach documents and files to the application.
 *
 * ### Dependencies
 *
 * - `jquery.fileupload`: This plugin uses [jQuery File upload plugin](https://github.com/blueimp/jQuery-File-Upload) to handle the file upload gracefully. Please note that the plugin is packaged within the component so you don't have to struggle against the dependencies.
 * - ` storage`: This plugin requires that you have attahed an S3 storage to your Hull application in the admin.
 *
 * ### Templates
 *
 * - `upload`: The main template. Because the jQuery plugin has some requirements, the template makes sure everything is set up as needed.
 * - `upload_file_multiple`: Partial used to upload multiple files at once. Override this partial to ustomize the file upload to your needs.
 * - `upload_file_single`: Partial used to upload a single file. Override this partial to ustomize the file upload to your needs.
 *
 * ### Options
 *
 * - `storage`: Specifies the storage engine to be used. If a single engine is known to the app, it will be automatically used. If there are many engines available, it must correspond to a value in `sandbox.config.services.types.storage`.
 *
 * ### Events
 *
 * - `hull.upload.send`: Triggered when an upload has started.
 * - `hull.upload.progress`: Triggered when an upload is in progress. The total amount of data as well as the current amount of data transfered are available as a listener parameter.
 * - `hull.upload.done`: Triggered when an upload has finished. References to the uploadded files are available in an Array as the first parameter to the listeners.
 */
Hull.widget('uload', {
  type: 'Hull',

  templates: [ 'upload', 'file_single' ],

  fileTypes: {
    images :  /(\.|\/)(gif|jpe?g|png)$/i,
    videos :  /(\.|\/)(mov|mkv|mpg|wmv|mp4|m4v)$/i
  },

  fileProcessors: {
    images: [
      { action: 'load', fileTypes: /^image\/(gif|jpeg|png)$/, maxFileSize: 20000000 },
      { action: 'resize', maxWidth: 1440, maxHeight: 900 },
      { action: 'save' }
    ]
  },

  uploader_events: [
    'fileuploadadd',
    'fileuploadadded',
    'fileuploadalways',
    'fileuploadchange',
    'fileuploadcompleted',
    'fileuploaddestroy',
    'fileuploaddestroyed',
    'fileuploaddone',
    'fileuploaddragover',
    'fileuploaddrop',
    'fileuploadfail',
    'fileuploadfailed',
    'fileuploadfinished',
    'fileuploadpaste',
    'fileuploadprogress',
    'fileuploadprogressall',
    'fileuploadsend',
    'fileuploadsent',
    'fileuploadstart',
    'fileuploadstarted',
    'fileuploadstop',
    'fileuploadstopped',
    'fileuploadsubmit'
  ],

  uploader_options: {
    autoUpload : true,
    maxNumberOfFiles:1,
    maxFileSize: 5000000,
    minFileSize:0,
    dropZone: '.dropzone',
    type : 'POST'
    // previewSourceMaxFileSize: 5000000
    // previewMaxWidth: 80
    // previewMaxHeight: 80
  },

  selectStoragePolicy: function () {
    var storagePolicies = [],
        selectedPolicy,
        optionValue = this.options.storage;
    if (this.sandbox.config.services.types.storage) {
      storagePolicies = this.sandbox.config.services.types.storage;
    }
    var countPolicies = storagePolicies.length;
    if (countPolicies === 1) {
      selectedPolicy = storagePolicies[0];
    } else if (countPolicies > 1) {
      if (!optionValue) {
        throw new TypeError('You must specify a storage policy.');
      }
      if (storagePolicies.hasOwnProperty(optionValue)) {
        selectedPolicy = storagePolicies[optionValue];
      } else {
        throw new TypeError('Unknown storage policy: ', optionValue);
      }
    } else {
      console.warn('No storage policy declared for the app. Unable to save the pictures.');
    }

    return this.sandbox.config.services.settings[selectedPolicy];
  },

  beforeRender: function (data) {
    data.upload_policy = this.selectStoragePolicy();
    return data;
  },

  afterRender: function () {
    this.form = this.$el.find('form');
    var opts = this.sandbox.util._.defaults(this.uploader_options, {
      dataType:         'xml',
      url:              this.form.attr('action'),
      dropZone:         this.$el.find(this.uploader_options.dropZone),
      acceptFileTypes:  this.fileTypes.images
    });

    this.form.fileupload(opts);
    this.uploader = this.form.data('fileupload');
    this.dropzone = this.$el.find(this.uploader_options.dropZone);

    var emit = this.sandbox.emit, form = this.form;

    this.sandbox.util._.each(this.uploader_events, function(evt) {
      var n = evt.replace(/^fileupload/, '');
      form.on(evt, function(e,d) { emit('hull.upload.' + n, { event: e, data: d }); });
    });

    this.form.on('fileuploadadd',       this.onAdd);
    this.form.on('fileuploaddragover',  this.onDragOver);
    this.form.on('fileuploaddrop',      this.onDrop);
    this.form.on('fileuploadsend',      this.onSend);
    this.form.on('fileuploadsubmit',    this.onSubmit);
    this.form.on('fileuploadprogress',  this.onProgress);
    this.form.on('fileuploadfail',      this.onFail);
    this.form.on('fileuploadsuccess',   this.onSuccess);
    this.form.on('fileuploaddone',      this.onDone);

  },

  start: function () {
    this.form.fileupload('send', this.upload_data);
  },

  cancel: function () {},

  delete: function () {},

  onDrop: function () {
    this.dropzone.find('b').text('Thanks !');
    this.dropzone.removeClass('dropzone');
  },

  onDragOver: function () {
    this.dropzone.addClass('dragover');
    clearTimeout(this.dragOverEffect);
    var self = this;
    this.dragOverEffect = setTimeout(function () { self.dropzone.removeClass('dragover'); }, 100);
  },

  onAdd: function (e, data) {
    var key = this.$el.find('[name="key"]');
    var s = key.val();
    key.val(s.replace('${filename}', "/" + data.files[0].name));
    this.$el.find('[name="Filename"]').val(data.files[0].name);
    this.$el.find('[name="name"]').val(data.files[0].name);
    this.$el.find('[name="Content-Type"]').val(data.files[0].type);
    return this.upload_data = data;
  },

  onSend: function (e, data) {
    this.$el.find('.progress').fadeIn();
  },

  onSubmit: function (e, data) {
    this.toggleDescription();
  },

  toggleDescription: function () {
    var descriptionElt = this.$el.find('[name=description]');
    if (descriptionElt.is(':disabled')) {
      descriptionElt.removeAttr('disabled');
      descriptionElt.val('');
    } else {
      this.description = descriptionElt.val() || undefined;
      this.$el.find('[name=description]').attr('disabled', 'disabled');
    }
  },

  onProgress: function (e, data) {
    this.$el.find('.bar').css('width', data.percent + '%');
  },

  onFail: function (e, data) {
    this.$el.find('.error').text('Error :#{data.errorThrown}');
  },

  onDone: function (e, data) {
    this.$el.find('.progress').fadeOut(300, function () {});
    this.$el.find('.bar').css('width', 0);
    this.onUploadDone(data);
  },

  onUploadDone: function (data) {
    // var location = $(data.result).find('Location').text();
    // Context.app.addImage(filename: data.files[0].name)
    this.sandbox.util._.map(data.files, this.sandbox.util._.bind(function (file) {
      file.url = this.fileUrl(file.name);
      file.description = this.description;
    }, this));
    this.toggleDescription();
    this.uploader.options.maxNumberOfFiles++;
  },

  multipleUpload: function () {
    return false;
    // return (this.uploader.options.maxNumberOfFiles > 1);
  },

  fileUrl: function (filename) {
    var policy = this.selectStoragePolicy();
    return encodeURI(policy.url + policy.params.key.replace('${filename}', '/' + filename));
  },

  initialize: function () {
    var _ = this.sandbox.util._;
    _.bindAll.apply(undefined, [this].concat(_.functions(this)));
  }
});
