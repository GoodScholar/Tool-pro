<!--
  功能：留档查验
  时间：2022年10月21日 09:34:19
  版本：v1.0
-->

<template>
    <div>
        <div class="video-check">
            <div class="video-check__cover" v-if="showDefault">
                <span class="video-check__cover-msg">摄像头开启录像</span>
            </div>

            <img
                ref="imgPreview"
                :src="currentVideoStream"
                alt=""
                class="video-check__cover"
            />

            <video
                control
                class="video-container"
                ref="video"
                @click="showVideo(false)"
                @touchend.prevent="showVideo(false)"
            >
                <source :src="currentVideoStream" type="video/webm" />
                <source :src="currentVideoStream" type="video/mp4" />
                <source :src="currentVideoStream" type="video/webm" />
            </video>

            <canvas
                class="video-check__cover"
                ref="canvas"
                @click="onPlay"
            ></canvas>
        </div>

        <!-- 注 -->
        <div class="notice_box">
            注: 本人对办理该事项所提交的申报材料实质内容的真实性负责
        </div>

        <!-- 同意 -->
        <div class="agree_box">
            <van-checkbox
                v-model="agree"
                shape="square"
                class="checkbox"
            ></van-checkbox>
            <sup style="color: #999999">
                我已确认所有选办理地点，并确认符合审批条件已获 取收取材料
            </sup>
        </div>

        <div class="btn__cell">
            <van-button
                type="default"
                round
                class="video-check__confirm"
                @click="handleRecordVideo"
            >
                {{ btnText }}
            </van-button>

            <!-- :disabled="!agree" -->
            <van-button type="info" round>确认</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KeepCheck',
    data() {
        return {
            showDefault: true,
            agree: false,
            chunks: [],
            currentVideoStream: null,
            btnText: '开始录制'
        }
    },

    methods: {
        // 打开摄像
        requestAudioAccess() {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then(
                    (stream) => {
                        this.recorder = new window.MediaRecorder(stream)
                        this.stream = stream
                        this.bindEvents()
                    },
                    () => {
                        alert('出错，请确保已允许浏览器获取音视频权限')
                    }
                )
        },

        // 开启和关闭录制
        handleRecordVideo() {
            if (this.btnText === '开始录制') {
                this.showDefault = false
                this.onRecordStart()
            } else {
                // this.showVideo(false)
                this.onRecordEnd()
            }
        },

        // 开始录制
        onRecordStart() {
            this.showVideo(true)
            this.onPreview()
            this.btnText = '结束录制'
            this.onStart()
        },

        // 结束录制
        onRecordEnd() {
            this.onStop()
            this.btnText = '开始录制'
        },

        onPreview() {
            this.video.srcObject = this.stream
            this.video.muted = true
            this.video.play()
        },

        showVideo(bShow) {
            if (bShow) {
                this.video.style.display = 'block'
            } else {
                this.video.style.display = 'none'
                this.video.pause()
            }
        },

        onStart() {
            this.recorder.start()
        },

        onStop() {
            this.recorder.stop()
        },

        onPlay() {
            this.showVideo(true)

            this.canvas.style.display = 'none'

            // this.video.src = this.currentVideoStream
            this.video.muted = false
            this.video.play()

            this.bindAudioEvent()
        },

        bindAudioEvent() {
            this.video.onended = () => {
                this.showVideo(false)

                this.canvas.style.display = 'block'
            }
        },

        bindEvents() {
            this.recorder.ondataavailable = this.getRecordingData
            this.recorder.onstop = this.saveRecordingData
        },

        getRecordingData(e) {
            console.info(
                '🚀 ~ file:index method:getRecordingData line:105 -----',
                e.data
            )
            this.chunks.push(e.data)
        },

        getBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()

                reader.readAsDataURL(blob)

                reader.onload = () => resolve(reader.result)

                reader.onerror = (error) => reject(error)
            })
        },
        async saveRecordingData() {
            const blob = new Blob(this.chunks, { type: 'video/webm' })
            this.currentVideoStream = await this.getBase64(blob)

            this.onCapture()

            this.chunks = []
        },

        // 获取视频截图
        onCapture() {
            this.ctx.drawImage(
                this.video,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            )
            this.canvas.toBlob((blob) => {
                const src = URL.createObjectURL(blob)
                console.info('🚀 ~ file:index method: line:121 -----', src)
                // this.$set(this.currentVideoStream, 'poster', src)
            })
            // 隐藏video
            this.showVideo(false)
            this.video.srcObject = null
        }
    },

    mounted() {
        if (!navigator.mediaDevices) {
            alert('您的浏览器不支持获取用户设备')
            return
        }
        if (!window.MediaRecorder) {
            alert('您的浏览器不支持录音')
            return
        }
        this.video = this.$refs.video
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')

        this.imgPreview = this.$refs.imgPreview
        this.imgPreview.style.display = 'none'

        this.requestAudioAccess()
    }
}
</script>

<style lang="scss" scoped>
// .video-container {
//     height: 100%;
// }
.video-check {
    width: 690px;
    height: 808px;
    margin: 30px auto;
    background-color: #f4f8fb;

    .video-container {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .video-check__cover {
        width: 100%;
        height: 100%;
        @extend %flex-center-center;
        .video-check__cover-msg {
            font-size: 70px;
            font-weight: 500;
            color: #c2d5ed;
        }
    }
}

.notice_box {
    width: 100%;
    padding: 44px 4vw;
    color: #f2a137;
    background: rgba(242, 161, 55, 0.06);
    font-size: 25px;
    margin-top: 22px;
}
.agree_box {
    width: 100%;
    margin: 0 auto;
    padding: 44px 4vw;
    font-size: 28px;
    display: flex;
    .checkbox {
        flex-shrink: 0;
    }
    sup {
        margin-left: 16px;
        padding-top: 20px;
    }
}

.agree_box /deep/ .van-checkbox__icon .van-icon {
    width: 30px;
    height: 30px;
    border-radius: 3px !important;
    line-height: 30px;
}

.btn__cell {
    padding: 0 30px;

    .van-button {
        width: 100%;
        margin-top: 40px;
    }
}
</style>
