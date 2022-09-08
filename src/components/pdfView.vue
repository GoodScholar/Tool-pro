/** http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
*/

<template>
  <div class="pdf">
    <!-- <div class="pdf_footer">
      <div class="info">
        <div>当前页数/总页数：{{ pageNum }}/{{ pageTotalNum }}</div>
      </div>
    </div> -->
    <pdf
      v-for="i in numPages"
      :key="i"
      :page="i"
      :src="pdfUrl"
      style="width: 100%; height: auto"
      @num-pages="pageCount = $event"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'vue_pdf_preview',
  props: {
    pdfUrl: {
      type: String,
      default:
        'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
    }
  },
  components: {
    pdf
  },
  data() {
    return {
      pageCount: 0,
      srcUrl: '',
      numPages: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadPdfHandler() {
      // src为你服务器上存放pdf的路径
      this.srcUrl = pdf.createLoadingTask(this.pdfUrl)
      this.srcUrl.promise
        .then((pdf) => {
          this.numPages = pdf.numPages
        })
        .catch(() => {})
    }
  },
  created() {},
  mounted() {
    this.loadPdfHandler()
  }
}
</script>

<style lang="scss" scoped></style>
