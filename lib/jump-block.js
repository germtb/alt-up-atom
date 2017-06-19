atom.commands.add('atom-text-editor', 'jump-block:up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.setBufferPosition([previousBlockRow(buffer, cursor.getBufferRow()), 0]);
		cursor.moveToFirstCharacterOfLine();
	});
});

atom.commands.add('atom-text-editor', 'jump-block:extend-up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.selection.selectToBufferPosition([previousBlockRow(buffer, cursor.getBufferRow()), 0]);
	});
});

atom.commands.add('atom-text-editor', 'jump-block:down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.setBufferPosition([nextBlockRow(buffer, cursor.getBufferRow()), 0]);
		cursor.moveToFirstCharacterOfLine();
	});
});

atom.commands.add('atom-text-editor', 'jump-block:extend-down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.selection.selectToBufferPosition([endOfBlockRow(buffer, cursor.getBufferRow()), 0]);
	});
});

function previousBlockRow(buffer, row) {
	if (row <= 0) {
		return 0;
	}

	const lines = buffer.lines || buffer.getLines();

	for (let i = row - 2; i >= 0; i = i - 1) {
		if (lines[i].match(/^\s*$/) && !lines[i + 1].match(/^\s*$/)) {
			return i + 1;
		}
	}

	return 0;
}

function nextBlockRow(buffer, row) {
	const lines = buffer.lines || buffer.getLines();
	if (row >= lines.length - 1) {
		return lines.length - 1;
	}

	for (let i = row; i < lines.length; i++) {
		if (lines[i].match(/^\s*$/)) {
			if (!lines[i + 1]) {
				continue;
			}

			if (lines[i + 1].match(/^\s*$/)) {
				continue;
			} else {
				return i + 1;
			}
		}
	}

	return lines.length - 1;
}

function endOfBlockRow(buffer, row) {
	const lines = buffer.lines || buffer.getLines();
	if (row >= lines.length - 1) {
		return lines.length - 1;
	}

	for (let i = row + 1; i < lines.length; i++) {
		if (lines[i].match(/^\s*$/)) {
			if (!lines[i + 1]) {
				continue;
			}

			if (lines[i + 1].match(/^\s*$/)) {
				continue;
			} else {
				return i;
			}
		}
	}

	return lines.length - 1;
}
