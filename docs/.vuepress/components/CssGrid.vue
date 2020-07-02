<template>
  <Row class="grid-wraper">
    <Col :xd="24" :xl="12">
      <Tabs>
        <TabPane label="Grid Container">
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">display:</span>
              <RadioGroup class="flex-1" v-model="containerStyle.display">
                <Radio :label="item" v-for="item of display" :key="item">{{
                  item
                }}</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Divider />
          <Row class="m-b-10">
            <Col :span="24" class="flex align-center">
              <span class="label">grid-template-columns:</span>
              <Select
                v-model="containerStyle.gridTemplateColumns"
                filterable
                clearable
                allow-create
                @on-create="
                  handdleCreateTemplate('templateColumnsSelects', $event)
                "
              >
                <Option
                  v-for="item of templateColumnsSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">grid-template-rows:</span>
              <Select
                v-model="containerStyle.gridTemplateRows"
                filterable
                clearable
                allow-create
                @on-create="
                  handdleCreateTemplate('templateRowsSelects', $event)
                "
              >
                <Option
                  v-for="item of templateRowsSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">grid-template-areas:</span>
              <Input
                clearable
                v-model="containerStyle.gridTemplateAreas"
                type="textarea"
                :autosize="true"
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">grid-column-gap:</span>
              <Input clearable v-model="containerStyle.gridColumnGap" />
            </Col>
          </Row>
          <Row class="m-t-10">
            <Col :span="24" class="flex align-center">
              <span class="label">grid-row-gap:</span>
              <Input clearable v-model="containerStyle.gridRowGap" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">justify-items:</span>
              <Select
                v-model="containerStyle.justifyItems"
                filterable
                clearable
              >
                <Option
                  v-for="item of justifyItemsSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Row class="m-t-10">
            <Col :span="24" class="flex align-center">
              <span class="label">align-items:</span>
              <Select v-model="containerStyle.alignItems" filterable clearable>
                <Option
                  v-for="item of alignItemsSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">justify-content:</span>
              <Select
                v-model="containerStyle.justifyContent"
                filterable
                clearable
              >
                <Option
                  v-for="item of justifyContentSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Row class="m-t-10">
            <Col :span="24" class="flex align-center">
              <span class="label">align-content:</span>
              <Select
                v-model="containerStyle.alignContent"
                filterable
                clearable
              >
                <Option
                  v-for="item of alignContentSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">grid-auto-flow:</span>
              <Select
                v-model="containerStyle.gridAutoFlow"
                filterable
                clearable
              >
                <Option
                  v-for="item of gridAutoFlowSelects"
                  :value="item"
                  :key="item"
                  >{{ item }}</Option
                >
              </Select>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col :span="24" class="flex align-center">
              <span class="label">grid-auto-columns:</span>
              <Input clearable v-model="containerStyle.gridAutoColumns" />
            </Col>
          </Row>
          <Row class="m-t-10">
            <Col :span="24" class="flex align-center">
              <span class="label">grid-auto-rows:</span>
              <Input clearable v-model="containerStyle.gridAutoRows" />
            </Col>
          </Row>
        </TabPane>
        <TabPane label="Grid Items">
          <Row class="m-b-10">
            <Col :span="24">
              <Button type="primary" icon="ios-add" long @click="handdleAddItem"
                >ADD Item</Button
              >
            </Col>
          </Row>
          <Collapse accordion>
            <Panel v-for="(gridItem, index) of gridItems" :key="index">
              {{ `Item-${index}` }}
              <div slot="content">
                <Row>
                  <Col :span="24" class="flex align-center">
                    <span class="label">模式:</span>
                    <RadioGroup v-model="gridItem.mode" class="flex-1">
                      <Radio
                        :label="item"
                        :key="item"
                        v-for="item of gridItemModeSelects"
                        >{{ item }}
                      </Radio>
                    </RadioGroup>
                  </Col>
                </Row>
                <Divider />
                <div v-show="gridItem.mode === 'Full'">
                  <Row>
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-column-start:</span>
                      <Input
                        clearable
                        v-model="gridItem.style.gridColumnStart"
                      />
                    </Col>
                  </Row>
                  <Row class="m-t-10">
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-column-end:</span>
                      <Input clearable v-model="gridItem.style.gridColumnEnd" />
                    </Col>
                  </Row>
                  <Row class="m-t-10">
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-row-start:</span>
                      <Input clearable v-model="gridItem.style.gridRowStart" />
                    </Col>
                  </Row>
                  <Row class="m-t-10">
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-row-end:</span>
                      <Input clearable v-model="gridItem.style.gridRowEnd" />
                    </Col>
                  </Row>
                </div>
                <div v-show="gridItem.mode === 'Merge'">
                  <Row>
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-column:</span>
                      <Input clearable v-model="gridItem.style.gridColumn" />
                    </Col>
                  </Row>
                  <Row class="m-t-10">
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-row:</span>
                      <Input clearable v-model="gridItem.style.gridRow" />
                    </Col>
                  </Row>
                </div>
                <div v-show="gridItem.mode === 'Area'">
                  <Row>
                    <Col :span="24" class="flex align-center">
                      <span class="label">grid-area:</span>
                      <Input clearable v-model="gridItem.style.gridArea" />
                    </Col>
                  </Row>
                </div>
              </div>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Col>
    <Col :xd="24" :xl="12" class="grid-container m-t-10" :style="computeContainerStyle">
      <div
        v-for="(item, index) of gridItems"
        :key="index"
        class="item"
        :style="[{ background: radomColor() }, getComputedStyle(item.style)]"
      >
        {{ `Item-${index}` }}
      </div>
    </Col>
  </Row>
</template>
<script>
import "./styles/grid-iview-normanize.scss"
import util from "../util/util"
import {
  Row,
  Col,
  RadioGroup,
  Radio,
  Divider,
  Select,
  Option,
  Input,
  Tabs,
  TabPane,
  Collapse,
  Panel,
  Button
} from "view-design"
export default {
  components: {
    Row,
    Col,
    RadioGroup,
    Radio,
    Divider,
    Select,
    Option,
    Input,
    Tabs,
    TabPane,
    Collapse,
    Panel,
    Button
  },
  data() {
    return {
      display: ["grid", "inline-grid"],
      containerStyle: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateAreas: `"header header header header"
"main main . sidebar"
"footer footer footer footer"`,
        gridColumnGap: "0px",
        gridRowGap: "0px",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
        gridAutoColumns: "0px",
        gridAutoRows: "0px",
        gridAutoFlow: "row"
      },
      templateColumnsSelects: [
        "repeat(auto-fill, minmax(100px, 1fr))",
        "40px 50px auto 50px 40px",
        "1fr 1fr 1fr 1fr",
        "repeat(4, 1fr)"
      ],
      templateRowsSelects: ["25% 100px auto", "1fr 1fr 1fr", "repeat(3, 1fr)"],
      justifyItemsSelects: ["start", "end", "center", "stretch"],
      alignItemsSelects: ["start", "end", "center", "stretch"],
      justifyContentSelects: [
        "start",
        "end",
        "center",
        "stretch",
        "space-around",
        "space-between",
        "space-evenly"
      ],
      alignContentSelects: [
        "start",
        "end",
        "center",
        "stretch",
        "space-around",
        "space-between",
        "space-evenly"
      ],
      gridAutoFlowSelects: ["row", "column ", "row dense", "column dense"],
      gridItemModeSelects: ["Full", "Merge", "Area"],
      gridItems: [
        {
          mode: "Area",
          style: {
            gridColumnStart: "1",
            gridColumnEnd: "5",
            gridRowStart: "1",
            gridRowEnd: "2",
            gridColumn: "1 / 5",
            gridRow: "1 / 2",
            gridArea: "header"
          },
          computedStyle: {}
        },
        {
          mode: "Area",
          style: {
            gridColumnStart: "1",
            gridColumnEnd: "3",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumn: "1 / 3",
            gridRow: "2 / 3",
            gridArea: "main"
          }
        },
        {
          mode: "Area",
          style: {
            gridColumnStart: "4",
            gridColumnEnd: "5",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumn: "4 / 5",
            gridRow: "2/ 3",
            gridArea: "sidebar"
          }
        },
        {
          mode: "Area",
          style: {
            gridColumnStart: "1",
            gridColumnEnd: "5",
            gridRowStart: "3",
            gridRowEnd: "4",
            gridColumn: "1 / 5",
            gridRow: "3",
            gridArea: "footer"
          }
        }
      ]
    }
  },
  computed: {
    computeContainerStyle() {
      return this.getComputedStyle(this.containerStyle)
    }
  },
  methods: {
    getComputedStyle(styles) {
      return Object.entries(styles).reduce((result, item) => {
        const [key, v] = item
        const convertKey = key.replace(/[A-Z]/g, input => {
          return `-${input.toLowerCase()}`
        })
        return {
          ...result,
          [convertKey]: v
        }
      }, {})
    },
    handdleCreateTemplate(prop, msg) {
      this[prop].push(msg)
    },
    radomColor() {
      return util.randomColor()
    },
    handdleAddItem() {
      this.gridItems.push({
        mode: "Merge",
        style: {
          gridColumnStart: "",
          gridColumnEnd: "",
          gridRowStart: "",
          gridRowEnd: "",
          gridColumn: "",
          gridRow: "",
          gridArea: ""
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.align-center {
  align-items: center;
}
.m-t-10 {
  margin-top: 10px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.grid-wraper {
  font-size: 1em;
  padding: 0.8em;
  border-radius: 4px;
  border: 1px solid #ccc;
  .label {
    font-size: 1.2em;
    display: inline-block;
    margin-right: 6px;
    flex: 0.6;
  }
  .grid-container {
    min-height: 400px;
    padding: 0 0.8em;
    transition: all 0.2s linear;
    .item {
      color: #fff;
    }
  }
}
</style>
