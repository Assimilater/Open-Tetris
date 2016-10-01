const {
	app,
	BrowserWindow,
	Menu,
	MenuItem,
	Accelerator,
} = require('electron');

// Keep a global reference of all windows; lest the window be closed automatically with garbage collection
let WinMain;

var theme = {
	primary:    '#282F44', // Dark Blue
	sedonary:   '#2F243A', // Dark Purple
	background: '#293132', // Dark Gray
	border:     '#5A5A66', // Gray
	content:    '#EAEBF2', // Light Gray
};

function start() {
	WinMain = new BrowserWindow({
		width: 800,
		height: 600,
		show: false, // So we can start maximized
		center: true,
		title: 'Open Tetris',
		backgroundColor: theme.background,
		webPreferences: {
			devTools: true,
		},
	});
	WinMain.maximize();

	// File Menu
	var file = new Menu();
	
	file.append(new MenuItem({
		label: '&Disonnect',
		accelerator: 'Ctrl+D',
		click: function() {
			
		},
	}));
	
	file.append(new MenuItem({
		label: '&Options',
		accelerator: 'Ctrl+O',
		click: function() {
			
		},
	}));
	
	file.append(new MenuItem({ type: 'separator' }));
	file.append(new MenuItem({
		label: 'E&xit',
		role: 'close',
		accelerator: 'Alt+F4',
	}));

	// Add all the menus
	var menu = new Menu();
	menu.append(new MenuItem({
		label: '&File',
		submenu: file,
	}));
	menu.append(new MenuItem({
		label: '&Debug',
		accelerator: 'F12',
		click: function() {
			WinMain.webContents.openDevTools();
		},
	}));
	Menu.setApplicationMenu(menu);

	game();

	WinMain.on('closed', function() {
		WinMain = null;
	});
}

function game() {
	// Load the view
	WinMain.loadURL(`file://${__dirname}/gui/main.html`);
}

function connect() {
	
}

// Open the main window when Electron has finished initialization
app.on('ready', start);

// Quit when all windows are closed
app.on('window-all-closed', function() {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darWinMain') { app.quit(); }
});

app.on('activate', function() {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (WinMain === null) { start(); }
});
