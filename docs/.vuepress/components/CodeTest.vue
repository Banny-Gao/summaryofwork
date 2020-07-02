<template>
  <div>
    <!-- codemirror -->
    <div class="select_wraper m-t-10">
      <a-select
        labelInValue
        :defaultValue="{ key: 'reduce' }"
        style="width: 120px;margin-right: 14px;"
        @change="reduceSelect"
        v-if="mode === 'reduce'"
      >
        <a-select-option value="fakeReduce">fakeReduce</a-select-option>
        <a-select-option value="reduce">reduce</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'FakePromise' }"
        style="width: 140px;margin-right: 14px;"
        @change="promiseSelect"
        v-if="mode === 'Promise'"
      >
        <a-select-option value="FakePromise">FakePromise</a-select-option>
        <a-select-option value="Promise">Promise</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'quickSort1' }"
        style="width: 120px;margin-right: 14px;"
        @change="quickSortSelect"
        v-if="mode === 'testQuickSort'"
      >
        <a-select-option value="quickSort1">quickSort1</a-select-option>
        <a-select-option value="quickSort2">quickSort2</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'reverse' }"
        style="width: 140px;margin-right: 14px;"
        @change="reverseSelect"
        v-if="mode === 'reverseString'"
      >
        <a-select-option value="reverse">reverse</a-select-option>
        <a-select-option value="reverseString">reverseString</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'cloneDeep' }"
        style="width: 240px;margin-right: 14px;"
        @change="cloneDeepSelect"
        v-if="mode === 'cloneDeep'"
      >
        <a-select-option value="cloneDeep">cloneDeep</a-select-option>
        <a-select-option value="cloneDeep_JSON">cloneDeep_JSON</a-select-option>
        <a-select-option value="cloneDeep_Assign"
          >cloneDeep_Assign</a-select-option
        >
        <a-select-option value="cloneDeep_MessageChannel"
          >cloneDeep_MessageChannel</a-select-option
        >
        <a-select-option value="cloneDeep_DFS">cloneDeep_DFS</a-select-option>
        <a-select-option value="cloneDeep_BFS">cloneDeep_BFS</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'debounce' }"
        style="width: 140px;margin-right: 14px;"
        @change="debounceSelect"
        v-if="mode === 'debounce'"
      >
        <a-select-option value="debounce">debounce</a-select-option>
        <a-select-option value="throttle">throttle</a-select-option>
        <a-select-option value="_debounce">_.debounce</a-select-option>
        <a-select-option value="_throttle">_.throttle</a-select-option>
      </a-select>
      <a-select
        labelInValue
        :defaultValue="{ key: 'mergeKLists' }"
        style="width: 140px;margin-right: 14px;"
        @change="mergeKListsSelect"
        v-if="mode === 'mergeKLists'"
      >
        <a-select-option value="mergeKLists">mergeKLists</a-select-option>
        <a-select-option value="mergeKLists_sort"
          >mergeKLists_sort</a-select-option
        >
        <a-select-option value="mergeKLists_merge"
          >mergeKLists_merge</a-select-option
        >
      </a-select>
      <a-button type="primary" size="small" @click="run">运行</a-button>
    </div>
    <a-row class="codemirror_con" :gutter="14">
      <a-col class="m-t-10" :xs="24" :sm="24" :xl="12">
        <codemirror v-model="code" :options="cmOptions"></codemirror>
      </a-col>
      <a-col class="m-t-10" :xs="24" :sm="24" :xl="12">
        <div class="result_con">
          <Spin fix size="large" v-if="isCompute"></Spin>
          <template v-for="(item, i) of resultText">
            <p v-if="item && item.type === 'time'" :key="i">
              {{ item.name }}：{{ item.value }}ms
            </p>
            <a-table
              :columns="consoleColumns"
              :dataSource="traverseData(item.value)"
              v-else-if="item && item.type === 'table'"
              :pagination="false"
            ></a-table>
            <a-alert
              class="m-t-10"
              type="warning"
              v-else-if="item && item.type === 'warn'"
              :message="item.value"
              showIcon
            ></a-alert>
            <a-alert
              class="m-t-10"
              type="error"
              v-else-if="item && item.type === 'error'"
              :message="item.value"
              showIcon
            ></a-alert>
            <p v-else>{{ item }}</p>
          </template>
        </div>
      </a-col>
    </a-row>
    <p class="tip">console结果可能不准确，按F12打开控制台查看</p>
  </div>
</template>

<script>
import _ from "lodash"
import Button from "ant-design-vue/lib/button"
import Form from "ant-design-vue/lib/form/Form"
import FormItem from "ant-design-vue/lib/form/FormItem"
import Input from "ant-design-vue/lib/input"
import Select from "ant-design-vue/lib/select"
import Table from "ant-design-vue/lib/table"
import Alert from "ant-design-vue/lib/alert"
import { Spin } from "view-design"

import CodeMap from "../constants/codemap"

import "../js/reduce"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "./styles/overcodeMirror.css"
import "codemirror/addon/hint/show-hint.css"

try {
  var SWorker = require("simple-web-worker")
  var { codemirror } = require("vue-codemirror")

  require("codemirror/mode/javascript/javascript.js")

  require("codemirror/addon/selection/active-line.js")
  // styleSelectedText
  require("codemirror/addon/selection/mark-selection.js")
  require("codemirror/addon/search/searchcursor.js")
  // hint
  require("codemirror/addon/hint/show-hint.js")
  require("codemirror/addon/hint/javascript-hint.js")
  require("codemirror/addon/selection/active-line.js")
  // highlightSelectionMatches
  require("codemirror/addon/scroll/annotatescrollbar.js")
  require("codemirror/addon/search/matchesonscrollbar.js")
  require("codemirror/addon/search/searchcursor.js")
  require("codemirror/addon/search/match-highlighter.js")
  // keyMap
  require("codemirror/mode/clike/clike.js")
  require("codemirror/addon/edit/matchbrackets.js")
  require("codemirror/addon/comment/comment.js")
  require("codemirror/addon/dialog/dialog.js")
  require("codemirror/addon/dialog/dialog.css")
  require("codemirror/addon/search/searchcursor.js")
  require("codemirror/addon/search/search.js")
  require("codemirror/keymap/sublime.js")
  // foldGutter
  require("codemirror/addon/fold/foldgutter.css")
  require("codemirror/addon/fold/brace-fold.js")
  require("codemirror/addon/fold/comment-fold.js")
  require("codemirror/addon/fold/foldcode.js")
  require("codemirror/addon/fold/foldgutter.js")
  require("codemirror/addon/fold/indent-fold.js")
  require("codemirror/addon/fold/markdown-fold.js")
  require("codemirror/addon/fold/xml-fold.js")
} catch (error) {}

let cloneDeepSelectMemroy = "cloneDeep"
let debounceSelectMemroy = "debounce"
let mergeKListsSelectMemroy = "mergeKLists"

export default {
  components: {
    codemirror,
    aAlert: Alert,
    aButton: Button,
    aInput: Input,
    aTable: Table,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Select.OptGroup.name]: Select.OptGroup,
    Spin,
  },
  props: {
    mode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: "text/javascript",
        // hint.js options
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false,
        },
        //快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "material",
        extraKeys: { Ctrl: "autocomplete" },
      },
      resultText: [],
      isCompute: false,
      computTimer: null,
      consoleColumns: [
        { title: "Index", align: "center", dataIndex: "key", key: "key" },
        { title: "Value", align: "center", dataIndex: "value", key: "value" },
      ],
    }
  },
  mounted() {
    this.code = CodeMap[this.mode] || ""
  },
  methods: {
    codeToggle(key, W, M) {
      const expW = new RegExp(`${W}`, "g")
      const expM = new RegExp(`${M}`, "g")
      if (key === W) this.code = this.code.replace(expM, `${W}`)
      else this.code = this.code.replace(expW, `${M}`)
    },
    reduceSelect(e) {
      const { key } = e
      this.codeToggle(key, "reduce", "fakeReduce")
    },
    promiseSelect(e) {
      const { key } = e
      this.codeToggle(key, "Promise", "FakePromise")
    },
    quickSortSelect(e) {
      const { key } = e
      this.codeToggle(key, "quickSort1", "quickSort2")
    },
    reverseSelect(e) {
      const { key } = e
      this.codeToggle(key, "reverse", "reverseString")
    },
    cloneDeepSelect(e) {
      const { key } = e
      this.codeToggle(key, cloneDeepSelectMemroy, key)
      cloneDeepSelectMemroy = key
    },
    debounceSelect(e) {
      const { key } = e
      this.codeToggle(key, debounceSelectMemroy, key)
      debounceSelectMemroy = key
    },
    mergeKListsSelect(e) {
      const { key } = e
      this.codeToggle(key, mergeKListsSelectMemroy, key)
      mergeKListsSelectMemroy = key
    },
    run() {
      clearTimeout(this.computTimer)
      const that = this
      this.isCompute = true
      this.$nextTick().then(() => {
        SWorker.run(() => "").then(async () => {
          const FUN = await import("../js")
          Object.keys(FUN).forEach((key) => {
            window[key] = FUN[key]
          })
          console.clearLog()
          console.watch((val) => {
            this.isCompute = false
            try {
              JSON.stringify(val)
              this.resultText = val
            } catch (error) {
              this.resultText = val.map((item) => {
                try {
                  JSON.stringify(item)
                } catch (error) {
                  item = String(item)
                }
                return item
              })
            }
          })
          eval(this.code)
        })
      })
    },
    traverseData(data) {
      return Object.keys(data).reduce((arr, key) => {
        arr.push({
          key,
          value: JSON.stringify(data[key]),
        })
        return arr
      }, [])
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
body {
  font-size: 14px !important;
}
.m-t-10 {
  margin-top: 10px;
}
.codemirror_con {
  margin-top: 15px;
  .result_con {
    height: 300px;
    overflow-y: auto;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    padding: 14px;
    position: relative;
    box-shadow: 0 0 2px 2px #e0e0e0;
  }
}
.select_wraper {
  display: flex;
  align-items: center;
}
.tip {
  margin-top: 10px;
  display: flex;
  font-size: 14px;
  color: #999;
  align-items: center;
}
</style>
