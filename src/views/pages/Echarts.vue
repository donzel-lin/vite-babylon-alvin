<template>
  <div>
    <div
      class="chart"
      id="chart"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import echarts from '../../useFns/useCharts'
let myChart: echarts.ECharts | null
onMounted(() => {
  initChart()
})

const initChart = () => {
  const chartDom = document.getElementById('chart')
  myChart = chartDom && echarts.init(chartDom)
  const data1 = []
  const data2 = []
  for (let i = 0; i < 100; i++) {
    let k = i < 50 ? 50 : i
    const arr = [
      [15, 20],
      [45, 61],
      [71, 88]
    ]
    arr.forEach(item => {
      const min = item[0]
      const max = item[1]
      k = i > min && i < max ? 0 : k
    })
    const num = Math.random() * 10 * k
    data1.push(num)
    data2.push(-Math.abs(num))
  }
  const option = {
    grid: {
      left: 10,
      right: 10,
      top: 5,
      bottom: 5,
      containLabel: false
    },
    title: {
      show: false,
      text: 'bar  '
    },
    xAxis: {
      data: [],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      show: false
    },
    series: [
      {
        name: 'bar',
        type: 'line',
        data: data1,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'bar2',
        type: 'line',
        data: data2.reverse(),
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 1
        }
      }
    ]
  }
  option && myChart?.setOption(option)
}

</script>

<style lang="scss" scoped>
.chart{
  width: 500px;
  height: 60px;
}
</style>
