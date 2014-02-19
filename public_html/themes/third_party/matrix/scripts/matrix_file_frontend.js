(function($) {
	Matrix.bind('file', 'display', function(cell){

		var container = $(cell.dom.$td);
		var uploadControls = container.find('.upload_controls');
		var existingFile = container.find('.existing_file');
		var existingThumb = container.find('.matrix-thumb, .matrix-filename');
		var undoRemove = container.find('a.undo_remove');

		if (existingFile.val().length > 1)
		{
			uploadControls.hide();
			undoRemove.hide();
			container.find('.matrix-thumb a').click(function () {
				uploadControls.show();
				existingThumb.hide();
				existingFile.attr('name', 'not_' + existingFile.attr('name'));
				undoRemove.show();
				return false;
			});
		}

		undoRemove.click(function () {
			uploadControls.hide();
			undoRemove.hide();
			existingThumb.show();
			existingFile.attr('name', existingFile.attr('name').replace(/^not_/, ''));
			return false;
		});


	});

})(jQuery);
