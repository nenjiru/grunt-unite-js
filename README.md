#JavaScript Compiler


分割管理された JavaScript の結合（コンパイル）と HTMLファイルの SCRIPT要素の挿入を行う Grunt task です。  
コンパイル時にモードを指定することで SCRIPT要素の挿入方法を制御します。

## サンプルをつかう

Gruntfile.js のあるディレクトリで npm install します。

## DEV版で出力する

>$ grunt unite-js:dev

開発モードでコンパイルします。  
分割された js の読み込みタグ（&lt;script&gt;）を HTML に差し込みます。
HTML本文にはプレースホルダーとなるコメントが必要です

    <!-- javascript -->
    <!-- //javascript -->


## APP版で出力する

>$ grunt unite-js:app

リリース版でコンパイルします。  
分割された js を1つの js ファイルに結合し、読み込みタグ（&lt;script&gt;）を HTML に差し込みます。
HTML本文にはプレースホルダーとなるコメントが必要です

※ミニファイ化は grunt-contrib-uglify などを使用してください

### 準備

読み込み対象のHTMLには次の記述が必要です。

    <!-- javascript -->
    <!-- //javascript -->

### 設定

サンプルの Gruntfile.js の設定例

	//おもに分割JSのパスを記述
	var setting = grunt.file.readJSON('./import.json');

    'unite-js' : {
        options: {
            grunt: {
                taskID: 'タスクID タスク完了時に log に出力されます',
                target: 'Gruntfile.js からみたSCRIPT要素を挿入する対象ファイル',
                output: '結合JSの出力パス',
                scriptDirectory: '分割読み込み時に、options.script のパスの補完が必要な場合にディレクトリを指定'
            },
            html: {
                include: '対象HTMLからみた、結像JSのパス'
            },
            script: [
                "src/package/hello.js",  //記述順に読み込み、または結合します	
                "src/package/world.js",
                { "dev" : "src/dev.js" }, //タスクターゲットが dev の場合のみ
                { "app" : "src/app.js" }  //タスクターゲットが app の場合のみ
            ]
        },
        dev: {
            options : setting //外部化したタスクを読まることもできます。空白や未設定パラメータは、options.grunt が適用される
        },
        app: {
            options : setting
      	}
    }

tasks は複数の設定が可能です。



