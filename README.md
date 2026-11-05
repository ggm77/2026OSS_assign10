## 선정 이유
영상을 스트리밍하고 조작하는 프로젝트에 관심을 가지고 있어서 기본적인 영상 스트리밍을 제공하는 이 프로젝트를 선정하게 되었습니다.

## 주요 기능
data.js에 저장된 영상 URL을 통해 받은 영상을 스트리밍합니다. 또는 사용자에게 직접 URL을 받아 영상을 재생합니다.

## 실행 방법
```bash
npm install
npm run dev
```

## Project Structure
- **VideoPlayer.jsx**: URL로 받은 비디오를 재생시키는 컴포넌트이다. 영상 재생, 볼륨 조절, 영상 재생 위치등의 정보를 조작하는 역할을 한다.
- **Context.jsx**: data.js 파일에 저장된 영상의 정보를 전역 변수로서 사용할 수 있게 컴포넌트 형태로 만들어주는 컴포넌트.
- **Popup.jsx**: 특정 영상의 URL을 사용자에게 받아서 재생할 때 영상의 URL을 검증하고 팝업을 띄워주는 컴포넌트.

## React Component
- **VideoPlayer**: Context 컴포넌트를 통해 받아온 비디오 URL을 플레이리스트로써 사용하고, video 태그를 통해 실제 영상을 재생시킨다. 

## Code Analysis
```js
 // Make a HEAD request to check Content-Type header
try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('video/')) {
            return true;
        }
    }
} catch (error) {
    // Handle fetch error
    console.error('Error checking URL:', error);
}
return false;
```
Popup.jsx 파일에서 사용자에게 입력받은 URL이 정상적인지 확인하는 코드이다. 입력 받은 URL에 HEAD 요청을 보내 응답 값이 어떤 유형인지 판단하여 올바른 URL인지 확인한다. 응답의 헤더 정보 중에 content-type을 확인하여 비디오 파일인 경우에만 올바른 URL이라고 판단한다. 단, CORS에러가 발생 할 수 있다.


## Customizing

### UI/DATA
```js
// Before
async function validateVideoUrl(url) {
        const videoExtensions = ['.mp4', '.webm', '.avi', '.mov']; // List of common video extensions

        // Check if the URL ends with a valid video extension
        const urlLower = url.toLowerCase();
        if (videoExtensions.some(ext => urlLower.endsWith(ext))) {
            return true;
        }

        // Make a HEAD request to check Content-Type header
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.startsWith('video/')) {
                    return true;
                }
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error checking URL:', error);
        }
        return false;
    }
```

```js
// After
function validateVideoUrl(url) {
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = url;
    });
}
```
기존에는 영상 URL이 정상인지 조회 할 때 영상 URL로 fetch를 날려서 검사했었습니다. 이는 CORS에 걸리기 쉽지만 영상을 재생 할 때는 CORS가 상관 없기 때문에 URL검사를 실제 비디오 태그에 넣는 방식으로 변경하였습니다.


## License

This project is licensed under the [MIT License](LICENSE), which means you are free to use, modify, and distribute the code as you see fit.

