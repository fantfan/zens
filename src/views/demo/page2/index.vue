<template>
  <d2-container>
    <el-card style="background:#e9ebf0">
      <div :style="{height:tableHeight+'px'}">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item,key) in showData"
            :key="key"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
                style="text-align: center;color:white"
              >
                <dv-decoration-7>{{item.deviceName}}</dv-decoration-7>
              </div>
              <div>
                <el-row>
                  <el-col :span="7">
                    <div style="line-height: 150px;">
                      <img
                        style="height:100%;width:100%"
                        src="./lizi.png"
                        class="image"
                      >
                    </div>
                  </el-col>
                  <el-col :span="1">
                    <dv-decoration-4
                      :color="item.status===1?['green','green']:(item.status===0?['gray','gray']:['red','red'])"
                      style="width:30px;height:120px;"
                    />
                  </el-col>
                  <el-col
                    :span="16"
                    style="text-align: center;"
                  >
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">0.3um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um0_3" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">0.5um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um0_5" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">1.0um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um1_0" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">3.0um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um3_0" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">5.0um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um5_0" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                    <el-row style="line-height: 20px;padding: 1px;">
                      <span style="color:#5892d1;padding-right: 10px;display: inline-block;text-align: right;width:60px">10.0um</span>
                      <span style="background:#b3ffe0;display: inline-block;width:60px">
                        <d2-count-up :end="item.um10_0" />
                      </span>
                      <span style="color:#5892d1;padding-left: 10px;">颗</span>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'page2',
  data () {
    return {
      timer1: null,
      tableHeight: window.innerHeight * 2 / 3,
      showData: []
    }
  },
  mounted () {
    const that = this
    this.timer1 = setInterval(() => {
      api.SYS_DEVICE_ALL().then(res => {
        if (res) {
          that.showData = res
        }
      })
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer1)
  }
}
</script>
