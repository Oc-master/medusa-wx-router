# medusa-wx-router

基于微信小程序路由功能 API 进行的二次封装函数，提供以同一 API 使用原生四种跳转能力的功能以及参数保真功能。

## API 说明

### routerTo

通用跳转函数，提供跳转与参数保真功能

**参数**

|  属性   |   类型   | 默认值 | 必填 |       说明       |
| :-----: | :------: | :----: | :--: | :--------------: |
|   url   |  String  |   -    |  是  |   目标页面路径   |
|  type   |  String  |  push  |  否  |     跳转方式     |
|  query  |  Object  |   -    |  否  |     跳转参数     |
| success | Function |   -    |  否  | 跳转成功回调函数 |

**示例**

```javascript
mc.routerTo({
  url: '/pages/home/index',
  type: 'push',
  query: {
    id: 0,
    bool: true
  },
  success: () => console.log('successfully')
});
/** push 方式快捷形式 */
mc.routerTo('/pages/home/index', {
  id: 0,
  bool: true
});
```

**type 映射关系**

| type      | API        |
| --------- | ---------- |
| push      | navigateTo |
| Replace   | redirectTo |
| reLaunch  | reLaunch   |
| switchTab | switchTab  |

### decoding

提供参数解析功能

**参数**

|  属性   |  类型  | 默认值 | 必填 |           说明           |
| :-----: | :----: | :----: | :--: | :----------------------: |
| options | Object |   -    |  是  | onLoad生命周期函数的参数 |

**示例**

```javascript
Page({
  onLoad(options) {
    /** query对象中的属性维持了跳转前的变量类型 */
    const query = mc.decoding(options); // { id: 0, bool: true }
  }
});
```

### back

提供回退功能

**参数**

| 属性  |  类型  | 默认值 | 必填 |   说明   |
| :---: | :----: | :----: | :--: | :------: |
| delta | Number |   1    |  否  | 回退步值 |

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

## License

[MIT](https://github.com/Oc-master/medusa-wx-router/blob/master/LICENSE)
