

##button
## 版本记录
####按需引入
```
import {button} from 'ares-ui';
```

####API
|参数	|说明	|类型	|默认值|版本|
|-------|:---:|-----------|-------:|-------:|
|size	|default mini	|String|	default|	-
|type	|default primary ghost danger disabled	|String|	default|	-
|action	|button, submit, reset	|String|	button|	-
|disabled	| 	|bolean|	true|	-

####插槽Slot

|名称	|说明|
|-------|:---:|-----------|-------:|
|img|自定义标题|

####外部样式类
|类名	|说明|
|-------|:---:|-----------|-------:|
|custom-class	|根节点样式类
|title-class	|标题样式类

####样式变量
|名字	|默认值	|说明	|继承自变量|
|-------|:---:|-----------|-------:|
@btn-font-weight : 400;//button 常用属性设置
@btn-border-radius-base : 2px;
@btn-padding-base : 0 @padding-md - 1px;
@btn-width-base: 100%;
@btn-height-base : 40px;
@btn-font-size-base : @font-size-lg;

@btn-padding-mini : 0 @padding-xs - 1px;
@btn-font-size-mini : @font-size-base;
@btn-width-mini: auto;
@btn-height-mini : 40px;

//Button default 默认主按扭
@btn-default-color :#FFFFFF;
@btn-default-bg : #03A9F4;
@btn-default-border : 0;

//Button primary 次按扭
@btn-primary-color : #d9d9d9;
@btn-primary-bg : #04be02;
@btn-primary-border :0;

//Button ghost 辅助按钮
@btn-ghost-color :#DD5A00;
@btn-ghost-bg :transparent;
@btn-ghost-border :hsv(0, 0, 85%);

//Button danger 警告按钮
@btn-danger-color : #d9d9d9;
@btn-danger-bg : #ef4f4f;
@btn-danger-border : 0;

//Button danger 禁用按钮
@btn-disable-color : @disabled-color;
@btn-disable-bg : @disabled-bg;
@btn-disable-border : @border-color-base;
