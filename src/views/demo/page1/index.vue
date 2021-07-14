<template>
  <d2-container>
    <el-card style="background:#e9ebf0">
      <div
        slot="header"
        class="clearfix"
        style="text-align: center;color:white"
      >
        <dv-decoration-7>设备管理</dv-decoration-7>
      </div>
      <div :style="{height:tableHeight+'px'}">
        <el-row>
          <el-col :span="24">
            <el-card
              style="height:140px;width:140px;margin: 0 auto;background:#e9ebf0"
              shadow="hover"
            >
              <img
                @contextmenu.prevent="rightClick($event,1)"
                src="./zhongduan.png"
                class="image"
              >
            </el-card>
          </el-col>
        </el-row>
        <el-col :span="24">
          <dv-decoration-5
            :dur="5"
            style="width:300px;height:40px;margin: 0 auto"
          />
          <dv-decoration-2
            :reverse="true"
            style="width:5px;height:40px;margin: 0 auto"
          />
        </el-col>
        <el-row>
          <el-col
            :span="4"
            v-for="(item,key) in devices"
            :key="key"
          >
            <el-card
              style="height:100px;width:100px;margin: 20px auto;text-align: center;background:#e9ebf0"
              shadow="hover"
            >
              <img
                @contextmenu.prevent="rightClick($event,2,item.id)"
                src="./shebei.png"
                class="image"
              >
              <span style="color:#69a8ea">{{item.deviceName}}</span>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <e-vue-contextmenu
      ref="ctxshow"
      id="contextStyle"
      class="menu"
      @ctx-show="show"
      @ctx-hide="hide"
    >
      <ul>
        <li
          v-show="level===1"
          @click="mouseClickAdd()"
        >新增设备</li>
        <li
          v-show="level===2"
          @click="mouseClickDel()"
        >删除设备</li>
        <li
          v-show="level===2"
          @click="mouseClickEdit()"
        >查看详情</li>
         <li
          v-show="level===1"
          @click="startDevAll()"
        >全量启动</li>
        <li
          v-show="level===1"
          @click="stopDevAll()"
        >全量停止</li>
        <li
          v-show="level===2"
          @click="startDev()"
        >启动设备</li>
        <li
          v-show="level===2"
          @click="stopDev()"
        >停止设备</li>
      </ul>
    </e-vue-contextmenu>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="deviceVisible"
      width="30%"
    >
      <el-form
        :model="deviceForm"
        :label-width="formLabelWidth"
        ref="deviceForm"
        :rules="deviceRules"
      >
        <el-form-item
          label="串口号"
          style="width:320px"
          prop="com"
        >
          <el-select
            v-model="deviceForm.com"
            placeholder="请选择串口号"
            clearable
            :disabled="isDetail"
          >
            <el-option
              label="COM1"
              value="COM1"
            ></el-option>
            <el-option
              label="COM2"
              value="COM2"
            ></el-option>
            <el-option
              label="COM3"
              value="COM3"
            ></el-option>
            <el-option
              label="COM4"
              value="COM4"
            ></el-option>
            <el-option
              label="COM5"
              value="COM5"
            ></el-option>
            <el-option
              label="COM6"
              value="COM6"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="设备地址"
          style="width:320px"
          prop="device"
          clearable
        >
          <el-input
            v-model="deviceForm.device"
            autocomplete="off"
            :disabled="isDetail"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备名"
          style="width:320px"
          prop="deviceName"
          clearable
        >
          <el-input
            v-model="deviceForm.deviceName"
            autocomplete="off"
            :disabled="isDetail"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deviceVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deviceSubmit('deviceForm')"
          v-show="!isDetail"
        >确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'page1',
  data () {
    return {
      tableHeight: window.innerHeight * 2 / 3,
      isDetail: true,
      dialogTitle: '',
      deviceForm: {},
      deviceRules: {
        com: [
          { required: true, message: '请选择串口', trigger: 'change' }
        ],
        deviceName: [
          { required: true, message: '请输入设备名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        device: [
          { required: true, message: '请输入设备号', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ]
      },
      formLabelWidth: '120px',
      deviceVisible: false,
      level: 1,
      rightClickData: {},
      devices: []
    }
  },
  mounted () {
    this.deviceRefresh()
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
    deviceRefresh () {
      const that = this
      api.SYS_DEVICE_ALL().then(res => {
        if (res) {
          that.devices = res
        }
      })
    },
    deviceSubmit (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.SYS_DEVICE_ADD(that.deviceForm).then(res => {
            that.deviceRefresh()
            that.deviceVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    rightClick (e, level, id) {
      this.level = level
      this.rightClickData = { id: id, level: level }
      this.$refs.ctxshow.showMenu(e)
    },
    hideMenu () {
      this.$refs.ctxshow.hideMenu()
    },
    mouseClickDel () {
      const that = this
      api.SYS_DEVICE_DEL(that.rightClickData).then(res => {
        that.deviceRefresh()
        that.hideMenu()
      })
    },
    mouseClickEdit (data) {
      const that = this
      this.isDetail = true
      this.dialogTitle = '区域详情'
      api.SYS_DEVICE_GET(that.rightClickData).then(res => {
        that.deviceForm = res
        that.deviceVisible = true
        that.hideMenu()
      })
    },
    mouseClickAdd () {
      this.hideMenu()
      this.isDetail = false
      this.dialogTitle = '新增区域'
      this.deviceForm = {}
      this.deviceVisible = true
      console.log('打开')
    },
    show (data) {
      console.log('显示菜单')
    },
    hide (data) {
      console.log('隐藏菜单')
    }
  }

}
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
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
.el-form-item {
  margin-bottom: 20px;
}
</style>
