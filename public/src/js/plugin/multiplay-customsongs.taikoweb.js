export default class Plugin extends Patch {
  name = 'Multiplayer Custom Songs';
  version = '25.03.01';
  description =
    'Extends netplay and session multiplayer to custom song lists, both players are required to have the same folders';
  author = 'Katie Frogs(translated by ryo)';

  name_lang = {
    ja: '創作譜面ネットプレイ',
    en: 'Multiplayer Custom Songs',
    cn: '多人自定义歌曲',
    tw: '多人自訂歌曲',
    ko: '멀티플레이어 커스텀 곡',
  };

  description_lang = {
    ja: 'ネットプレイ時に同じ譜面を持ったプレイヤーと創作譜面で遊べる',
    en: 'Extends netplay and session multiplayer to custom song lists, both players are required to have the same folders',
    cn: '将网络游戏和会话多人游戏扩展到自定义歌单，要求双方拥有相同的文件夹',
    tw: '將網路遊戲和會話多人遊戲延伸至自訂歌單，要求雙方玩家擁有相同的資料夾',
    ko: '넷플레이 및 세션 멀티플레이를 사용자 지정 노래 목록으로 확장하며, 두 플레이어 모두 동일한 폴더가 필요합니다.',
  };

  strings = {
    customSessionTutorial: {
      en: 'Share this code with your friend to start playing together! Your friend should import the exact same folder as you, and use the Join Invite button on the session screen with the provided code.',
      ja: 'このコードを友達と共有して、一緒にプレイを始めよう！あなたと全く同じフォルダをインポートし、セッション画面の「Join Invite」ボタンを使用して、提供されたコードで参加してください',
      cn: '将此代码与您的朋友分享以开始一起游戏！您的朋友应导入与您完全相同的文件夹，并在会话屏幕上使用提供的代码和“加入邀请”按钮。',
      tw: '將此代碼與您的朋友分享以開始一起遊玩！您的朋友應導入與您完全相同的資料夾，並在會話螢幕上使用提供的代碼並點擊「Join Invite」按鈕。',
      ko: "이 코드를 친구와 공유하여 함께 게임을 시작하세요! 친구는 당신과 정확히 동일한 폴더를 가져와야 하며, 세션 화면에서 제공된 코드로 'Join Invite' 버튼을 사용해야 합니다.",
    },
    joinInvite: {
      en: 'Join Invite',
      ja: '参加招待',
      cn: '加入邀请',
      tw: '加入邀請',
      ko: '초대 참여',
    },
    inviteDescription: {
      en: 'Provide the invite code from your friend',
      ja: '招待コードを入力してください',
      cn: '提供您朋友的邀请代码',
      tw: '提供朋友的邀請代碼',
      ko: '친구에게서 받은 초대 코드를 입력하세요',
    },
    incorrectFolder: {
      en: 'Folders do not match. To connect, both players must import the exact same folders.',
      ja: 'フォルダが一致しません。接続するには、両方のプレイヤーが全く同じフォルダをインポートする必要があります',
      cn: '文件夹不匹配。要连接，两个玩家必须导入完全相同的文件夹。',
      tw: '資料夾不匹配。要連接，兩個玩家必須導入完全相同的資料夾。',
      ko: '폴더가 일치하지 않습니다. 연결하려면 두 플레이어 모두 동일한 폴더를 가져와야 합니다.',
    },
    incorrectInvite: {
      en: 'The invite is not in the correct format.',
      ja: '招待コードの形式が正しくありません',
      cn: '邀请格式不正确。',
      tw: '邀請格式不正確。',
      ko: '초대 코드 형식이 올바르지 않습니다.',
    },
    customSessionError: {
      en: 'Session Disconnected\n\nTo connect, both players must import the exact same folders.',
      ja: 'セッションが切断されました\n\n接続するには、両方のプレイヤーが全く同じフォルダをインポートする必要があります',
      cn: '会话断开\n\n要连接，两个玩家必须导入完全相同的文件夹。',
      tw: '會話已斷開\n\n要連接，兩個玩家必須導入完全相同的資料夾。',
      ko: '세션이 끊어졌습니다\n\n연결하려면 두 플레이어 모두 동일한 폴더를 가져와야 합니다.',
    },
  };

  load() {
    this.addEdits(
      new EditFunction(SongSelect.prototype, 'init').load((str) => {
        return plugins.strReplace(str, 'if(!assets.customSongs)', ``);
      }),
      new EditFunction(SongSelect.prototype, 'mouseDown').load((str) => {
        return plugins.strReplace(str, ' && !assets.customSongs', ``);
      }),
      new EditFunction(SongSelect.prototype, 'mouseMove').load((str) => {
        return plugins.strReplace(str, ' && !assets.customSongs', ``);
      }),
      new EditFunction(SongSelect.prototype, 'toSession').load((str) => {
        return plugins.strReplace(str, ' || assets.customSongs', ``);
      }),
      new EditFunction(SongSelect.prototype, 'redraw').load((str) => {
        str = plugins.strReplace(str, ' && !assets.customSongs', ``);
        return plugins.insertBefore(
          str,
          `}else if(this.showWarning.name === "customSessionError"){
                      var text = this.customMpStr("customSessionError")
                  `,
          '}else if(this.showWarning.name === "loadSongError"){'
        );
      }),
      new EditFunction(SongSelect.prototype, 'toLoadSong').load((str) => {
        return plugins.strReplace(str, ' && !assets.customSongs', ``);
      }),
      new EditFunction(SongSelect.prototype, 'onusers').load((str) => {
        return plugins.strReplace(str, ' |0', ``);
      }),
      new EditFunction(SongSelect.prototype, 'toOptions').load((str) => {
        return plugins.strReplace(str, ' || assets.customSongs', ``);
      }),
      new EditFunction(ImportSongs.prototype, 'addTja').load((str) => {
        return plugins.insertAfter(
          str,
          'songObj.hash = hash',
          `
                  songObj.id = hash`
        );
      }),
      new EditFunction(ImportSongs.prototype, 'addOsu').load((str) => {
        return plugins.insertAfter(
          str,
          'songObj.hash = hash',
          `
                  songObj.id = hash`
        );
      }),
      new EditFunction(Session.prototype, 'init').load((str) => {
        str = plugins.insertBefore(
          str,
          `if(assets.customSongs){
                      this.customSongsHash = p2.customSongsHash()
                      var leftButtons = document.createElement("div")
                      leftButtons.classList.add("left-buttons")
                      this.joinInvite = document.createElement("div")
                      this.joinInvite.classList.add("taibtn", "stroke-sub", "link-btn")
                      this.joinInvite.innerText = this.customMpStr("joinInvite")
                      leftButtons.appendChild(this.joinInvite)
                      this.endButton.parentNode.insertBefore(leftButtons, this.endButton)
                  }
                  `,
          'if(touchEnabled){'
        );
        str = plugins.strReplace(
          str,
          'strings.session.linkTutorial',
          `assets.customSongs ? this.customMpStr("customSessionTutorial") : strings.session.linkTutorial`
        );
        str = plugins.insertAfter(
          str,
          '}else if(response.type === "songsel"){',
          `
                      var nameMsg = p2.getMessage("name")
                      if(assets.customSongs && (!nameMsg.value?.don?.customSongs || nameMsg.value.don.customSongs !== this.customSongsHash) || !assets.customSongs && nameMsg.value?.don?.customSongs){
                          p2.otherConnected = false
                          p2.session = false
                          this.onEnd(false, true)
                      }else{
                  `
        );
        str = plugins.insertAfter(
          str,
          'pageEvents.send("session-start", "host")',
          `
                  }`
        );
        str = plugins.insertBefore(
          str,
          `if(response.type === "gameend" && assets.customSongs){
                      this.sendInviteRequest()
                  }else if(response.type === "invite" && assets.customSongs){
                      if(response.value){
                          this.inviteCode = response.value
                          this.sessionInvite.innerText = response.value + "-" + this.customSongsHash.slice(0, 5).toLowerCase()
                          p2.hash(response.value)
                      }else{
                          p2.clearMessage("users")
                          this.onEnd()
                          pageEvents.send("session-start", "host")
                      }
                  }else `,
          'if(response.type === "invite"){'
        );
        return plugins.strReplace(
          str,
          'p2.send("invite", {\n\t\t\tid: null,\n\t\t\tname: account.loggedIn ? account.displayName : null,\n\t\t\tdon: account.loggedIn ? account.don : null\n\t\t})',
          `this.sendInviteRequest()`
        );
      }),
      new EditFunction(Session.prototype, 'mouseDown').load((str) => {
        return plugins.insertBefore(
          str,
          `if(event.target === this.joinInvite){
                      var code = prompt(this.customMpStr("inviteDescription"), "").trim()
                      if(code){
                          if(code.length === 11){
                              code = code.toLowerCase().split("-")
                              if(code[0].length === code[1].length && code[0] !== this.inviteCode){
                                  if(code[1] === this.customSongsHash.slice(0, 5).toLowerCase()){
                                      this.sessionInvite.innerText = ""
                                      p2.send("leave")
                                      p2.hash(code[0])
                                      return this.sendInviteRequest(code[0])
                                  }else{
                                      return alert(this.customMpStr("incorrectFolder"))
                                  }
                              }
                          }
                          alert(this.customMpStr("incorrectInvite"))
                      }
                  }else `,
          'if(event.target === this.endButton){'
        );
      }),
      new EditFunction(Session.prototype, 'onEnd').load((str, args) => {
        args.push('p2Disconnect');
        str = plugins.insertAfter(
          str,
          'setTimeout(() => {',
          `
                  if(p2Disconnect){
                      p2.send("gameend")
                      p2.otherConnected = false
                      p2.session = false
                      new SongSelect(false, false, this.touchEnabled, null, {
                          name: "customSessionError"
                      })
                  }else{`
        );
        return plugins.insertBefore(str, `}`, '}, 500)');
      }),
      new EditFunction(Session.prototype, 'clean').load((str) => {
        return plugins.insertAfter(
          str,
          'delete this.sessionInvite',
          `
                  if(assets.customSongs){
                      delete this.joinInvite
                  }`
        );
      }),
      new EditFunction(Search.prototype, 'onClick').load((str) => {
        return plugins.strReplace(
          str,
          'var songId = parseInt(songEl.dataset.songId)',
          `var songId = Number(songEl.dataset.songId)
                  if(isNaN(songId)){
                      songId = songEl.dataset.songId
                  }`
        );
      }),
      new EditFunction(Search.prototype, 'keyPress').load((str) => {
        return plugins.strReplace(
          str,
          'this.proceed(parseInt(this.results[this.active].dataset.songId))',
          `var songId = Number(this.results[this.active].dataset.songId)
                  if(isNaN(songId)){
                      songId = this.results[this.active].dataset.songId
                  }
                  this.proceed(songId)`
        );
      }),
      new EditValue(p2, 'customSongsHash').load(() => this.customSongsHash),
      new EditValue(Session.prototype, 'customMpStr').load(() =>
        this.customMpStr.bind(this)
      ),
      new EditValue(Session.prototype, 'sendInviteRequest').load(
        () => this.sendInviteRequest
      ),
      new EditValue(SongSelect.prototype, 'customMpStr').load(() =>
        this.customMpStr.bind(this)
      )
    );
  }
  customSongsHash() {
    return md5
      .base64(assets.songs.map((song) => song.hash).join(''))
      .slice(0, -2);
  }
  customMpStr(name) {
    var str = this.strings[name];
    return plugins.getLocalTitle(str.en, str);
  }
  sendInviteRequest(id) {
    var don = account.loggedIn
      ? { ...account.don }
      : assets.customSongs
        ? {}
        : null;
    if (assets.customSongs) {
      don.customSongs = this.customSongsHash;
    }
    p2.send('invite', {
      id: id || null,
      name: account.loggedIn ? account.displayName : null,
      don: don,
    });
  }
  start() {
    if (assets.customSongs) {
      assets.songs.forEach((song) => (song.id = song.hash));
    }
  }
  stop() {
    if (assets.customSongs) {
      assets.songs.forEach((song) => (song.id = song.order));
    }
  }
}
