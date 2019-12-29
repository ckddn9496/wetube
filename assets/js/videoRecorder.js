const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject; // 모든 함수에서 streamObject에 접근할 수 있게 하기 위해 바깥에 let으로 선언
let videoRecorder;

const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); // facking click
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Cant Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
  //   recordBtn.onclick = getVideo // 하나의 onclick event를 가지게 한다, 여러개의 event를 갖고 싶으면 addEventListener수행
}

if (recorderContainer) {
  init();
}
