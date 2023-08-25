fx_version 'cerulean'
game 'gta5'

description 'QB-Multicharacter'
version '1.2.0'

shared_scripts {
    '@qb-core/shared/locale.lua',
    'config.lua'
}

client_scripts {
    'client/main.lua'
}


ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/themelib.css',
    'html/functions.js',
    'html/functionslib.js',
    'html/main.js',
    'html/profanity.js'
}

lua54 'yes'
