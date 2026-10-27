# 개인 프로필 웹사이트

HTML, CSS, JavaScript로 만든 정적 사이트입니다. 로컬 서버는 Node.js 기본 모듈만 사용하므로 외부 패키지나 `npm install`이 필요하지 않습니다.

## 로컬 실행

이 폴더에서 다음 명령을 실행합니다.

```sh
npm start
```

브라우저에서 http://localhost:3000 을 엽니다. `npm run dev`로도 동일하게 실행할 수 있습니다. 파일을 수정한 뒤 브라우저를 새로고침하면 반영됩니다. 종료하려면 `Ctrl+C`를 누르세요.

3000 포트를 사용 중이라면 PowerShell에서 다른 포트를 지정할 수 있습니다.

```powershell
$env:PORT = '3001'
npm start
```

## 폴더 구조

```text
stitch-export/
├── public/             # 브라우저에 제공하고 배포할 정적 파일
│   ├── index.html      # 시작 페이지
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       └── profile.jpg
├── server.js           # 로컬 개발용 서버
├── package.json        # 실행 명령 (의존성 없음)
├── vercel.json         # public 폴더 정적 배포 설정
├── code.html           # Stitch 원본 (보존)
├── DESIGN.md           # Stitch 디자인 명세 (보존)
└── screen.png          # Stitch 스크린샷 (보존)
```

기존 사이트 파일은 내용 변경 없이 `public/`로 이동했습니다. 서버는 `public/` 안의 파일만 제공합니다. 별도 빌드 과정은 없습니다.

## 나중에 Vercel에 배포하기

1. 이 폴더를 Git 저장소에 올리고 Vercel에서 해당 저장소를 가져옵니다.
2. Root Directory를 이 `package.json`과 `vercel.json`이 있는 폴더로 설정합니다.
3. Framework Preset은 **Other**, Output Directory는 **public**을 사용합니다. 빌드 명령은 비워둡니다. 저장된 `vercel.json`에 이 설정이 포함되어 있습니다.
4. Deploy를 누릅니다. Vercel은 `public/`의 파일을 정적으로 제공하며 `server.js`는 실행하지 않습니다.

참고: [Vercel 정적 배포 설정](https://vercel.com/docs/project-configuration/vercel-json).

실제 공개 전에 `public/index.html`의 예시 개인정보, 이메일 및 프로젝트 링크를 본인 정보로 교체하세요. 현재 사이트의 Google Fonts는 인터넷 연결이 필요합니다.
