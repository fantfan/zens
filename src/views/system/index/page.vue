<template>
  <d2-container class="page">
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-card
            class="box-card"
            style="background:#e9ebf0"
          >
            <div
              slot="header"
              class="clearfix"
              style="text-align: center;color:white"
            >
              <dv-decoration-7>监控区</dv-decoration-7>
            </div>
            <div>
              <el-form
                ref="form"
                :style="{height:tableHeight+'px'}"
              >
                <el-form-item>
                  <el-col :span="3">
                    <div @contextmenu.prevent="rightClickAll($event,2)">
                      <dv-border-box-10 style="background:red;text-align: center;color: white;">区域名</dv-border-box-10>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">0.3um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">0.5um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">1.0um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">3.0um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">5.0um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">10.0um</dv-border-box-10>
                  </el-col>
                  <el-col :span="3">
                    <dv-border-box-10 style="background:#69a8ea;text-align: center;color: white;">预留</dv-border-box-10>
                  </el-col>
                </el-form-item>
                <el-form-item
                  v-for="(item,key) in showData"
                  :key="key"
                >
                  <el-col :span="3">
                    <div @contextmenu.prevent="rightClick($event,1,item.id)">
                      <dv-border-box-12
                        :color="item.status===1?['green','green']:(item.status===0?['gray','gray']:['red','red'])"
                        style="text-align: center;color: black;"
                      >{{item.deviceName}}</dv-border-box-12>
                    </div>
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um0_3" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um0_5" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um1_0" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um3_0" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um5_0" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.um10_0" />
                  </el-col>
                  <el-col
                    :span="3"
                    style="text-align: center;color: #69a8ea;"
                  >
                    <d2-count-up :end="item.extend1" />
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            class="box-card"
            style="background:#e9ebf0"
          >
            <div
              slot="header"
              class="clearfix"
              style="text-align: center;color:white"
            >
              <dv-decoration-7>预警区</dv-decoration-7>
            </div>
            <el-table
              :data="tableData"
              :height="tableHeight"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              :header-cell-style="{background:'#00baff',color:'white'}"
            >
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="区域"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="value"
                label="发生值"
                width="70"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="70"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <e-vue-contextmenu
      ref="actionshow"
      id="contextStyle"
      class="menu"
    >
      <ul>
        <li
          v-show="level===1"
          @click="startDev()"
        >启动设备</li>
        <li
          v-show="level===1"
          @click="stopDev()"
        >停止设备</li>
        <li
          v-show="level===2"
          @click="startDevAll()"
        >全量启动</li>
        <li
          v-show="level===2"
          @click="stopDevAll()"
        >全量停止</li>
      </ul>
    </e-vue-contextmenu>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      rightClickData: {},
      level: 1,
      timer: null,
      showData: [],
      tableHeight: window.innerHeight * 2 / 3,
      tableData: []
    }
  },
  components: {
  },
  methods: {
    startDev () {
      api.SYS_DEVICE_START_ONE(this.rightClickData).then(res => {
        this.$notify({
          type: 'success',
          message: '启动任务写入成功，请稍后'
        })
      })
      this.hideMenu()
    },
    stopDev () {
      api.SYS_DEVICE_STOP_ONE(this.rightClickData).then(res => {
        this.$notify({
          type: 'success',
          message: '停止任务写入成功，请稍后'
        })
      })
      this.hideMenu()
    },
    startDevAll () {
      api.SYS_DEVICE_START_ALL().then(res => {
        this.$notify({
          type: 'success',
          message: '批量任务写入成功，请稍后'
        })
      })
      this.hideMenu()
    },
    stopDevAll () {
      api.SYS_DEVICE_STOP_ALL().then(res => {
        this.$notify({
          type: 'success',
          message: '批量任务写入成功，请稍后'
        })
      })
      this.hideMenu()
    },
    rightClickAll (e, level) {
      this.level = level
      this.$refs.actionshow.showMenu(e)
    },
    rightClick (e, level, id) {
      this.level = level
      this.rightClickData = { id: id, level: level }
      this.$refs.actionshow.showMenu(e)
    },
    hideMenu () {
      this.$refs.actionshow.hideMenu()
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.value > 4000) {
        return 'warning-row'
      } else if (row.value <= 4000) {
        return 'success-row'
      }
      return ''
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    const that = this
    this.timer = setInterval(() => {
      api.SYS_DEVICE_ALL().then(res => {
        if (res) {
          that.showData = res
        }
      })
    }, 1000)
  }
}
</script>

<style>
.el-table .warning-row {
  background: #feb394;
  color: white;
}

.el-table .success-row {
  background: #fc4645;
  color: white;
}
.el-table__body tr:hover > td {
  background-color: #69a8ea !important;
}
.el-form-item {
  margin-bottom: 2px;
}
.el-card__header {
  background: #0a1b54;
  opacity: 0.6;
}
.menu ul {
  margin: 0px;
  padding: 0px;
  text-align: center;
  list-style-type: none;
}

.menu ul li {
  padding: 3px 0px;
  font-size: 12px;
}

.menu ul li:hover {
  background: #e1dddd;
}

.menu ul li a:link {
  color: #000;
  text-decoration: none;
}
</style>
