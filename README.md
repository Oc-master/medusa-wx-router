# medusa-wx-router
微信小程序统一路由功能函数，该封装函数将多个API进行了合并，使开发者可以通过统一的API来使用路由功能。达到统一API目的的同时，还提供了必要的参数检查和路由参数保真功能。
## API说明

### routerTo

提供跳转能力和参数保真能力
**参数**

| 属性    | 类型     | 默认值 | 必填 | 说明             |
| ------- | -------- | ------ | ---- | ---------------- |
| url     | String   |        | 是   | 目标页面路径     |
| type    | String   | push   | 否   | 跳转方式         |
| query   | Object   |        | 否   | 路由参数         |
| success | Function |        | 否   | 跳转成功回调函数 |

**示例**

```javascript
import mc from 'medusa-wx-router';

mc.routerTo({
  url: '/pages/home/index'
  type: 'push',
  query: {
    id: 0,
    bool: true,
  },
  success: () => console.log('successfully'),
});
```

**type 映射关系**

| type      | API        |
| --------- | ---------- |
| push      | navigateTo |
| replace   | redirectTo |
| reLaunch  | reLaunch   |
| switchTab | switchTab  |

### decoding

提供参数解析能力
**参数**

| 属性    | 类型   | 默认值 | 必填 | 说明                     |
| ------- | ------ | ------ | ---- | ------------------------ |
| options | Object |        | 是   | onLoad生命周期函数的参数 |

**示例**

```javascript
Page({
  onLoad(options) {
    /** query对象中的属性都是维持了跳转之前的变量类型 */
    const query = mc.decoding(options); // { id: 0, bool: true }
  }
});
```

### back

页面路由回退功能，参数为空时默认回退到上一个页面
**参数**

| 属性  | 类型   | 默认值 | 必填 | 说明     |
| ----- | ------ | ------ | ---- | -------- |
| delta | Number |    1    | 否   | 回退步值 |

**示例**

```javascript
mc.back(delta);
```

### goHome

返回首页功能
**示例**

```javascript
mc.goHome();
```
