## listview

### QA

1. 不满一屏幕的时候只能点击，不能拖动？
    - 新增方法`updateCanScroll`，当`dListData`变更的时候出发计算，如果`dCanSroll`为`false`，会导致`loadmore`传入`:top-method="dCanScroll && enableRefresh && _loadTop"`为`false`导致从上往下拉被禁用
2. 没有数据时不显示暂无数据
    - 本来就不显示
3. `paramTemplate`做什么的？
    - 这是给用户简化请求参数构造用的模板
4. 在做分页的时候，这边是控制总页数就可以完成分页吗？
    - 请看文档`pageSize`和`maxPageNum`，分别代表一页多少条和一共多少页。

### 组件执行逻辑

#### `listview`

> 其中`L数字:`表示在源代码的第`数字`行

- L227: 当组件被初始化时，在`mounted`声明周期中，调用`loadmore`组件实例的`triggerBottomLoad`方法。
    - 用来触发首次数据加载
- L184: 当用户手指从上往下拉，希望刷新所有数据时，会触发`_loadTop`方法。
    - L186: 重置当前页面页码为`1`
    - L188: 调用`cBeforeLoadData`这个函数
        - L113: 该函数是一个`computed`值，如果用户定义了`beforeLoadData`属性，则会执行用户定义的`beforeLoadData`方法，否则，执行默认的`internalBeforeLoadData`方法
        - 传入参数为(params, callback)
            - params: 发起请求时的需要的信息
            - callback: 当请求发送拿到结果后的回调
    - L169: 如果用户没有定义`beforeLoadData`属性，会进入`internalBeforeLoadData`逻辑
        - L177: 该方法中，根据`this.params`即用户传入的参数模板，把参数中需要的`dPageNum`(页码), `pageSize`(每页几条), `dListData.length`(当前总共几条)，构造成需要请求的`params`
        - L181: 然后调用`onRequestData`方法，让用户去请求数据，并传给`callback`
    - L181: 进入`onRequestData`方法
        - 用户发送请求(比如`ajax`，比如`rpc`)
        - 拿到返回结果后调用`callback`
    - L193: 执行了`_afterLoadDataTop`回调函数    
        - L136: 首页数据请求成功，将页码标记为2
        - L141: 调用`cAfterLoadData`获取返回数据
            - 执行了`cAfterLoadData`回调函数
                - L117: 该函数是一个`computed`值，如果用户定义了`afterLoadData`属性，则会执行用户定义的`afterLoadData`方法，否则，执行默认的`internalAfterLoadData`方法
            - L127: 如果用户没有定义`afterLoadData`属性，会进入`internalAfterLoadData`逻辑   
                - L128: 该方法中，根据传入`data`，提取其中的`hasMore`(是否还有更多页)和`list`(本页列表)
        - L143: 赋值`this.dListData = list;`和`this.dHasMore = dHasMore;`
             - 此时，`vue`的响应式系统接收到`dListData`数据变更，触发`v-for`循环的重新渲染
             - L121:此时，`vue`的响应式系统接收到`dHasMore`数据变更，触发`cShouldLoadMore`计算属性的重新计算
        - L146: 执行`loadmore`实例`onTopLoaded`方法，告知下拉加载完成，可以把`加载中`收回去了
- L196: 当页面滚动到底部，希望加载下一页时，会触发`_loadBottom`方法。
    - L199: 如果`cShouldLoadMore`为`false`则表示不需要加载更多页面，直接返回
    - L203: 计算下一页页码`nextPageNum`
    - L206: 调用`cBeforeLoadData`这个函数
        - L113: 该函数是一个`computed`值，如果用户定义了`beforeLoadData`属性，则会执行用户定义的`beforeLoadData`方法，否则，执行默认的`internalBeforeLoadData`方法
        - 传入参数为(params, callback)
            - params: 发起请求时的需要的信息
            - callback: 当请求发送拿到结果后的回调
    - L169: (同上)如果用户没有定义`beforeLoadData`属性，会进入`internalBeforeLoadData`逻辑   
    - L181: (同上)进入`onRequestData`方法
    - L213: 执行了`_afterLoadDataBottom`回调函数    
        - L148: 更新当前新页码
        - L154: 调用`cAfterLoadData`获取返回数据
        - L156: 将获取到的`list`拼接在数组`this.dListData`后面，更新`dHasMore`
            - 此时，`vue`的响应式系统接收到`dListData`数据变更，触发`v-for`循环的重新渲染
            - L121:此时，`vue`的响应式系统接收到`dHasMore`数据变更，触发`cShouldLoadMore`计算属性的重新计算
        - L159: 执行`loadmore`实例`onBottomLoaded`方法，告知分页加载完成，可以修改状态

#### `loadmore`

- L322: 当组件被初始化时，在`mounted`声明周期中，调用`init`方法。

### API

#### `loadmore`的API

|参数|说明|类型|默认值|可选值|
| ----- | ----- | ----- | ----- | ----- |
|maxDistance|若为真，loadmore 会自动检测并撑满其容器|number|0|-|
|autoFill|手指从上往下拉，从"下拉刷新"变成"释放更新"的距离|boolean|true|-|
|distanceIndex|手指移动与组件移动距离的比值|number|2|-|
|topPullText|手指从上往下拉，处于"下拉刷新"(pull)状态时加载提示区域的文字|string|"下拉刷新"|-|
|topDropText|手指从上往下拉，处于"释放更新"(drop)状态时加载提示区域的文字|string|"释放更新"|-|
|topLoadingText|手指从上往下拉，处于"加载中..."(loading)状态时加载提示区域的文字|string|"加载中..."|-|
|topDistance|手指从上往下拉，从"下拉刷新"切换到"释放更新"的下拉距离阈值（像素）|number|70|-|
|topMethod|手指从上往下拉，从"下拉刷新"切换到"释放更新"后，手指放开，触发的执行方法|function|-|-|
|bottomPullText|列表滚动到底部前，如果还能够加载更多数据，底部填充为显示"加载更多数据"|string|"加载更多数据"|-|
|bottomLoadingText|列表滚动到底部时，如果还能够加载更多数据，底部填充为显示"加载中..."，并触发bottomMethod回调|string|"加载中..."|-|
|bottomMethod|列表滚动到底部，触发加载更多后执行的回调|function|-|-|
|bottomAllLoaded|标记底部不可滚动|boolean|-|-|

#### `listview`的API

|参数|说明|类型|默认值|可选值|
| ----- | ----- | ----- | ----- | ----- |
|enableRefresh|开启是否支持下滑刷新当前列表|boolean|true|-|
|afterLoadData|自定义返回数据处理函数|function|-|-|
|pageSize|一页的数据数量|number|5|-|
|maxPageNum|最多页面数|number|10|-|
|onRequestData|当触发请求了(比如顶部的重置数据,底部的更多数据),需要业务方根据参数进行请求调用，并回调返回结果|number|10|-|
|beforeLoadData|自定义请求参数处理函数|function|-|-|
|params|参数模板|object|-|-|
|pageStartField|上送参数的页码字段|string|-|-|
|pageIndexField|上送参数的第几条下标字段|string|-|-|
|pageLimitField|上送参数的一页几行字段|string|-|-|
|resultHasMoreField|返回数据的是否有更多字段|string|-|-|
|resultListField|返回参数的列表字段|string|-|-|

##### Method

|方法名|说明|签名||
| ----- | ----- | ----- |
|resetAndReload|重置当前列表数据为空数组，页码为1，然后触发重置刷新（第一个入参`clearList`含义为：是否立即清理当前数组）|`Function(clearList): void`|

## dialogue


## validator

1. 可以参考 [https://github.com/joinyi/v-verify](https://github.com/joinyi/v-verify)


## 其他组件

可以参考如下组件库

1. [mint-ui](https://github.com/ElemeFE/mint-ui/)
2. [cube-ui](https://github.com/didi/cube-ui)