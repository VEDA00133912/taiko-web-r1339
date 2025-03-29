export default class Plugin extends Patch {
  name = 'Change Timing Window';
  version = '25.03.29';
  description = 'Custom input interval for in-game notes';
  author = 'Katie Frogs(translated by ryo)';

  name_lang = {
    ja: '判定タイミングの調整',
    en: 'Change Timing Window',
    cn: '调整判决时间',
    tw: '調整決策時間',
    ko: '판정 타이밍 조정',
  };

  description_lang = {
    ja: '判定幅を変更します',
    en: 'Custom input interval for in-game notes',
    cn: '自定义游戏内音符的输入间隔',
    tw: '自訂遊戲內音符的輸入間隔',
    ko: '게임 내 노트의 입력 간격을 사용자 정의합니다',
  };

  score = {
    good: 25,
    ok: 75,
    bad: 108,
  };
  disableMultiplayer = true;

  strings = {
    good: {
      name: 'GOOD',
      name_lang: {
        ja: '良',
        en: 'GOOD',
        cn: '良',
        tw: '良',
        ko: '얼쑤',
      },
      description: 'Default: 25ms',
      description_lang: {
        ja: 'デフォルト: 25ms',
        en: 'Default: 25ms',
        cn: '默认: 25ms',
        tw: '預設: 25ms',
        ko: '기본값: 25ms',
      },
      format: '%sms',
      format_lang: {
        ja: '%sms',
        en: '%sms',
        cn: '%sms',
        tw: '%sms',
        ko: '%sms',
      },
    },
    ok: {
      name: 'OK',
      name_lang: {
        ja: '可',
        en: 'OK',
        cn: '可',
        tw: '可',
        ko: '좋다',
      },
      description: 'Default: 75ms',
      description_lang: {
        ja: 'デフォルト: 75ms',
        en: 'Default: 75ms',
        cn: '默认: 75ms',
        tw: '預設: 75ms',
        ko: '기본값: 75ms',
      },
      format: '%sms',
      format_lang: {
        ja: '%sms',
        en: '%sms',
        cn: '%sms',
        tw: '%sms',
        ko: '%sms',
      },
    },
    bad: {
      name: 'BAD',
      name_lang: {
        ja: '不可',
        en: 'BAD',
        cn: '不可',
        tw: '不可',
        ko: '에구',
      },
      description: 'Default: 108ms',
      description_lang: {
        ja: 'デフォルト: 108ms',
        en: 'Default: 108ms',
        cn: '默认: 108ms',
        tw: '預設: 108ms',
        ko: '기본값: 108ms',
      },
      format: '%sms',
      format_lang: {
        ja: '%sms',
        en: '%sms',
        cn: '%sms',
        tw: '%sms',
        ko: '%sms',
      },
    },
  };

  load() {
    languageList.forEach((lang) => {
      Object.keys(this.strings).forEach((name) => {
        this.strings[name].name_lang[lang] = allStrings[lang][name];
        this.strings[name].format_lang[lang] = allStrings[lang].calibration.ms;
      });
    });

    this.addEdits(
      new EditFunction(GameRules.prototype, 'init').load((str) => {
        return plugins.insertBefore(
          str,
          `this.good = this.getTiming("good")
				this.ok = this.getTiming("ok")
				this.bad = this.getTiming("bad")
				if(this.good > 25 || this.ok > 75){
					game.controller.saveScore = false
				}
				`,
          'this.daiLeniency'
        );
      }),
      new EditValue(GameRules.prototype, 'getTiming').load(() =>
        this.getTiming.bind(this)
      )
    );
  }
  getTiming(name) {
    if (name === 'bad') {
      return Math.max(...Object.values(this.score));
    } else {
      return this.score[name];
    }
  }
  start() {
    if (this.disableMultiplayer) {
      p2.disable();
    }
  }
  stop() {
    if (this.disableMultiplayer) {
      p2.enable();
    }
  }
  settings() {
    return Object.keys(this.strings).map((name) => {
      var str = this.strings[name];
      return {
        name: str.name,
        name_lang: str.name_lang,
        description: str.description,
        description_lang: str.description_lang,
        format: str.format,
        format_lang: str.format_lang,
        type: 'number',
        min: 0,
        default: this.score[name],
        getItem: () => this.score[name],
        setItem: (value) => {
          this.score[name] = value;
        },
      };
    });
  }
}
