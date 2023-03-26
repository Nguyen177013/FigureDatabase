/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.width = '100%';
	config.height = '10rem';    
	config.removePlugins = 'elementspath';
	config.resize_enabled = false;
	// config.removeButtons = 'Underline,JustifyCenter';
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'Source,Save,Templates,NewPage,Preview,Print,Find,SelectAll,Scayt,Replace,About,Maximize,ShowBlocks,TextColor,BGColor,Styles,Format,Font,FontSize,Iframe,PageBreak,SpecialChar,HorizontalRule,Table,Anchor,Unlink,Link,Flash,Image,Language,BidiRtl,BidiLtr,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CreateDiv,Blockquote,Outdent,Indent,BulletedList,NumberedList,CopyFormatting,RemoveFormat,Italic,Underline,Strike,Subscript,Superscript,Form,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Redo,Undo,Cut,Copy,Paste,PasteText,PasteFromWord';
};
