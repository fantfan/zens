<template>
  <d2-container>
    <el-card style="background:#e9ebf0">
      <div
        slot="header"
        class="clearfix"
        style="text-align: center;color:white"
      >
        <dv-decoration-7>数据中心</dv-decoration-7>
      </div>
      <div :style="{height:tableHeight+'px'}">
      </div>
    </el-card>
  </d2-container>
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
      tableHeight: window.innerHeight * 2 / 3
    }
  }
}
</script>
