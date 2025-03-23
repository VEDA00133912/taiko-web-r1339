var assets = {
  js: [
    'lib/md5.min.js',
    'lib/fuzzysort.js',
    'loadsong.js',
    'parseosu.js',
    'titlescreen.js',
    'scoresheet.js',
    'songselect.js',
    'keyboard.js',
    'gameinput.js',
    'game.js',
    'controller.js',
    'circle.js',
    'view.js',
    'mekadon.js',
    'gamepad.js',
    'tutorial.js',
    'soundbuffer.js',
    'p2.js',
    'canvasasset.js',
    'viewassets.js',
    'gamerules.js',
    'canvasdraw.js',
    'canvastest.js',
    'canvascache.js',
    'parsetja.js',
    'autoscore.js',
    'about.js',
    'debug.js',
    'session.js',
    'importsongs.js',
    'logo.js',
    'settings.js',
    'scorestorage.js',
    'account.js',
    'lyrics.js',
    'customsongs.js',
    'abstractfile.js',
    'idb.js',
    'plugins.js',
    'search.js',
  ],
  css: [
    'main.css',
    'titlescreen.css',
    'loadsong.css',
    'game.css',
    'debug.css',
    'songbg.css',
    'view.css',
    'search.css',
  ],
  img: [
    'notes.png',
    'notes_drumroll.png',
    'notes_hit.png',
    'notes_explosion.png',
    'renda.png',
    'balloon.png',
    'taiko.png',
    'don_anim_normal_a.png',
    'don_anim_normal_b1.png',
    'don_anim_normal_b2.png',
    'don_anim_10combo_a.png',
    'don_anim_10combo_b1.png',
    'don_anim_10combo_b2.png',
    'don_anim_gogo_a.png',
    'don_anim_gogo_b1.png',
    'don_anim_gogo_b2.png',
    'don_anim_gogostart_a.png',
    'don_anim_gogostart_b1.png',
    'don_anim_gogostart_b2.png',
    'don_anim_clear_a.png',
    'don_anim_clear_b1.png',
    'don_anim_clear_b2.png',
    'fire_anim.png',
    'fireworks_anim.png',
    'bg_score_p1.png',
    'bg_score_p2.png',
    'bg_pause.png',
    'badge_auto.png',
    'badge_x2.png',
    'badge_x3.png',
    'badge_x4.png',
    'badge_s1.png',
    'badge_s0.25.png',
    'badge_s0.5.png',
    'badge_doron.png',
    'badge_don.png',
    'badge_kat.png',
    'mimizu.png',
  ],
  cssBackground: {
    '#title-screen': 'title-screen.png',
    '#loading-don': 'dancing-don.gif',
    '.pattern-bg': 'bg-pattern-1.png',
    '.song-search-result-course::before': 'difficulty.png',
    '#song-select': 'bg_genre_def.png',
    '.settings-outer': 'bg_settings.png',
    '#touch-pause-btn': 'touch_pause.png',
    '#touch-full-btn': 'touch_fullscreen.png',
    '#gamepad-bg, #gamepad-buttons': 'settings_gamepad.png',
    '.song-search-result-crown': 'crown.png',
    '.song-search-tip-error': 'miss.png',
    '#song-search': 'bg_search.png',
  },
  audioSfx: [
    'se_pause.ogg',
    'se_calibration.ogg',

    'v_results.ogg',
    'v_sanka.ogg',
    'v_songsel.ogg',
    'v_start.ogg',
    'v_title.ogg',
  ],
  audioSfxLR: [
    'neiro_1_don.ogg',
    'neiro_1_ka.ogg',
    'se_cancel.ogg',
    'se_don.ogg',
    'se_ka.ogg',
    'se_hidden.ogg',
    'se_jump.ogg',

    'se_balloon.ogg',
    'se_gameclear.ogg',
    'se_gamefail.ogg',
    'se_gamefullcombo.ogg',
    'se_results_countup.ogg',
    'se_results_crown.ogg',

    'v_fullcombo.ogg',
    'v_donderfullcombo.ogg',
    'v_meka_donderfulcombo.ogg',
    'v_renda.ogg',
    'v_results_fullcombo.ogg',
    'v_results_fullcombo2.ogg',
  ],
  audioSfxLoud: ['v_diffsel.ogg'],
  audioMusic: [
    'bgm_songsel.mp3',
    'bgm_result.mp3',
    'bgm_setsume.mp3',
    'bgm_settings.mp3',
  ],
  fonts: {
    Kozuka: 'Kozuka.otf',
    TnT: 'TnT.ttf',
  },
  views: [
    'game.html',
    'loadsong.html',
    'songselect.html',
    'titlescreen.html',
    'tutorial.html',
    'about.html',
    'debug.html',
    'session.html',
    'settings.html',
    'account.html',
    'login.html',
    'customsongs.html',
    'search.html',
  ],

  songs: [],
  sounds: {},
  image: {},
  pages: {},
  categories: [],
};

var gameConfig = {};